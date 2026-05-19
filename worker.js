const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const ADMIN_UIDS = new Set([
  'Uf729764dbb5b652a5a90a467320bea29',
  'U58eb5c1a747450140ce1335af709ae55',
]);

const LINE_NEGATIVE_KEYWORDS = ['退款', '退費', '取消', '生氣', '客訴', '抱怨', '不滿', '失望', '負評', '投訴'];
const LINE_URGENT_KEYWORDS = ['立即', '現在', '趕快', '今天', '急件', '盡快', '馬上', '立刻', '緊急'];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=UTF-8', ...CORS },
  });

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function verifyLineSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
  return bytesToBase64(new Uint8Array(mac)) === signature;
}

function getGasWebhookUrl(env) {
  return String(env.MOTHER_WEBHOOK_URL || env.GAS_URL || env.GAS_WEBAPP_URL || '').trim();
}

async function postToMotherWebhook(env, rawBody, signature) {
  const url = getGasWebhookUrl(env);
  if (!url) return { skipped: true, reason: 'MOTHER_WEBHOOK_URL missing' };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(signature ? { 'x-line-signature': signature } : {}),
      'x-hostel-forwarded-by': 'hotel-worker',
    },
    body: rawBody,
    redirect: 'follow',
  });
  const text = await res.text();
  let data = null;
  try { data = JSON.parse(text); } catch (_err) {}
  if (!res.ok) throw new Error(`Mother webhook failed (${res.status}): ${text.slice(0, 240)}`);
  return data || { success: true, raw: text.slice(0, 240) };
}

async function replyLineMessage(env, replyPayload) {
  if (!env.LINE_CHANNEL_ACCESS_TOKEN) throw new Error('LINE_CHANNEL_ACCESS_TOKEN missing');
  const res = await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(replyPayload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LINE reply failed (${res.status}): ${text.slice(0, 240)}`);
  }
}

async function forwardWebhookToObserver(env, rawBody, signature) {
  const url = String(env.FORWARD_WEBHOOK_URL || '').trim();
  if (!url) return { skipped: true };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(signature ? { 'x-line-signature': signature } : {}),
      'x-hostel-forwarded-by': 'hotel-worker',
    },
    body: rawBody,
  });
  return { forwarded: true, status: res.status };
}

function getLineThreadId(source = {}) {
  if (source.type === 'group' && source.groupId) return `group:${source.groupId}`;
  if (source.type === 'room' && source.roomId) return `room:${source.roomId}`;
  if (source.userId) return `user:${source.userId}`;
  return `unknown:${crypto.randomUUID()}`;
}

function getLineDisplayName(source = {}) {
  if (source.userId) return `訪客 ${String(source.userId).slice(-6)}`;
  if (source.groupId) return `群組 ${String(source.groupId).slice(-6)}`;
  if (source.roomId) return `聊天室 ${String(source.roomId).slice(-6)}`;
  return '未知訪客';
}

async function fetchLineSourceProfile(env, source = {}) {
  if (!env.LINE_CHANNEL_ACCESS_TOKEN || !source.userId) return null;
  const headers = { Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` };
  let endpoint = '';
  if (source.type === 'user') {
    endpoint = `https://api.line.me/v2/bot/profile/${encodeURIComponent(source.userId)}`;
  } else if (source.type === 'group' && source.groupId) {
    endpoint = `https://api.line.me/v2/bot/group/${encodeURIComponent(source.groupId)}/member/${encodeURIComponent(source.userId)}`;
  } else if (source.type === 'room' && source.roomId) {
    endpoint = `https://api.line.me/v2/bot/room/${encodeURIComponent(source.roomId)}/member/${encodeURIComponent(source.userId)}`;
  } else {
    return null;
  }
  try {
    const res = await fetch(endpoint, { headers });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      displayName: String(data.displayName || '').trim(),
      pictureUrl: String(data.pictureUrl || '').trim(),
    };
  } catch (_err) {
    return null;
  }
}

function summarizeRisk(text = '') {
  const hits = [
    ...LINE_NEGATIVE_KEYWORDS.filter(k => text.includes(k)),
    ...LINE_URGENT_KEYWORDS.filter(k => text.includes(k)),
  ];
  const uniqueHits = [...new Set(hits)];
  const risk = uniqueHits.some(k => LINE_URGENT_KEYWORDS.includes(k))
    ? 'high'
    : uniqueHits.length ? 'medium' : 'low';
  return { risk, tags: uniqueHits };
}

function eventCreatedAt(event = {}) {
  if (event.timestamp) {
    const value = new Date(Number(event.timestamp));
    if (!Number.isNaN(value.getTime())) return value.toISOString();
  }
  return new Date().toISOString();
}

async function storeLineEvents(env, payload = {}) {
  if (!env.DB) return;
  const events = Array.isArray(payload.events) ? payload.events : [];
  for (const event of events) {
    const source = event.source || {};
    const threadId = getLineThreadId(source);
    const messageType = String(event.message?.type || event.type || 'event');
    const messageText = messageType === 'text'
      ? String(event.message?.text || '').trim()
      : `[${messageType}]`;
    const createdAt = eventCreatedAt(event);
    const { risk, tags } = summarizeRisk(messageText);
    const profile = await fetchLineSourceProfile(env, source);
    const displayName = profile?.displayName || getLineDisplayName(source);
    const pictureUrl = profile?.pictureUrl || '';

    await env.DB.prepare(`
      INSERT INTO line_threads (
        id, source_type, source_user_id, source_group_id, display_name, picture_url,
        status, risk_level, summary, unread_count, tags, last_message_at, created_at, updated_at
      ) VALUES (?, 'line_oa', ?, ?, ?, ?, 'open', ?, ?, 1, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        source_user_id = excluded.source_user_id,
        source_group_id = excluded.source_group_id,
        display_name = CASE WHEN excluded.display_name <> '' THEN excluded.display_name ELSE line_threads.display_name END,
        picture_url = CASE WHEN excluded.picture_url <> '' THEN excluded.picture_url ELSE line_threads.picture_url END,
        status = CASE WHEN line_threads.status = 'closed' THEN line_threads.status ELSE 'open' END,
        risk_level = CASE
          WHEN line_threads.risk_level = 'high' OR excluded.risk_level = 'high' THEN 'high'
          WHEN line_threads.risk_level = 'medium' OR excluded.risk_level = 'medium' THEN 'medium'
          ELSE 'low'
        END,
        summary = excluded.summary,
        unread_count = line_threads.unread_count + 1,
        tags = CASE
          WHEN excluded.tags = '' THEN line_threads.tags
          WHEN line_threads.tags = '' THEN excluded.tags
          ELSE line_threads.tags || ',' || excluded.tags
        END,
        last_message_at = excluded.last_message_at,
        updated_at = excluded.updated_at
    `).bind(
      threadId,
      String(source.userId || ''),
      String(source.groupId || source.roomId || ''),
      displayName,
      pictureUrl,
      risk,
      messageText,
      tags.join(','),
      createdAt,
      createdAt,
      createdAt
    ).run();

    await env.DB.prepare(`
      INSERT OR IGNORE INTO line_messages (
        id, thread_id, line_event_id, reply_token, message_type, sender_role,
        sender_id, sender_name, message_text, raw_json, created_at
      ) VALUES (?, ?, ?, ?, ?, 'user', ?, ?, ?, ?, ?)
    `).bind(
      crypto.randomUUID(),
      threadId,
      String(event.webhookEventId || ''),
      String(event.replyToken || ''),
      messageType,
      String(source.userId || source.groupId || source.roomId || ''),
      displayName,
      messageText,
      JSON.stringify(event),
      createdAt
    ).run();
  }
}

async function handleLineWebhook(request, env, ctx) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-line-signature') || '';
  if (!env.LINE_CHANNEL_SECRET) return json({ success: false, error: 'LINE_CHANNEL_SECRET missing' }, 500);
  const valid = await verifyLineSignature(rawBody, signature, env.LINE_CHANNEL_SECRET);
  if (!valid) return new Response('Invalid Signature', { status: 403, headers: CORS });

  let payload = null;
  try { payload = JSON.parse(rawBody); } catch (_err) {
    return json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  ctx.waitUntil((async () => {
    try { await storeLineEvents(env, payload); } catch (err) {
      console.warn('storeLineEvents failed:', err.message);
    }
    try { await forwardWebhookToObserver(env, rawBody, signature); } catch (err) {
      console.warn('observer forward failed:', err.message);
    }
    try {
      await postToMotherWebhook(env, rawBody, signature);
    } catch (err) {
      console.error('mother webhook processing failed:', err.message);
    }
  })());

  return json({
    success: true,
    queued: true,
    events: Array.isArray(payload.events) ? payload.events.length : 0,
    forwarded: !!env.FORWARD_WEBHOOK_URL,
  });
}

function authorizeAdminFromQuery(url) {
  const uid = url.searchParams.get('uid') || '';
  if (!uid) return { ok: false, status: 400, error: 'MISSING_UID' };
  if (!ADMIN_UIDS.has(uid)) return { ok: false, status: 403, error: 'FORBIDDEN' };
  return { ok: true, uid };
}

async function getThreads(env) {
  if (!env.DB) throw new Error('D1 binding missing');
  const { results } = await env.DB.prepare(`
    SELECT id, display_name, picture_url, source_user_id, source_group_id, status,
           risk_level, summary, unread_count, tags, note, last_message_at
    FROM line_threads
    ORDER BY COALESCE(last_message_at, created_at) DESC
    LIMIT 200
  `).all();
  return {
    success: true,
    data: (results || []).map(row => ({
      id: row.id,
      name: row.display_name || '未命名訪客',
      pictureUrl: row.picture_url || '',
      userId: row.source_user_id || row.source_group_id || '',
      status: row.status || 'open',
      risk: row.risk_level || 'low',
      summary: row.summary || '',
      unread: Number(row.unread_count || 0),
      tags: String(row.tags || '').split(',').map(v => v.trim()).filter(Boolean),
      note: row.note || '',
      lastMessageAt: row.last_message_at || '',
    })),
  };
}

async function getThread(env, threadId) {
  if (!env.DB) throw new Error('D1 binding missing');
  const row = await env.DB.prepare(`
    SELECT *
    FROM line_threads
    WHERE id = ?
  `).bind(threadId).first();
  if (!row) return { success: false, error: 'THREAD_NOT_FOUND' };
  const { results } = await env.DB.prepare(`
    SELECT id, message_type, sender_role, sender_id, sender_name, message_text, created_at
    FROM line_messages
    WHERE thread_id = ?
    ORDER BY created_at ASC, inserted_at ASC
    LIMIT 500
  `).bind(threadId).all();
  return {
    success: true,
    data: {
      id: row.id,
      name: row.display_name || '未命名訪客',
      pictureUrl: row.picture_url || '',
      userId: row.source_user_id || row.source_group_id || '',
      status: row.status || 'open',
      risk: row.risk_level || 'low',
      summary: row.summary || '',
      unread: Number(row.unread_count || 0),
      tags: String(row.tags || '').split(',').map(v => v.trim()).filter(Boolean),
      note: row.note || '',
      lastMessageAt: row.last_message_at || '',
      messages: (results || []).map(msg => ({
        id: msg.id,
        type: msg.message_type || 'text',
        senderRole: msg.sender_role || 'user',
        senderId: msg.sender_id || '',
        senderName: msg.sender_name || '',
        text: msg.message_text || '',
        createdAt: msg.created_at || '',
      })),
    },
  };
}

async function updateThread(env, body = {}) {
  const id = String(body.id || '').trim();
  if (!id) return { success: false, error: 'MISSING_THREAD_ID' };
  const status = ['open', 'pending', 'closed'].includes(body.status) ? body.status : null;
  const note = body.note === undefined ? null : String(body.note || '');
  const tags = Array.isArray(body.tags)
    ? body.tags.map(v => String(v || '').trim()).filter(Boolean)
    : String(body.tags || '').split(',').map(v => v.trim()).filter(Boolean);
  const sets = [];
  const values = [];
  if (status) { sets.push('status = ?'); values.push(status); }
  if (note !== null) { sets.push('note = ?'); values.push(note); }
  if (body.tags !== undefined) { sets.push('tags = ?'); values.push(tags.join(',')); }
  if (!sets.length) return { success: false, error: 'NO_CHANGES' };
  sets.push("updated_at = datetime('now')");
  await env.DB.prepare(`UPDATE line_threads SET ${sets.join(', ')} WHERE id = ?`).bind(...values, id).run();
  return getThread(env, id);
}

async function getAudience(env) {
  if (!env.DB) throw new Error('D1 binding missing');
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const since30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const overview = await env.DB.prepare(`
    SELECT
      COUNT(*) AS total_threads,
      SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) AS open_threads,
      SUM(CASE WHEN risk_level = 'high' THEN 1 ELSE 0 END) AS high_risk_threads,
      SUM(CASE WHEN risk_level = 'medium' THEN 1 ELSE 0 END) AS medium_risk_threads,
      SUM(CASE WHEN last_message_at >= ? THEN 1 ELSE 0 END) AS active_threads_7d,
      SUM(CASE WHEN last_message_at >= ? THEN 1 ELSE 0 END) AS active_threads_30d,
      SUM(unread_count) AS unread_messages
    FROM line_threads
  `).bind(since7d, since30d).first();
  const messages = await env.DB.prepare(`
    SELECT
      COUNT(*) AS total_messages,
      SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) AS messages_7d,
      SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) AS messages_30d
    FROM line_messages
  `).bind(since7d, since30d).first();
  const { results: recentMessages } = await env.DB.prepare(`
    SELECT message_text
    FROM line_messages
    WHERE sender_role = 'user'
      AND created_at >= ?
    ORDER BY created_at DESC
    LIMIT 1000
  `).bind(since30d).all();
  const interestRules = [
    { key: 'room', label: '房型/住宿', keywords: ['房型', '住宿', '房間', '床', '民宿', '旅宿', '飯店'] },
    { key: 'date', label: '日期/入住', keywords: ['日期', '入住', '退房', '空房', '今晚', '明天', '週末'] },
    { key: 'price', label: '價格/訂金', keywords: ['價格', '房價', '預算', '訂金', '付款', '刷卡', '匯款'] },
    { key: 'location', label: '地點/交通', keywords: ['位置', '地址', '停車', '車站', '交通', '附近'] },
    { key: 'serviceRisk', label: '客服風險', keywords: [...LINE_NEGATIVE_KEYWORDS, ...LINE_URGENT_KEYWORDS] },
  ];
  const interests = interestRules.map(rule => ({
    key: rule.key,
    label: rule.label,
    count: (recentMessages || []).filter(row => rule.keywords.some(k => String(row.message_text || '').includes(k))).length,
  })).sort((a, b) => b.count - a.count);
  const { results: tagRows } = await env.DB.prepare(`SELECT tags FROM line_threads WHERE tags <> '' LIMIT 500`).all();
  const tagCounts = new Map();
  for (const row of tagRows || []) {
    String(row.tags || '').split(',').map(v => v.trim()).filter(Boolean).forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  }
  return {
    success: true,
    data: {
      generatedAt: new Date().toISOString(),
      overview: {
        totalThreads: Number(overview?.total_threads || 0),
        openThreads: Number(overview?.open_threads || 0),
        highRiskThreads: Number(overview?.high_risk_threads || 0),
        mediumRiskThreads: Number(overview?.medium_risk_threads || 0),
        activeThreads7d: Number(overview?.active_threads_7d || 0),
        activeThreads30d: Number(overview?.active_threads_30d || 0),
        unreadMessages: Number(overview?.unread_messages || 0),
        totalMessages: Number(messages?.total_messages || 0),
        messages7d: Number(messages?.messages_7d || 0),
        messages30d: Number(messages?.messages_30d || 0),
      },
      interests,
      tags: [...tagCounts.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count).slice(0, 12),
    },
  };
}

async function checkEndpoint(url, options = {}) {
  if (!url) return { ok: false, status: 'missing', detail: 'not configured' };
  try {
    const res = await fetch(url, options);
    return { ok: res.ok, status: res.status, detail: res.ok ? 'ok' : `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, status: 'error', detail: err.message };
  }
}

async function checkLineBot(env) {
  if (!env.LINE_CHANNEL_ACCESS_TOKEN) return { ok: false, status: 'missing', detail: 'LINE_CHANNEL_ACCESS_TOKEN missing' };
  try {
    const res = await fetch('https://api.line.me/v2/bot/info', {
      headers: { Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` },
    });
    const text = await res.text();
    let data = null;
    try { data = JSON.parse(text); } catch (_err) {}
    return { ok: res.ok, status: res.status, detail: res.ok ? data?.displayName || 'ok' : text.slice(0, 160), data };
  } catch (err) {
    return { ok: false, status: 'error', detail: err.message };
  }
}

async function hubStatus(env) {
  const gasUrl = getGasWebhookUrl(env);
  return {
    gas: await checkEndpoint(gasUrl, { method: 'GET' }),
    forward: env.FORWARD_WEBHOOK_URL
      ? await checkEndpoint(env.FORWARD_WEBHOOK_URL, { method: 'GET' })
      : { ok: false, status: 'disabled', detail: 'FORWARD_WEBHOOK_URL not configured' },
    line: await checkLineBot(env),
    config: {
      hasMotherWebhookUrl: !!gasUrl,
      hasLineSecret: !!env.LINE_CHANNEL_SECRET,
      hasLineToken: !!env.LINE_CHANNEL_ACCESS_TOKEN,
      hasForwardWebhook: !!env.FORWARD_WEBHOOK_URL,
    },
  };
}

function renderHubHtml(status, origin) {
  const row = (label, item) => `
    <div class="row">
      <div><strong>${label}</strong><span>${item.detail || '-'}</span></div>
      <b class="${item.ok ? 'ok' : 'bad'}">${item.ok ? 'OK' : 'FAIL'} · ${item.status}</b>
    </div>`;
  return `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hostel Webhook Diagnostics</title>
<style>body{font-family:Arial,"Noto Sans TC",sans-serif;background:#f8fafc;color:#0f172a;margin:0}.wrap{max-width:960px;margin:auto;padding:32px 20px}.card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:22px}.row{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #e2e8f0;padding:16px 0}.row span{display:block;color:#64748b;margin-top:4px}.ok{color:#16a34a}.bad{color:#dc2626}code{background:#f1f5f9;padding:2px 6px;border-radius:6px}</style>
</head><body><main class="wrap"><h1>Hostel 雙 Webhook 診斷</h1><p>LINE Webhook URL：<code>${origin}/line-webhook</code></p><div class="card">${row('母站 Webhook', status.gas)}${row('第二系統', status.forward)}${row('LINE Bot Token', status.line)}<p>MOTHER_WEBHOOK_URL: ${status.config.hasMotherWebhookUrl ? 'configured' : 'missing'} · LINE_CHANNEL_SECRET: ${status.config.hasLineSecret ? 'configured' : 'missing'} · LINE_CHANNEL_ACCESS_TOKEN: ${status.config.hasLineToken ? 'configured' : 'missing'}</p></div></main></body></html>`;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const url = new URL(request.url);
    try {
      if (url.pathname === '/line-webhook' && request.method === 'POST') return handleLineWebhook(request, env, ctx);
      if (url.pathname === '/api/hub-test' && request.method === 'GET') return json({ success: true, data: await hubStatus(env) });
      if (url.pathname === '/hub-test' && request.method === 'GET') {
        return new Response(renderHubHtml(await hubStatus(env), url.origin), {
          headers: { 'Content-Type': 'text/html; charset=UTF-8', ...CORS },
        });
      }
      if (url.pathname === '/api/line-oa/threads' && request.method === 'GET') {
        const auth = authorizeAdminFromQuery(url);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await getThreads(env));
      }
      if (url.pathname === '/api/line-oa/thread' && request.method === 'GET') {
        const auth = authorizeAdminFromQuery(url);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        const id = url.searchParams.get('id') || '';
        if (!id) return json({ success: false, error: 'MISSING_THREAD_ID' }, 400);
        const result = await getThread(env, id);
        return json(result, result.success ? 200 : 404);
      }
      if (url.pathname === '/api/line-oa/thread' && request.method === 'POST') {
        const body = await request.json();
        const uid = String(body.uid || '').trim();
        if (!uid) return json({ success: false, error: 'MISSING_UID' }, 400);
        if (!ADMIN_UIDS.has(uid)) return json({ success: false, error: 'FORBIDDEN' }, 403);
        const result = await updateThread(env, body);
        return json(result, result.success ? 200 : 400);
      }
      if (url.pathname === '/api/line-oa/audience' && request.method === 'GET') {
        const auth = authorizeAdminFromQuery(url);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await getAudience(env));
      }
      return json({ success: false, error: 'NOT_FOUND' }, 404);
    } catch (err) {
      return json({ success: false, error: err.message }, 500);
    }
  },
};

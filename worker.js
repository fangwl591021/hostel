const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const ADMIN_UIDS = new Set([
  'Uf729764dbb5b652a5a90a467320bea29',
  'U58eb5c1a747450140ce1335af709ae55',
  'Ue7a07fe317565389fbf4479172088f87',
]);
const GITHUB_HTML_REF = 'main';
const WORKER_PUBLIC_URL = 'https://hotel.fangwl591021.workers.dev';
const POINTS_ACTIVITY_URL = 'https://tainantravels.net/accommodations';
const TAINAN_TOURISM_NEWS_URL = 'https://www.twtainan.net/zh-tw/event/news/';
const TAINAN_TOURISM_NEWS_TRACK_TARGET = 'tainan_tourism_news';
const POINTS_SURVEY_OPENING_IMAGE_URL = 'https://s3.us-west-1.wasabisys.com/aitw/2026/05/6446d860dbbfe540e9e2cbab5f98f1e3.png';
const POINTS_SURVEY_TRIGGER = '住宿點數';
const POINTS_SURVEY_TRIGGER_ALIASES = [
  '住宿點數',
  '住宿點數專區',
  '旅遊臺南住宿點數',
  '旅遊臺南 住宿點數',
  '水映南瀛點數專區',
  '點數請領',
  '點數專區',
];
const POINTS_SURVEY_TEST_TRIGGER = '888';
const POINTS_SURVEY_ENABLED = false;
const POINTS_SURVEY_ENABLE_COMMAND = '開始調查';
const POINTS_SURVEY_DISABLE_COMMAND = '停止調查';
const POINTS_SURVEY_ENABLED_SETTING_KEY = 'points_survey_enabled';
const ADMIN_SESSION_COOKIE = 'hostel_admin_session';
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;
const HOURLY_SYNC_SETTING_KEY = 'last_hourly_sync_at';
const HOURLY_SYNC_INTERVAL_MS = 60 * 60 * 1000;
const MEMBER_LIST_API_URL = 'https://aiwe.cc/index.php/wp-json/wetw/v1/query-shop-2500-line-user-list';

const POINTS_SURVEY_STEPS = [
  {
    key: 'interest',
    title: '這次你最想了解哪一類臺南旅遊資訊？',
    options: ['住宿優惠', '合作旅宿', '埤塘景點', '打卡加碼', '攝影活動', '都想看看'],
  },
  {
    key: 'residence_area',
    title: '你目前主要居住在哪個地區？',
    options: ['臺南市', '高雄/屏東', '嘉義/雲林', '中彰投', '北北基桃', '其他地區'],
  },
  {
    key: 'gender',
    title: '為了後續提供更適合的旅遊資訊，請問您的性別？',
    options: ['女性', '男性', '其他/不便透露'],
  },
  {
    key: 'tainan_area',
    title: '你比較想了解哪一區的臺南旅宿或景點資訊？',
    options: ['台南市區/安平', '北門/將軍/七股', '新化/玉井/楠西', '白河/東山/關子嶺', '還不確定'],
  },
  {
    key: 'party_type',
    title: '你通常會和誰一起參考臺南旅遊或住宿資訊？',
    options: ['情侶/夫妻', '親子家庭', '朋友同行', '自己一人', '團體/公司'],
  },
  {
    key: 'lodging_type',
    title: '如果來臺南旅行，你比較想參考哪一類住宿資訊？',
    options: ['民宿', '飯店', '親子住宿', '露營區', '先看優惠'],
  },
  {
    key: 'pond_interest',
    title: '本次活動主題包含「花漾埤塘 × 臺南住宿體驗」，你對哪一類資訊比較有興趣？',
    options: ['德元埤', '葫蘆埤', '虎頭埤', '埤塘一日遊', '還不確定'],
  },
  {
    key: 'visit_time',
    title: '你近期比較可能在什麼時間參考臺南旅遊或住宿資訊？',
    options: ['本週', '2 週內', '1 個月內', '6 月底前', '還不確定'],
  },
  {
    key: 'budget',
    title: '你通常會參考哪個住宿預算區間？',
    options: ['2000 內', '2000-4000', '4000-6000', '6000 以上', '還不確定'],
  },
];

const ACCOMMODATION_RECOMMENDATIONS = [
  {
    name: '福爾摩沙遊艇酒店',
    type: '旅館',
    district: '安平區',
    address: '臺南市安平區安平路988號',
    phone: '06-3911313',
    website: 'https://www.formosayacht.com.tw',
    areaGroups: ['台南市區/安平'],
    audienceTags: ['親子家庭', '情侶/夫妻', '朋友同行'],
    lodgingTags: ['飯店', '先看優惠'],
    budgetTags: ['4000-6000', '6000 以上', '還不確定'],
  },
  {
    name: '夏都城旅安平館',
    type: '旅館',
    district: '南區',
    address: '臺南市南區新建路47號',
    phone: '06-292-4567',
    website: 'https://www.tnchateau.com.tw',
    areaGroups: ['台南市區/安平'],
    audienceTags: ['親子家庭', '情侶/夫妻'],
    lodgingTags: ['飯店', '親子住宿', '先看優惠'],
    budgetTags: ['4000-6000', '6000 以上', '還不確定'],
  },
  {
    name: '台南老爺行旅',
    type: '旅館',
    district: '東區',
    address: '臺南市東區中華東路一段368號',
    phone: '06-2366168',
    website: 'https://www.hotelroyal.com.tw',
    areaGroups: ['台南市區/安平'],
    audienceTags: ['情侶/夫妻', '親子家庭', '朋友同行'],
    lodgingTags: ['飯店', '先看優惠'],
    budgetTags: ['4000-6000', '6000 以上', '還不確定'],
  },
  {
    name: '澤居',
    type: '民宿',
    district: '安平區',
    address: '台南市安平區世平路168號',
    phone: '0908331857',
    website: '',
    areaGroups: ['台南市區/安平'],
    audienceTags: ['情侶/夫妻', '朋友同行'],
    lodgingTags: ['民宿', '先看優惠'],
    budgetTags: ['2000-4000', '4000-6000', '還不確定'],
  },
  {
    name: '玩聚安平',
    type: '民宿',
    district: '安平區',
    address: '臺南市安平區安平路606巷17弄13號',
    phone: '0976677859',
    website: 'https://brick.url.tw',
    areaGroups: ['台南市區/安平'],
    audienceTags: ['親子家庭', '朋友同行'],
    lodgingTags: ['民宿', '親子住宿', '先看優惠'],
    budgetTags: ['2000-4000', '4000-6000', '還不確定'],
  },
  {
    name: '鹽舍休閒民宿',
    type: '民宿',
    district: '北門區',
    address: '臺南市北門區北門里井子腳80-9號',
    phone: '0928101925',
    website: 'https://www.salt-house57.com',
    areaGroups: ['北門/將軍/七股'],
    audienceTags: ['情侶/夫妻', '親子家庭', '朋友同行'],
    lodgingTags: ['民宿', '先看優惠'],
    budgetTags: ['2000-4000', '4000-6000', '還不確定'],
  },
  {
    name: '鹽鄉民宿',
    type: '民宿',
    district: '北門區',
    address: '臺南市北門區北門里井子腳57號',
    phone: '0928101925',
    website: 'https://www.salt-house57.com',
    areaGroups: ['北門/將軍/七股'],
    audienceTags: ['情侶/夫妻', '朋友同行'],
    lodgingTags: ['民宿', '先看優惠'],
    budgetTags: ['2000 內', '2000-4000', '還不確定'],
  },
  {
    name: '幸福種子',
    type: '民宿',
    district: '學甲區',
    address: '台南市學甲區民權路38號',
    phone: '0905232918',
    website: '',
    areaGroups: ['北門/將軍/七股'],
    audienceTags: ['親子家庭', '朋友同行'],
    lodgingTags: ['民宿', '先看優惠'],
    budgetTags: ['2000 內', '2000-4000', '還不確定'],
  },
  {
    name: '趣淘漫旅',
    type: '旅館',
    district: '楠西區',
    address: '臺南市楠西區密枝里密枝102之5號',
    phone: '06-5753333',
    website: 'https://tainan.chamcham.com.tw',
    areaGroups: ['新化/玉井/楠西'],
    audienceTags: ['親子家庭', '朋友同行', '團體/公司'],
    lodgingTags: ['飯店', '親子住宿', '先看優惠'],
    budgetTags: ['4000-6000', '6000 以上', '還不確定'],
  },
  {
    name: '虎頭埤風景區',
    type: '露營區',
    district: '新化區',
    address: '臺南市新化區中興路42巷36號',
    phone: '06-5901325',
    website: 'https://htp.tainan.gov.tw',
    areaGroups: ['新化/玉井/楠西'],
    audienceTags: ['親子家庭', '朋友同行', '團體/公司'],
    lodgingTags: ['露營區', '親子住宿', '先看優惠'],
    budgetTags: ['2000 內', '2000-4000', '還不確定'],
  },
  {
    name: '神秘氣場露營區',
    type: '露營區',
    district: '楠西區',
    address: '臺南市楠西區灣丘里香蕉山51之6號',
    phone: '0933914636',
    website: 'https://www.facebook.com',
    areaGroups: ['新化/玉井/楠西'],
    audienceTags: ['親子家庭', '朋友同行'],
    lodgingTags: ['露營區', '親子住宿', '先看優惠'],
    budgetTags: ['2000 內', '2000-4000', '還不確定'],
  },
  {
    name: '天喜悅溫泉會館',
    type: '民宿',
    district: '楠西區',
    address: '臺南市楠西區龜丹里龜丹59之3號',
    phone: '06-5747232',
    website: '',
    areaGroups: ['新化/玉井/楠西'],
    audienceTags: ['情侶/夫妻', '親子家庭'],
    lodgingTags: ['民宿', '先看優惠'],
    budgetTags: ['2000-4000', '4000-6000', '還不確定'],
  },
  {
    name: '關子嶺富野溫泉會館',
    type: '旅館',
    district: '白河區',
    address: '臺南市白河區關嶺里關子嶺28號',
    phone: '06-682-2288',
    website: 'https://www.hoyaresort.com.tw',
    areaGroups: ['白河/東山/關子嶺'],
    audienceTags: ['情侶/夫妻', '親子家庭'],
    lodgingTags: ['飯店', '先看優惠'],
    budgetTags: ['4000-6000', '6000 以上', '還不確定'],
  },
  {
    name: '失眠圖書館',
    type: '民宿',
    district: '後壁區',
    address: '臺南市後壁區菁寮里173號',
    phone: '06-6622319',
    website: '',
    areaGroups: ['白河/東山/關子嶺'],
    audienceTags: ['情侶/夫妻', '朋友同行', '自己一人'],
    lodgingTags: ['民宿', '先看優惠'],
    budgetTags: ['2000-4000', '4000-6000', '還不確定'],
  },
  {
    name: '薇風情汽車旅館',
    type: '旅館',
    district: '六甲區',
    address: '臺南市六甲區龜仔港303巷70號',
    phone: '06-6985599',
    website: 'https://www.wemotel.com.tw',
    areaGroups: ['白河/東山/關子嶺'],
    audienceTags: ['情侶/夫妻', '朋友同行'],
    lodgingTags: ['飯店', '先看優惠'],
    budgetTags: ['2000-4000', '4000-6000', '還不確定'],
  },
];

const LINE_NEGATIVE_KEYWORDS = ['退款', '退費', '取消', '生氣', '客訴', '抱怨', '不滿', '失望', '負評', '投訴'];
const LINE_URGENT_KEYWORDS = ['立即', '現在', '趕快', '今天', '急件', '盡快', '馬上', '立刻', '緊急'];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=UTF-8', ...CORS },
  });

function decodeBase64Utf8(value) {
  const binary = atob(String(value || '').replace(/\s/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function base64UrlEncode(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function parseCookies(request) {
  const header = request.headers.get('Cookie') || '';
  return Object.fromEntries(header.split(';').map(part => {
    const [name, ...rest] = part.trim().split('=');
    return [name, rest.join('=')];
  }).filter(([name]) => name));
}

async function hmacSha256Base64Url(secret, value) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

async function createAdminSession(env) {
  const password = String(env.ADMIN_PASSWORD || '').trim();
  if (!password) throw new Error('ADMIN_PASSWORD missing');
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = String(expiresAt);
  const sig = await hmacSha256Base64Url(password, payload);
  return `${payload}.${sig}`;
}

async function verifyAdminSession(request, env) {
  const password = String(env.ADMIN_PASSWORD || '').trim();
  if (!password) return false;
  const token = parseCookies(request)[ADMIN_SESSION_COOKIE] || '';
  const [payload, sig] = token.split('.');
  const expiresAt = Number(payload || 0);
  if (!payload || !sig || !Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  const expected = await hmacSha256Base64Url(password, payload);
  return expected === sig;
}

function adminCookieHeader(token) {
  return `${ADMIN_SESSION_COOKIE}=${token}; Path=/; Max-Age=${ADMIN_SESSION_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;
}

async function authorizeAdminFromRequest(request, url, env) {
  if (await verifyAdminSession(request, env)) return { ok: true, via: 'session' };
  const uid = url.searchParams.get('uid') || '';
  if (uid && ADMIN_UIDS.has(uid)) return { ok: true, uid, via: 'uid' };
  return { ok: false, status: 403, error: 'FORBIDDEN' };
}

async function handleAdminLogin(request, env) {
  const body = await request.json().catch(() => ({}));
  const password = String(body.password || '').trim();
  const expected = String(env.ADMIN_PASSWORD || '').trim();
  if (!expected) return json({ success: false, error: 'ADMIN_PASSWORD missing' }, 500);
  if (!password || password !== expected) return json({ success: false, error: 'INVALID_PASSWORD' }, 403);
  const token = await createAdminSession(env);
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Set-Cookie': adminCookieHeader(token),
      ...CORS,
    },
  });
}

function handleAdminLogout() {
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Set-Cookie': `${ADMIN_SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
      ...CORS,
    },
  });
}

function injectMonitorRiskPanel(html) {
  if (html.includes('risk-list')) return html;
  const script = `
<script>
(() => {
  const ADMIN_UID = 'Uf729764dbb5b652a5a90a467320bea29';
  const esc = value => String(value || '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));
  const formatTime = value => {
    const d = new Date(value || '');
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('zh-TW', { month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
  };
  const riskClass = value => value === 'high' ? 'bg-rose-100 text-rose-700' : value === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';
  function ensurePanel() {
    if (document.getElementById('risk-list')) return true;
    const tags = document.getElementById('tags');
    const anchor = tags?.parentElement;
    if (!anchor) return false;
    anchor.insertAdjacentHTML('afterend', '<div class="mt-4"><div class="flex items-center justify-between mb-2"><p class="text-sm text-slate-500 font-semibold">風險名單</p><button id="show-risk-filter" type="button" class="rounded-full bg-rose-50 text-rose-700 px-3 py-1 text-xs font-bold">看全部</button></div><div id="risk-list" class="space-y-2"></div></div>');
    document.getElementById('show-risk-filter')?.addEventListener('click', () => document.querySelector('[data-filter="risk"]')?.click());
    return true;
  }
  async function renderRiskList() {
    if (!ensurePanel()) return;
    const list = document.getElementById('risk-list');
    const res = await fetch('/api/line-oa/audience?uid=' + encodeURIComponent(ADMIN_UID));
    const json = await res.json();
    const rows = json?.data?.riskThreads || [];
    list.innerHTML = rows.length ? rows.map(row => '<button type="button" data-id="' + esc(row.id) + '" class="risk-row w-full text-left rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 hover:bg-rose-100"><div class="flex items-start justify-between gap-2"><div class="min-w-0"><b class="block truncate text-sm text-slate-900">' + esc(row.name || '訪客') + '</b><span class="block truncate text-[11px] text-slate-400">' + esc(row.userId || '') + '</span></div><span class="shrink-0 rounded-full ' + riskClass(row.risk) + ' px-2 py-1 text-[11px] font-bold">' + (row.risk === 'high' ? '高' : '中') + '</span></div><p class="mt-1 line-clamp-2 text-xs text-slate-600">' + esc(row.summary || '') + '</p><div class="mt-1 flex items-center justify-between text-[11px] text-slate-400"><span>' + formatTime(row.lastMessageAt) + '</span><span>' + (Number(row.unread || 0) ? Number(row.unread || 0) + ' 未讀' : '') + '</span></div></button>').join('') : '<p class="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-400">目前沒有高風險或中風險名單</p>';
    document.querySelectorAll('.risk-row').forEach(btn => btn.addEventListener('click', () => {
      if (typeof loadThread === 'function') loadThread(btn.dataset.id).catch(err => console.warn(err));
    }));
  }
  setTimeout(() => renderRiskList().catch(err => console.warn(err)), 800);
})();
</script>`;
  return html.replace('</body>', `${script}\n</body>`);
}

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

function inferAudienceSignalsFromText(text = '') {
  const value = String(text || '');
  const areas = [
    '中西區', '東區', '南區', '北區', '安平', '安南', '永康', '歸仁', '仁德',
    '新化', '善化', '新市', '麻豆', '佳里', '學甲', '西港', '七股', '將軍',
    '北門', '新營', '鹽水', '白河', '柳營', '後壁', '東山', '六甲', '下營',
    '官田', '大內', '玉井', '楠西', '南化', '左鎮', '關廟', '龍崎',
    '台南', '臺南', '高雄', '台中', '臺中', '台北', '臺北', '新北', '桃園',
    '嘉義', '屏東', '台東', '臺東', '花蓮', '宜蘭', '澎湖', '金門',
  ];
  const matchedArea = areas.find(area => value.includes(area));
  const femaleHints = ['小姐', '女士', '太太', '媽媽', '媽咪', '姐妹', '姊妹', '女性', '女生', '美惠', '淑', '婷', '怡', '雅', '芳', '玲', '芬', '娟', '慧', '萱', '涵', '婷', '君', '妤', '芸', '瑜', '蓉'];
  const maleHints = ['先生', '爸爸', '爸比', '男性', '男生', '志', '俊', '偉', '銘', '豪', '傑', '峰', '宏', '明', '強', '宇', '翔', '廷', '凱'];
  const gender = femaleHints.some(k => value.includes(k))
    ? '女性線索'
    : maleHints.some(k => value.includes(k))
      ? '男性線索'
      : '未判定';
  return {
    area: matchedArea || '未判定',
    gender,
    confidence: matchedArea || gender !== '未判定' ? 'inferred' : 'none',
  };
}

function inferAudienceSignals(row = {}, messages = []) {
  if (row.inferred_area || row.inferred_gender || row.location_address) {
    return {
      area: row.location_address || row.inferred_area || '未判定',
      gender: row.inferred_gender || '未判定',
      confidence: row.inferred_confidence || (row.location_address ? 'location' : 'inferred'),
      location: row.location_address ? {
        address: row.location_address,
        latitude: row.location_latitude ?? null,
        longitude: row.location_longitude ?? null,
      } : null,
    };
  }
  const text = [
    row.display_name || '',
    row.summary || '',
    row.tags || '',
    ...messages.map(msg => msg.message_text || msg.text || ''),
  ].join('\n');
  return inferAudienceSignalsFromText(text);
}

function getLineMessageText(event = {}, messageType = '') {
  const message = event.message || {};
  if (messageType === 'text') return String(message.text || '').trim();
  if (messageType === 'postback') {
    const data = String(event.postback?.data || '').trim();
    const params = new URLSearchParams(data);
    const readable = [
      params.get('keyword'),
      params.get('area'),
      params.get('region'),
      params.get('district'),
      params.get('hotel'),
      params.get('hostel'),
      params.get('title'),
      params.get('name'),
    ].filter(Boolean).join(' ');
    return ['[postback]', readable, data].filter(Boolean).join(' ');
  }
  if (messageType === 'location') {
    return [
      '[location]',
      message.title || '',
      message.address || '',
      message.latitude !== undefined && message.longitude !== undefined
        ? `${message.latitude},${message.longitude}`
        : '',
    ].filter(Boolean).join(' ');
  }
  return `[${messageType}]`;
}

function mergeTagValues(existing = '', additions = []) {
  const values = [
    ...String(existing || '').split(','),
    ...additions,
  ].map(v => String(v || '').trim()).filter(Boolean);
  return [...new Set(values)].join(',');
}

function safeDecodeURIComponent(value = '') {
  const text = String(value || '');
  try {
    return decodeURIComponent(text.replace(/\+/g, ' '));
  } catch (_err) {
    return text;
  }
}

function normalizeSurveyTriggerText(value = '') {
  return safeDecodeURIComponent(value)
    .replace(/\s+/g, '')
    .replace(/[｜|:：,，。．.、_\-]/g, '')
    .trim();
}

function getSurveyTriggerTexts(event = {}) {
  const type = String(event.message?.type || event.type || '').trim();
  const values = [];
  if (type === 'text') values.push(String(event.message?.text || '').trim());
  if (type === 'postback') {
    const data = String(event.postback?.data || '').trim();
    const decodedData = safeDecodeURIComponent(data);
    const params = new URLSearchParams(data);
    const decodedParams = new URLSearchParams(decodedData);
    const paramKeys = ['answer', 'keyword', 'label', 'title', 'text', 'message', 'action', 'name', 'menu', 'richmenu', 'rich_menu'];
    values.push(data, decodedData);
    for (const key of paramKeys) {
      values.push(params.get(key), decodedParams.get(key));
    }
    for (const value of params.values()) values.push(value);
    for (const value of decodedParams.values()) values.push(value);
  }
  return [...new Set(values.map(v => String(v || '').trim()).filter(Boolean))];
}

function getSurveyAnswerText(event = {}) {
  const type = String(event.message?.type || event.type || '').trim();
  if (type === 'text') return String(event.message?.text || '').trim();
  if (type === 'postback') {
    return getSurveyTriggerTexts(event)[0] || '';
  }
  return '';
}

async function getAppSetting(env, key, fallback = '') {
  if (!env.DB || !key) return fallback;
  await ensureAppSettingsTable(env);
  const row = await env.DB.prepare(`
    SELECT value
    FROM app_settings
    WHERE key = ?
  `).bind(key).first();
  return row?.value ?? fallback;
}

async function setAppSetting(env, key, value) {
  if (!env.DB || !key) return;
  await ensureAppSettingsTable(env);
  await env.DB.prepare(`
    INSERT INTO app_settings (key, value, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET
      value = excluded.value,
      updated_at = excluded.updated_at
  `).bind(key, String(value ?? ''), new Date().toISOString()).run();
}

async function ensureAppSettingsTable(env) {
  if (!env.DB) return;
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run();
}

async function isPointsSurveyEnabled(env) {
  const fallback = POINTS_SURVEY_ENABLED ? '1' : '0';
  return await getAppSetting(env, POINTS_SURVEY_ENABLED_SETTING_KEY, fallback) === '1';
}

async function isPointsSurveyTrigger(env, event = {}) {
  const texts = getSurveyTriggerTexts(event);
  const normalizedTexts = texts.map(normalizeSurveyTriggerText);
  if (normalizedTexts.some(text => text === POINTS_SURVEY_TEST_TRIGGER || text.includes(`answer=${POINTS_SURVEY_TEST_TRIGGER}`))) return true;
  if (!await isPointsSurveyEnabled(env)) return false;
  const normalizedAliases = POINTS_SURVEY_TRIGGER_ALIASES.map(normalizeSurveyTriggerText);
  return normalizedAliases.some(keyword => normalizedTexts.some(text => text.includes(keyword)));
}

function isPointsSurveyTestTrigger(event = {}) {
  const normalizedTexts = getSurveyTriggerTexts(event).map(normalizeSurveyTriggerText);
  return normalizedTexts.some(text => text === POINTS_SURVEY_TEST_TRIGGER || text.includes(`answer=${POINTS_SURVEY_TEST_TRIGGER}`));
}

function isSurveyOptionAnswer(step, answer) {
  if (!step || !answer) return false;
  return (step.options || []).some(option => option === answer);
}

async function shouldPrioritizePointsSurvey(env, payload = {}) {
  const events = Array.isArray(payload.events) ? payload.events : [];
  for (const event of events) {
    const source = event.source || {};
    const userId = String(source.userId || '').trim();
    if (!userId || !event.replyToken) continue;
    const answer = getSurveyAnswerText(event);
    if ([POINTS_SURVEY_ENABLE_COMMAND, POINTS_SURVEY_DISABLE_COMMAND].includes(answer)) return true;
    if (await isPointsSurveyTrigger(env, event)) return true;
    const profile = await getSurveyProfile(env, userId);
    if (profile && !Number(profile.completed || 0)) {
      const stepIndex = Math.max(0, POINTS_SURVEY_STEPS.findIndex(step => step.key === profile.current_step));
      const step = POINTS_SURVEY_STEPS[stepIndex] || POINTS_SURVEY_STEPS[0];
      if (isSurveyOptionAnswer(step, answer)) return true;
    }
  }
  return false;
}

function buildQuickReply(options = []) {
  return {
    items: options.slice(0, 13).map(label => ({
      type: 'action',
      action: { type: 'message', label, text: label },
    })),
  };
}

function surveyQuestionMessage(stepIndex, prefix = '') {
  const step = POINTS_SURVEY_STEPS[stepIndex] || POINTS_SURVEY_STEPS[0];
  return {
    type: 'text',
    text: `${prefix}${step.title}`,
    quickReply: buildQuickReply(step.options),
  };
}

function surveyOpeningMessage() {
  const firstStep = POINTS_SURVEY_STEPS[0];
  return {
    type: 'flex',
    altText: '旅遊臺南住宿點數問卷',
    contents: {
      type: 'bubble',
      size: 'giga',
      body: {
        type: 'box',
        layout: 'horizontal',
        paddingAll: '8px',
        contents: [
          {
            type: 'image',
            url: POINTS_SURVEY_OPENING_IMAGE_URL,
            size: 'md',
            flex: 1,
            aspectRatio: '20:20',
            aspectMode: 'fit',
          },
          {
            type: 'text',
            text: '「旅遊臺南住宿點數」活動進行中，點數每週三陸續開放，數量有限、領完為止。想邀請你回答幾個簡單問題，讓我們更了解大家對臺南旅宿與花漾埤塘旅遊的興趣。',
            wrap: true,
            flex: 3,
            size: 'sm',
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '5px',
        contents: [
          {
            type: 'text',
            text: firstStep.title,
            align: 'center',
            wrap: true,
          },
        ],
      },
    },
    quickReply: buildQuickReply(firstStep.options),
  };
}

function surveyCompleteMessage(profile = {}) {
  const answers = profile.answers || {};
  const lines = [
    '謝謝你的回答，我們已收到你的旅遊偏好資料。',
    '',
    `想了解：${answers.interest || '未填'}`,
    `居住地區：${answers.residence_area || '未填'}`,
    `性別分眾：${answers.gender || profile.gender || '未填'}`,
    `臺南區域：${answers.tainan_area || profile.area || '未填'}`,
    `同行型態：${answers.party_type || profile.party_type || '未填'}`,
    `住宿偏好：${answers.lodging_type || profile.lodging_type || '未填'}`,
    `埤塘興趣：${answers.pond_interest || '未填'}`,
    `參考時間：${answers.visit_time || profile.travel_time || '未填'}`,
    `預算區間：${answers.budget || profile.budget || '未填'}`,
    '',
    '下方先依照你的回答列出幾間可參考的合作旅宿，實際房型與價格請以旅宿公告為準。',
    '',
    '「旅遊臺南 住宿點數」點數效期至 2026/6/30 24:00，合作旅宿、活動規則與埤塘景點資訊請以官網公告為準：',
    'https://tainantravels.net/',
  ];
  return { type: 'text', text: lines.join('\n') };
}

function trackingUrl(path, params = {}) {
  const url = new URL(path, WORKER_PUBLIC_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value) !== '') url.searchParams.set(key, String(value));
  });
  return url.toString();
}

function recentTainanEventsMessage(userId = '') {
  return {
    type: 'flex',
    altText: '臺南近期活動訊息',
    contents: {
      type: 'bubble',
      size: 'mega',
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: '臺南近期活動訊息',
            weight: 'bold',
            size: 'lg',
            wrap: true,
          },
          {
            type: 'text',
            text: '想順路安排景點、活動或最新旅遊消息，可以到台南旅遊網查看官方更新。',
            size: 'sm',
            color: '#475569',
            wrap: true,
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#0f766e',
            action: {
              type: 'uri',
              label: '查看最新活動',
              uri: trackingUrl('/r/tainan-events', { uid: userId, source: 'survey_complete' }),
            },
          },
        ],
      },
    },
  };
}

function googleMapSearchUrl(address = '') {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function lineSafeText(value = '', maxLength = 120) {
  const text = String(value || '').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 1))}…`;
}

function scoreAccommodationRecommendation(item, answers = {}) {
  let score = 0;
  const uncertain = '還不確定';
  if (answers.tainan_area && item.areaGroups.includes(answers.tainan_area)) score += 4;
  if (answers.tainan_area === uncertain) score += 1;
  if (answers.party_type && item.audienceTags.includes(answers.party_type)) score += 4;
  if (answers.lodging_type && item.lodgingTags.includes(answers.lodging_type)) score += 3;
  if (answers.budget && item.budgetTags.includes(answers.budget)) score += 3;
  if (answers.interest === '合作旅宿') score += 1;
  if (answers.pond_interest && answers.pond_interest !== uncertain && item.areaGroups.includes('新化/玉井/楠西')) score += 1;
  return score;
}

function getAccommodationRecommendations(answers = {}, limit = 5) {
  return ACCOMMODATION_RECOMMENDATIONS
    .map((item, index) => ({
      ...item,
      score: scoreAccommodationRecommendation(item, answers),
      index,
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit);
}

function buildAccommodationBubble(item, answers = {}) {
  const matchedTags = [
    item.district,
    item.type,
    answers.party_type && item.audienceTags.includes(answers.party_type) ? answers.party_type : '',
    answers.budget && item.budgetTags.includes(answers.budget) ? answers.budget : '',
  ].filter(Boolean);
  const buttons = [
    {
      type: 'button',
      style: 'primary',
      height: 'sm',
      action: {
        type: 'uri',
        label: 'Google Map',
        uri: googleMapSearchUrl(item.address),
      },
    },
  ];
  if (item.website) {
    buttons.push({
      type: 'button',
      style: 'secondary',
      height: 'sm',
      action: {
        type: 'uri',
        label: '旅宿網站',
        uri: item.website,
      },
    });
  }
  return {
    type: 'bubble',
    size: 'mega',
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        {
          type: 'text',
          text: lineSafeText(item.name, 40),
          weight: 'bold',
          size: 'lg',
          wrap: true,
        },
        {
          type: 'text',
          text: matchedTags.join('｜'),
          color: '#1f2a44',
          size: 'sm',
          wrap: true,
        },
        {
          type: 'text',
          text: lineSafeText(item.address, 80),
          color: '#667085',
          size: 'sm',
          wrap: true,
        },
        {
          type: 'text',
          text: `參考預算：${item.budgetTags.join(' / ')}`,
          color: '#0f172a',
          size: 'xs',
          wrap: true,
        },
        {
          type: 'text',
          text: item.phone ? `電話：${item.phone}` : '價格與空房請以旅宿公告為準',
          color: '#667085',
          size: 'xs',
          wrap: true,
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: buttons,
    },
  };
}

function buildAccommodationCarouselMessage(answers = {}) {
  const matches = getAccommodationRecommendations(answers, 5);
  if (!matches.length) return null;
  return {
    type: 'flex',
    altText: '依照你的回答推薦合作旅宿',
    contents: {
      type: 'carousel',
      contents: matches.map(item => buildAccommodationBubble(item, answers)),
    },
  };
}

async function getSurveyProfile(env, userId) {
  if (!env.DB || !userId) return null;
  return env.DB.prepare(`
    SELECT *
    FROM line_survey_profiles
    WHERE line_user_id = ?
  `).bind(userId).first();
}

async function saveSurveyEvent(env, event = {}, step = '', answer = '') {
  if (!env.DB) return;
  const source = event.source || {};
  const userId = String(source.userId || '').trim();
  if (!userId) return;
  await env.DB.prepare(`
    INSERT INTO line_survey_events (id, line_user_id, thread_id, step, answer, raw_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(),
    userId,
    getLineThreadId(source),
    step,
    answer,
    JSON.stringify(event),
    eventCreatedAt(event)
  ).run();
}

async function startPointsSurvey(env, event = {}) {
  const source = event.source || {};
  const userId = String(source.userId || '').trim();
  if (!env.DB || !userId || !event.replyToken) return null;
  const threadId = getLineThreadId(source);
  const existing = await getSurveyProfile(env, userId);
  if (existing && Number(existing.completed || 0) && !isPointsSurveyTestTrigger(event)) {
    await saveSurveyEvent(env, event, 'repeat_trigger_ignored', getSurveyAnswerText(event));
    await appendThreadSurveyTags(env, threadId, ['問卷:已完成']);
    return null;
  }
  if (existing && !Number(existing.completed || 0) && !isPointsSurveyTestTrigger(event)) {
    await saveSurveyEvent(env, event, 'repeat_trigger_in_progress', getSurveyAnswerText(event));
    await appendThreadSurveyTags(env, threadId, ['問卷:進行中']);
    const stepIndex = Math.max(0, POINTS_SURVEY_STEPS.findIndex(step => step.key === existing.current_step));
    return {
      replyToken: event.replyToken,
      messages: [surveyQuestionMessage(stepIndex, '你剛剛已經開始問卷了，從這題繼續：\n')],
    };
  }
  const profile = await fetchLineSourceProfile(env, source);
  const displayName = profile?.displayName || getLineDisplayName(source);
  const pictureUrl = profile?.pictureUrl || '';
  const now = new Date().toISOString();
  await env.DB.prepare(`
    INSERT INTO line_survey_profiles (
      line_user_id, thread_id, display_name, picture_url, trigger_keyword,
      current_step, completed, source_url, answers_json, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, 'interest', 0, ?, '{}', ?, ?)
    ON CONFLICT(line_user_id) DO UPDATE SET
      thread_id = excluded.thread_id,
      display_name = CASE WHEN excluded.display_name <> '' THEN excluded.display_name ELSE line_survey_profiles.display_name END,
      picture_url = CASE WHEN excluded.picture_url <> '' THEN excluded.picture_url ELSE line_survey_profiles.picture_url END,
      trigger_keyword = excluded.trigger_keyword,
      current_step = 'interest',
      completed = 0,
      residence_area = '',
      area = '',
      gender = '',
      travel_time = '',
      party_type = '',
      lodging_type = '',
      budget = '',
      opt_in = 0,
      last_answer = '',
      answers_json = '{}',
      source_url = excluded.source_url,
      updated_at = excluded.updated_at
  `).bind(
    userId,
    threadId,
    displayName,
    pictureUrl,
    POINTS_SURVEY_TRIGGER,
    POINTS_ACTIVITY_URL,
    now,
    now
  ).run();
  await saveSurveyEvent(env, event, 'trigger', getSurveyAnswerText(event));
  await appendThreadSurveyTags(env, threadId, ['問卷:點數候補', '問卷:進行中']);
  return {
    replyToken: event.replyToken,
    messages: [surveyOpeningMessage()],
  };
}

async function appendThreadSurveyTags(env, threadId, additions = [], patch = {}) {
  if (!env.DB || !threadId) return;
  const row = await env.DB.prepare(`SELECT tags FROM line_threads WHERE id = ?`).bind(threadId).first();
  const tags = mergeTagValues(row?.tags || '', additions);
  const sets = ['tags = ?', "updated_at = datetime('now')"];
  const values = [tags];
  if (patch.inferred_area) {
    sets.push("inferred_area = ?");
    values.push(patch.inferred_area);
  }
  if (patch.inferred_confidence) {
    sets.push("inferred_confidence = ?");
    values.push(patch.inferred_confidence);
  }
  await env.DB.prepare(`UPDATE line_threads SET ${sets.join(', ')} WHERE id = ?`).bind(...values, threadId).run();
}

async function continuePointsSurvey(env, event = {}, profile = null) {
  const source = event.source || {};
  const userId = String(source.userId || '').trim();
  if (!env.DB || !userId || !event.replyToken) return null;
  const current = profile || await getSurveyProfile(env, userId);
  if (!current || current.completed) return null;
  const stepIndex = Math.max(0, POINTS_SURVEY_STEPS.findIndex(step => step.key === current.current_step));
  const step = POINTS_SURVEY_STEPS[stepIndex] || POINTS_SURVEY_STEPS[0];
  const answer = getSurveyAnswerText(event);
  if (!answer || await isPointsSurveyTrigger(env, event)) return null;
  if (!isSurveyOptionAnswer(step, answer)) {
    await saveSurveyEvent(env, event, `invalid_${step.key}`, answer);
    return null;
  }

  let answers = {};
  try { answers = JSON.parse(current.answers_json || '{}'); } catch (_err) {}
  answers[step.key] = answer;
  const nextStep = POINTS_SURVEY_STEPS[stepIndex + 1] || null;
  const completed = nextStep ? 0 : 1;
  const updates = {
    residence_area: current.residence_area || '',
    area: current.area || '',
    gender: current.gender || '',
    travel_time: current.travel_time || '',
    party_type: current.party_type || '',
    lodging_type: current.lodging_type || '',
    budget: current.budget || '',
  };
  if (step.key === 'residence_area') updates.residence_area = answer;
  if (step.key === 'tainan_area') updates.area = answer;
  if (step.key === 'gender') updates.gender = answer;
  if (step.key === 'visit_time') updates.travel_time = answer;
  if (step.key === 'party_type') updates.party_type = answer;
  if (step.key === 'lodging_type') updates.lodging_type = answer;
  if (step.key === 'budget') updates.budget = answer;
  const now = new Date().toISOString();
  await env.DB.prepare(`
    UPDATE line_survey_profiles
    SET current_step = ?,
        completed = ?,
        residence_area = ?,
        area = ?,
        gender = ?,
        travel_time = ?,
        party_type = ?,
        lodging_type = ?,
        budget = ?,
        opt_in = ?,
        last_answer = ?,
        answers_json = ?,
        updated_at = ?
    WHERE line_user_id = ?
  `).bind(
    nextStep ? nextStep.key : 'completed',
    completed,
    updates.residence_area,
    updates.area,
    updates.gender,
    updates.travel_time,
    updates.party_type,
    updates.lodging_type,
    updates.budget,
    completed ? 1 : Number(current.opt_in || 0),
    answer,
    JSON.stringify(answers),
    now,
    userId
  ).run();
  await saveSurveyEvent(env, event, step.key, answer);

  const threadId = getLineThreadId(source);
  const tagAdds = [
    '問卷:點數候補',
    `問卷:${step.key}:${answer}`,
    completed ? '問卷:完成' : '問卷:進行中',
  ];
  if (completed) tagAdds.push('分眾:可推播');
  if (step.key === 'gender') tagAdds.push(`問卷性別:${answer}`);
  await appendThreadSurveyTags(
    env,
    threadId,
    tagAdds,
    step.key === 'residence_area' ? { inferred_area: answer, inferred_confidence: 'survey' } : {}
  );

  if (nextStep) {
    return {
      replyToken: event.replyToken,
      messages: [surveyQuestionMessage(stepIndex + 1, '收到。\n')],
    };
  }

  const messages = [surveyCompleteMessage({ ...updates, answers })];
  const recommendationMessage = buildAccommodationCarouselMessage(answers);
  if (recommendationMessage) messages.push(recommendationMessage);
  messages.push(recentTainanEventsMessage(userId));
  return {
    replyToken: event.replyToken,
    messages,
  };
}

async function handlePointsSurveyControlCommand(env, event = {}) {
  const answer = getSurveyAnswerText(event);
  if (![POINTS_SURVEY_ENABLE_COMMAND, POINTS_SURVEY_DISABLE_COMMAND].includes(answer)) return null;
  const userId = String(event.source?.userId || '').trim();
  if (!ADMIN_UIDS.has(userId)) {
    await saveSurveyEvent(env, event, 'survey_control_denied', answer);
    return {
      replyToken: event.replyToken,
      messages: [{
        type: 'text',
        text: `此指令限管理員使用。\n你的 LINE UID：${userId || '未取得'}`,
      }],
    };
  }
  const enabled = answer === POINTS_SURVEY_ENABLE_COMMAND;
  await setAppSetting(env, POINTS_SURVEY_ENABLED_SETTING_KEY, enabled ? '1' : '0');
  await saveSurveyEvent(env, event, enabled ? 'survey_enabled' : 'survey_disabled', answer);
  return {
    replyToken: event.replyToken,
    messages: [{
      type: 'text',
      text: enabled
        ? '已開啟問卷。用戶點到點數相關關鍵字時會啟動調查。'
        : '已停止問卷。用戶點到點數相關關鍵字時不會再啟動調查。',
    }],
  };
}

async function handlePointsSurveyAutomation(env, payload = {}) {
  const events = Array.isArray(payload.events) ? payload.events : [];
  for (const event of events) {
    const source = event.source || {};
    const userId = String(source.userId || '').trim();
    if (!userId || !event.replyToken) continue;
    const controlReply = await handlePointsSurveyControlCommand(env, event);
    if (controlReply) {
      await replyLineMessage(env, controlReply);
      continue;
    }
    if (await isPointsSurveyTrigger(env, event)) {
      const replyPayload = await startPointsSurvey(env, event);
      if (replyPayload) await replyLineMessage(env, replyPayload);
      continue;
    }
    const profile = await getSurveyProfile(env, userId);
    if (profile && !Number(profile.completed || 0)) {
      const replyPayload = await continuePointsSurvey(env, event, profile);
      if (replyPayload) await replyLineMessage(env, replyPayload);
    }
  }
}

async function getSurveySummary(env) {
  if (!env.DB) throw new Error('D1 binding missing');
  const overview = await env.DB.prepare(`
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) AS completed,
      SUM(CASE WHEN completed = 1 AND opt_in = 1 THEN 1 ELSE 0 END) AS opt_in
    FROM line_survey_profiles
  `).first();
  const groupBy = async column => {
    const safeColumns = new Set(['residence_area', 'area', 'gender', 'travel_time', 'party_type', 'lodging_type', 'budget']);
    if (!safeColumns.has(column)) return [];
    const { results } = await env.DB.prepare(`
      SELECT ${column} AS label, COUNT(*) AS count
      FROM line_survey_profiles
      WHERE ${column} <> ''
      GROUP BY ${column}
      ORDER BY count DESC, label ASC
      LIMIT 20
    `).all();
    return (results || []).map(row => ({ label: row.label, count: Number(row.count || 0) }));
  };
  return {
    success: true,
    data: {
      generatedAt: new Date().toISOString(),
      overview: {
        total: Number(overview?.total || 0),
        completed: Number(overview?.completed || 0),
        optIn: Number(overview?.opt_in || 0),
      },
      residenceArea: await groupBy('residence_area'),
      area: await groupBy('area'),
      gender: await groupBy('gender'),
      travelTime: await groupBy('travel_time'),
      partyType: await groupBy('party_type'),
      lodgingType: await groupBy('lodging_type'),
      budget: await groupBy('budget'),
    },
  };
}

async function backfillSurveyResidenceAreas(env, limit = 5000) {
  if (!env.DB) throw new Error('D1 binding missing');
  const size = Math.max(1, Math.min(Number(limit || 5000) || 5000, 50000));
  const { results } = await env.DB.prepare(`
    SELECT sp.line_user_id, sp.thread_id, sp.residence_area, sp.gender, sp.answers_json
    FROM line_survey_profiles sp
    WHERE sp.thread_id <> ''
      AND (
        sp.residence_area <> ''
        OR json_extract(sp.answers_json, '$.residence_area') IS NOT NULL
      )
    ORDER BY sp.updated_at DESC
    LIMIT ?
  `).bind(size).all();
  let updated = 0;
  for (const row of results || []) {
    let residenceArea = String(row.residence_area || '').trim();
    let gender = String(row.gender || '').trim();
    if (!residenceArea) {
      try {
        const answers = JSON.parse(row.answers_json || '{}');
        residenceArea = String(answers.residence_area || '').trim();
        gender = String(gender || answers.gender || '').trim();
      } catch (_err) {}
    } else if (!gender) {
      try {
        gender = String(JSON.parse(row.answers_json || '{}').gender || '').trim();
      } catch (_err) {}
    }
    if (!residenceArea) continue;
    await env.DB.prepare(`
      UPDATE line_survey_profiles
      SET residence_area = CASE WHEN residence_area = '' THEN ? ELSE residence_area END,
          gender = CASE WHEN gender = '' THEN ? ELSE gender END,
          updated_at = updated_at
      WHERE line_user_id = ?
    `).bind(residenceArea, gender, row.line_user_id).run();
    await env.DB.prepare(`
      UPDATE line_threads
      SET inferred_area = ?,
          inferred_confidence = 'survey',
          tags = CASE
            WHEN tags LIKE ? THEN tags
            WHEN tags = '' THEN ?
            ELSE tags || ',' || ?
          END,
          updated_at = datetime('now')
      WHERE id = ?
    `).bind(residenceArea, `%問卷居住地區:${residenceArea}%`, `問卷居住地區:${residenceArea}`, `問卷居住地區:${residenceArea}`, row.thread_id).run();
    updated += 1;
  }
  return { success: true, data: { scanned: (results || []).length, updated } };
}

function parseSurveyAnswers(row = {}) {
  try {
    return JSON.parse(row.answers_json || '{}') || {};
  } catch (_err) {
    return {};
  }
}

function surveyRecordFromRow(row = {}) {
  const answers = parseSurveyAnswers(row);
  return {
    lineUserId: row.line_user_id || '',
    threadId: row.thread_id || '',
    displayName: row.display_name || row.thread_display_name || '',
    pictureUrl: row.picture_url || row.thread_picture_url || '',
    completed: Number(row.completed || 0),
    currentStep: row.current_step || '',
    residenceArea: row.residence_area || answers.residence_area || '',
    gender: row.gender || answers.gender || '',
    tainanArea: row.area || answers.tainan_area || '',
    interest: answers.interest || '',
    partyType: row.party_type || answers.party_type || '',
    lodgingType: row.lodging_type || answers.lodging_type || '',
    pondInterest: answers.pond_interest || '',
    visitTime: row.travel_time || answers.visit_time || '',
    budget: row.budget || answers.budget || '',
    monitorArea: row.inferred_area || '',
    monitorGender: row.inferred_gender || '',
    monitorConfidence: row.inferred_confidence || '',
    tags: row.tags || '',
    lastMessageAt: row.last_message_at || '',
    createdAt: row.created_at || '',
    updatedAt: row.updated_at || '',
  };
}

async function listSurveyRecords(env, filters = {}) {
  if (!env.DB) throw new Error('D1 binding missing');
  const uid = String(filters.uid || '').trim();
  if (!filters.authorized && !ADMIN_UIDS.has(uid)) return { success: false, error: 'FORBIDDEN' };
  const search = String(filters.search || '').trim();
  const residenceArea = String(filters.residenceArea || filters.residence_area || '').trim();
  const gender = String(filters.gender || '').trim();
  const completed = String(filters.completed ?? '').trim();
  const limit = Math.max(1, Math.min(Number(filters.limit || 500) || 500, 5000));
  const clauses = ['1 = 1'];
  const values = [];
  if (search) {
    clauses.push(`(
      sp.display_name LIKE ? OR lt.display_name LIKE ? OR sp.line_user_id LIKE ?
      OR sp.answers_json LIKE ? OR lt.tags LIKE ?
    )`);
    values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (residenceArea) {
    clauses.push(`COALESCE(NULLIF(sp.residence_area, ''), json_extract(sp.answers_json, '$.residence_area'), '') = ?`);
    values.push(residenceArea);
  }
  if (gender) {
    clauses.push(`COALESCE(NULLIF(sp.gender, ''), json_extract(sp.answers_json, '$.gender'), '') = ?`);
    values.push(gender);
  }
  if (completed !== '') {
    clauses.push('sp.completed = ?');
    values.push(Number(completed) ? 1 : 0);
  }
  const { results } = await env.DB.prepare(`
    SELECT
      sp.*,
      lt.display_name AS thread_display_name,
      lt.picture_url AS thread_picture_url,
      lt.inferred_area,
      lt.inferred_gender,
      lt.inferred_confidence,
      lt.tags,
      lt.last_message_at
    FROM line_survey_profiles sp
    LEFT JOIN line_threads lt ON lt.id = sp.thread_id
    WHERE ${clauses.join(' AND ')}
    ORDER BY sp.updated_at DESC
    LIMIT ?
  `).bind(...values, limit).all();
  return {
    success: true,
    data: {
      generatedAt: new Date().toISOString(),
      count: (results || []).length,
      records: (results || []).map(surveyRecordFromRow),
    },
  };
}

function csvCell(value = '') {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

async function exportSurveyRecordsCsv(env, filters = {}) {
  const result = await listSurveyRecords(env, { ...filters, limit: filters.limit || 5000 });
  if (!result.success) return result;
  const headers = [
    ['displayName', '姓名'],
    ['lineUserId', 'LINE UID'],
    ['residenceArea', '居住地區'],
    ['gender', '性別'],
    ['tainanArea', '想了解臺南區域'],
    ['interest', '想了解資訊'],
    ['partyType', '同行型態'],
    ['lodgingType', '住宿偏好'],
    ['pondInterest', '埤塘興趣'],
    ['visitTime', '參考時間'],
    ['budget', '預算'],
    ['completed', '完成'],
    ['monitorArea', '監控地區'],
    ['monitorConfidence', '地區來源'],
    ['tags', '標籤'],
    ['updatedAt', '更新時間'],
  ];
  const lines = [
    headers.map(([, label]) => csvCell(label)).join(','),
    ...result.data.records.map(record => headers.map(([key]) => csvCell(record[key])).join(',')),
  ];
  return { success: true, csv: `\uFEFF${lines.join('\r\n')}` };
}

async function ensureCrmCustomersTable(env) {
  if (!env.DB) throw new Error('D1 binding missing');
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS crm_customers (
      member_id TEXT PRIMARY KEY,
      line_user_id TEXT NOT NULL DEFAULT '',
      customer_name TEXT NOT NULL DEFAULT '',
      gender TEXT NOT NULL DEFAULT '',
      birthday TEXT NOT NULL DEFAULT '',
      residence_area TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      credit_balance REAL,
      claimed_at TEXT NOT NULL DEFAULT '',
      source_file TEXT NOT NULL DEFAULT '',
      imported_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_customers_phone ON crm_customers(phone)`).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_customers_residence ON crm_customers(residence_area)`).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_customers_gender ON crm_customers(gender)`).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_customers_claimed ON crm_customers(claimed_at)`).run();
}

function crmCustomerFromRow(row = {}) {
  return {
    memberId: row.member_id || '',
    lineUserId: row.line_user_id || '',
    name: row.customer_name || '',
    gender: row.gender || '',
    birthday: row.birthday || '',
    residenceArea: row.residence_area || '',
    phone: row.phone || '',
    creditBalance: row.credit_balance ?? '',
    claimedAt: row.claimed_at || '',
    sourceFile: row.source_file || '',
    updatedAt: row.updated_at || '',
  };
}

async function listCrmCustomers(env, filters = {}) {
  if (!env.DB) throw new Error('D1 binding missing');
  await ensureCrmCustomersTable(env);
  const search = String(filters.search || '').trim();
  const gender = String(filters.gender || '').trim();
  const residenceArea = String(filters.residenceArea || filters.residence_area || '').trim();
  const claimed = String(filters.claimed ?? '').trim();
  const limit = Math.max(1, Math.min(Number(filters.limit || 500) || 500, 10000));
  const clauses = ['1 = 1'];
  const values = [];
  if (search) {
    clauses.push(`(
      member_id LIKE ? OR line_user_id LIKE ? OR customer_name LIKE ?
      OR phone LIKE ? OR residence_area LIKE ?
    )`);
    values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (gender) {
    clauses.push('gender = ?');
    values.push(gender);
  }
  if (residenceArea) {
    clauses.push('residence_area = ?');
    values.push(residenceArea);
  }
  if (claimed === '1') clauses.push("claimed_at <> ''");
  if (claimed === '0') clauses.push("claimed_at = ''");
  const overview = await env.DB.prepare(`
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN claimed_at <> '' THEN 1 ELSE 0 END) AS claimed,
      SUM(CASE WHEN phone <> '' THEN 1 ELSE 0 END) AS with_phone
    FROM crm_customers
  `).first();
  const { results } = await env.DB.prepare(`
    SELECT *
    FROM crm_customers
    WHERE ${clauses.join(' AND ')}
    ORDER BY
      CASE WHEN claimed_at <> '' THEN 0 ELSE 1 END,
      CAST(member_id AS INTEGER) ASC
    LIMIT ?
  `).bind(...values, limit).all();
  return {
    success: true,
    data: {
      generatedAt: new Date().toISOString(),
      overview: {
        total: Number(overview?.total || 0),
        claimed: Number(overview?.claimed || 0),
        withPhone: Number(overview?.with_phone || 0),
      },
      count: (results || []).length,
      records: (results || []).map(crmCustomerFromRow),
    },
  };
}

async function exportCrmCustomersCsv(env, filters = {}) {
  const result = await listCrmCustomers(env, { ...filters, limit: filters.limit || 10000 });
  if (!result.success) return result;
  const headers = [
    ['memberId', '會員ID'],
    ['lineUserId', 'LINE UID'],
    ['name', '會員姓名'],
    ['gender', '性別'],
    ['birthday', '生日'],
    ['residenceArea', '居住地區'],
    ['phone', '手機'],
    ['creditBalance', '購物金餘額'],
    ['claimedAt', '領點時間'],
    ['sourceFile', '來源檔案'],
    ['updatedAt', '更新時間'],
  ];
  const lines = [
    headers.map(([, label]) => csvCell(label)).join(','),
    ...result.data.records.map(record => headers.map(([key]) => csvCell(record[key])).join(',')),
  ];
  return { success: true, csv: `\uFEFF${lines.join('\r\n')}` };
}

async function ensureCrmPointEventsTable(env) {
  if (!env.DB) throw new Error('D1 binding missing');
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS crm_point_events (
      event_row_id TEXT PRIMARY KEY,
      uuid TEXT NOT NULL DEFAULT '',
      member_id TEXT NOT NULL DEFAULT '',
      shop_user_id TEXT NOT NULL DEFAULT '',
      shop_id TEXT NOT NULL DEFAULT '',
      event_id TEXT NOT NULL DEFAULT '',
      event_name TEXT NOT NULL DEFAULT '',
      event_content TEXT NOT NULL DEFAULT '',
      point_type TEXT NOT NULL DEFAULT '',
      get_point REAL,
      point_balance REAL,
      check_name TEXT NOT NULL DEFAULT '',
      check_people_id TEXT NOT NULL DEFAULT '',
      check_phone TEXT NOT NULL DEFAULT '',
      room_number TEXT NOT NULL DEFAULT '',
      sub_shop_name TEXT NOT NULL DEFAULT '',
      child_shop_attribute TEXT NOT NULL DEFAULT '',
      sub_shop_area TEXT NOT NULL DEFAULT '',
      child_shop_ip TEXT NOT NULL DEFAULT '',
      child_shop_remark TEXT NOT NULL DEFAULT '',
      event_period TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT '',
      out_at TEXT NOT NULL DEFAULT '',
      source_file TEXT NOT NULL DEFAULT '',
      imported_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_point_events_member ON crm_point_events(member_id)`).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_point_events_event ON crm_point_events(event_name)`).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_point_events_shop ON crm_point_events(sub_shop_name)`).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_point_events_created ON crm_point_events(created_at)`).run();
}

function crmPointEventFromRow(row = {}) {
  return {
    eventRowId: row.event_row_id || '',
    memberId: row.member_id || '',
    customerName: row.customer_name || '',
    eventName: row.event_name || '',
    eventContent: row.event_content || '',
    pointType: row.point_type || '',
    getPoint: row.get_point ?? '',
    pointBalance: row.point_balance ?? '',
    checkName: row.check_name || '',
    checkPhone: row.check_phone || '',
    roomNumber: row.room_number || '',
    subShopName: row.sub_shop_name || '',
    subShopArea: row.sub_shop_area || '',
    createdAt: row.created_at || '',
    outAt: row.out_at || '',
  };
}

async function listCrmPointEvents(env, filters = {}) {
  if (!env.DB) throw new Error('D1 binding missing');
  await ensureCrmPointEventsTable(env);
  const search = String(filters.search || '').trim();
  const eventName = String(filters.eventName || filters.event_name || '').trim();
  const memberId = String(filters.memberId || filters.member_id || '').trim();
  const limit = Math.max(1, Math.min(Number(filters.limit || 500) || 500, 10000));
  const clauses = ['1 = 1'];
  const values = [];
  if (search) {
    clauses.push(`(
      pe.member_id LIKE ? OR c.customer_name LIKE ? OR pe.event_name LIKE ?
      OR pe.check_name LIKE ? OR pe.check_phone LIKE ? OR pe.sub_shop_name LIKE ?
    )`);
    values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (eventName) {
    clauses.push('pe.event_name = ?');
    values.push(eventName);
  }
  if (memberId) {
    clauses.push('pe.member_id = ?');
    values.push(memberId);
  }
  const overview = await env.DB.prepare(`
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN event_name = '住房扣抵' THEN 1 ELSE 0 END) AS stays,
      SUM(CASE WHEN event_name LIKE '%註冊贈點%' THEN 1 ELSE 0 END) AS registrations,
      SUM(COALESCE(get_point, 0)) AS point_sum
    FROM crm_point_events
  `).first();
  const { results } = await env.DB.prepare(`
    SELECT pe.*, c.customer_name
    FROM crm_point_events pe
    LEFT JOIN crm_customers c ON c.member_id = pe.member_id
    WHERE ${clauses.join(' AND ')}
    ORDER BY pe.created_at DESC, CAST(pe.event_row_id AS INTEGER) DESC
    LIMIT ?
  `).bind(...values, limit).all();
  return {
    success: true,
    data: {
      overview: {
        total: Number(overview?.total || 0),
        stays: Number(overview?.stays || 0),
        registrations: Number(overview?.registrations || 0),
        pointSum: Number(overview?.point_sum || 0),
      },
      count: (results || []).length,
      records: (results || []).map(crmPointEventFromRow),
    },
  };
}

async function ensureCrmLinkClicksTable(env) {
  if (!env.DB) throw new Error('D1 binding missing');
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS crm_link_clicks (
      id TEXT PRIMARY KEY,
      target TEXT NOT NULL DEFAULT '',
      line_user_id TEXT NOT NULL DEFAULT '',
      source TEXT NOT NULL DEFAULT '',
      user_agent TEXT NOT NULL DEFAULT '',
      referer TEXT NOT NULL DEFAULT '',
      clicked_at TEXT NOT NULL DEFAULT ''
    )
  `).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_link_clicks_target ON crm_link_clicks(target, clicked_at)`).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_crm_link_clicks_user ON crm_link_clicks(line_user_id)`).run();
}

async function recordLinkClick(env, request, target, options = {}) {
  if (!env.DB) return;
  await ensureCrmLinkClicksTable(env);
  const now = new Date().toISOString();
  await env.DB.prepare(`
    INSERT INTO crm_link_clicks (
      id, target, line_user_id, source, user_agent, referer, clicked_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(),
    target,
    String(options.lineUserId || '').trim(),
    String(options.source || '').trim(),
    String(request.headers.get('user-agent') || '').slice(0, 500),
    String(request.headers.get('referer') || '').slice(0, 500),
    now
  ).run();
}

async function getLinkClickStats(env, filters = {}) {
  if (!env.DB) throw new Error('D1 binding missing');
  await ensureCrmLinkClicksTable(env);
  const target = String(filters.target || TAINAN_TOURISM_NEWS_TRACK_TARGET).trim();
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const overview = await env.DB.prepare(`
    SELECT
      COUNT(*) AS total,
      COUNT(DISTINCT NULLIF(line_user_id, '')) AS unique_users,
      SUM(CASE WHEN clicked_at >= ? THEN 1 ELSE 0 END) AS clicks_24h,
      SUM(CASE WHEN clicked_at >= ? THEN 1 ELSE 0 END) AS clicks_7d
    FROM crm_link_clicks
    WHERE target = ?
  `).bind(since24h, since7d, target).first();
  const { results } = await env.DB.prepare(`
    SELECT lc.line_user_id, COALESCE(sp.display_name, lt.display_name, '') AS display_name,
           COUNT(*) AS clicks, MAX(lc.clicked_at) AS last_clicked_at
    FROM crm_link_clicks lc
    LEFT JOIN line_survey_profiles sp ON sp.line_user_id = lc.line_user_id
    LEFT JOIN line_threads lt ON lt.source_user_id = lc.line_user_id
    WHERE lc.target = ?
    GROUP BY lc.line_user_id
    ORDER BY clicks DESC, last_clicked_at DESC
    LIMIT 20
  `).bind(target).all();
  return {
    success: true,
    data: {
      target,
      overview: {
        total: Number(overview?.total || 0),
        uniqueUsers: Number(overview?.unique_users || 0),
        clicks24h: Number(overview?.clicks_24h || 0),
        clicks7d: Number(overview?.clicks_7d || 0),
      },
      topUsers: (results || []).map(row => ({
        lineUserId: row.line_user_id || '',
        displayName: row.display_name || '',
        clicks: Number(row.clicks || 0),
        lastClickedAt: row.last_clicked_at || '',
      })),
    },
  };
}


async function ensureKnowledgeBaseTables(env) {
  if (!env.DB) throw new Error('D1 binding missing');
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS kb_folders (
      id TEXT PRIMARY KEY,
      parent_id TEXT NOT NULL DEFAULT '',
      name TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run();
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS kb_items (
      id TEXT PRIMARY KEY,
      folder_id TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      source_url TEXT NOT NULL DEFAULT '',
      tags TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_kb_folders_parent ON kb_folders(parent_id, sort_order)`).run();
  await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_kb_items_folder ON kb_items(folder_id, updated_at)`).run();
}

function kbFolderFromRow(row = {}) {
  return { id: row.id || '', parentId: row.parent_id || '', name: row.name || '', description: row.description || '', sortOrder: Number(row.sort_order || 0), updatedAt: row.updated_at || '' };
}

function kbItemFromRow(row = {}) {
  return { id: row.id || '', folderId: row.folder_id || '', title: row.title || '', content: row.content || '', sourceUrl: row.source_url || '', tags: String(row.tags || '').split(',').map(v => v.trim()).filter(Boolean), status: row.status || 'active', updatedAt: row.updated_at || '' };
}

async function listKnowledgeBase(env, filters = {}) {
  if (!env.DB) throw new Error('D1 binding missing');
  await ensureKnowledgeBaseTables(env);
  const search = String(filters.search || '').trim();
  const folderId = String(filters.folderId || filters.folder_id || '').trim();
  const folderRows = await env.DB.prepare(`SELECT * FROM kb_folders ORDER BY parent_id ASC, sort_order ASC, name ASC`).all();
  const clauses = ["status <> 'deleted'"];
  const values = [];
  if (folderId) { clauses.push('folder_id = ?'); values.push(folderId); }
  if (search) { clauses.push('(title LIKE ? OR content LIKE ? OR tags LIKE ? OR source_url LIKE ?)'); values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`); }
  const itemRows = await env.DB.prepare(`SELECT * FROM kb_items WHERE ${clauses.join(' AND ')} ORDER BY updated_at DESC LIMIT 300`).bind(...values).all();
  return { success: true, data: { folders: (folderRows.results || []).map(kbFolderFromRow), items: (itemRows.results || []).map(kbItemFromRow) } };
}

async function saveKnowledgeFolder(env, body = {}) {
  if (!env.DB) throw new Error('D1 binding missing');
  await ensureKnowledgeBaseTables(env);
  const id = String(body.id || crypto.randomUUID()).trim();
  const name = String(body.name || '').trim();
  if (!name) return { success: false, error: 'MISSING_FOLDER_NAME' };
  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO kb_folders (id, parent_id, name, description, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET parent_id = excluded.parent_id, name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = excluded.updated_at`).bind(id, String(body.parentId || body.parent_id || '').trim(), name, String(body.description || '').trim(), Number(body.sortOrder || body.sort_order || 0) || 0, now, now).run();
  return { success: true, data: { id } };
}

async function saveKnowledgeItem(env, body = {}) {
  if (!env.DB) throw new Error('D1 binding missing');
  await ensureKnowledgeBaseTables(env);
  const id = String(body.id || crypto.randomUUID()).trim();
  const title = String(body.title || '').trim();
  if (!title) return { success: false, error: 'MISSING_TITLE' };
  const tags = Array.isArray(body.tags) ? body.tags.map(v => String(v || '').trim()).filter(Boolean).join(',') : String(body.tags || '').split(',').map(v => v.trim()).filter(Boolean).join(',');
  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO kb_items (id, folder_id, title, content, source_url, tags, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET folder_id = excluded.folder_id, title = excluded.title, content = excluded.content, source_url = excluded.source_url, tags = excluded.tags, status = excluded.status, updated_at = excluded.updated_at`).bind(id, String(body.folderId || body.folder_id || '').trim(), title, String(body.content || '').trim(), String(body.sourceUrl || body.source_url || '').trim(), tags, String(body.status || 'active').trim(), now, now).run();
  return { success: true, data: { id } };
}

async function deleteKnowledgeItem(env, body = {}) {
  if (!env.DB) throw new Error('D1 binding missing');
  await ensureKnowledgeBaseTables(env);
  const id = String(body.id || '').trim();
  if (!id) return { success: false, error: 'MISSING_ID' };
  await env.DB.prepare(`UPDATE kb_items SET status = 'deleted', updated_at = ? WHERE id = ?`).bind(new Date().toISOString(), id).run();
  return { success: true, data: { id } };
}

async function runHourlyMonitorSync(env, force = false) {
  if (!env.DB) throw new Error('D1 binding missing');
  await ensureAppSettingsTable(env);
  const now = new Date();
  const lastValue = await getAppSetting(env, HOURLY_SYNC_SETTING_KEY, '');
  const lastTime = lastValue ? Date.parse(lastValue) : 0;
  if (!force && lastTime && now.getTime() - lastTime < HOURLY_SYNC_INTERVAL_MS) {
    return { success: true, skipped: true, lastSyncAt: lastValue };
  }
  await setAppSetting(env, HOURLY_SYNC_SETTING_KEY, now.toISOString());
  const postbacks = await backfillPostbackText(env, 1500);
  const signals = await backfillAudienceSignals(env, 80);
  const surveyResidence = await backfillSurveyResidenceAreas(env, 5000);
  return {
    success: true,
    skipped: false,
    syncedAt: now.toISOString(),
    data: { postbacks, signals, surveyResidence },
  };
}

function normalizeImportedLineUserId(value) {
  const userId = String(value || '').trim();
  return /^U[a-fA-F0-9]{20,}$/.test(userId) ? userId : '';
}

function memberTypeMeta(typeKey) {
  const map = {
    type_1: {
      label: '加入會員',
      tags: ['會員名單', '加入會員'],
      summary: '母站會員名單：加入之 USER',
    },
    type_2: {
      label: '註冊未領點',
      tags: ['會員名單', '已註冊', '未領點'],
      summary: '母站會員名單：已註冊，尚未領點',
    },
    type_3: {
      label: '註冊已領點',
      tags: ['會員名單', '已註冊', '已領點'],
      summary: '母站會員名單：已註冊，已領點',
    },
  };
  return map[typeKey] || null;
}

function collectMemberApiUsers(payload = {}) {
  const data = payload.data || {};
  const members = new Map();
  const typeCounts = {};
  for (const typeKey of ['type_1', 'type_2', 'type_3']) {
    const meta = memberTypeMeta(typeKey);
    const list = Array.isArray(data[typeKey]?.list) ? data[typeKey].list : [];
    typeCounts[typeKey] = list.length;
    for (const raw of list) {
      const userId = normalizeImportedLineUserId(raw);
      if (!userId) continue;
      const current = members.get(userId) || {
        userId,
        tags: new Set(),
        labels: [],
        summaries: [],
      };
      meta.tags.forEach(tag => current.tags.add(tag));
      current.labels.push(meta.label);
      current.summaries.push(meta.summary);
      members.set(userId, current);
    }
  }
  return { members: [...members.values()], typeCounts };
}

async function fetchMemberApiList(env, type = 'all') {
  const apiKey = String(env.LINE_USER_LIST_API_KEY || env.WETW_API_KEY || env.MEMBER_API_KEY || '').trim();
  if (!apiKey) return { success: false, error: 'MISSING_LINE_USER_LIST_API_KEY' };
  const queryType = ['1', '2', '3', 'all'].includes(String(type || 'all')) ? String(type || 'all') : 'all';
  const res = await fetch(MEMBER_LIST_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey, type: queryType }),
  });
  const text = await res.text();
  let payload = null;
  try { payload = JSON.parse(text); } catch (_err) {}
  if (!res.ok || !payload?.success) {
    return {
      success: false,
      error: payload?.code || `MEMBER_API_FAILED_${res.status}`,
      message: payload?.message || text.slice(0, 200),
    };
  }
  return { success: true, data: payload };
}

function importedMemberStatement(env, member) {
  const now = new Date().toISOString();
  const threadId = `user:${member.userId}`;
  const tags = [...member.tags].filter(Boolean).slice(0, 8);
  const paddedTags = [...tags, '', '', '', '', ''].slice(0, 5);
  const displayName = `會員 ${member.userId.slice(-6)}`;
  const summary = [...new Set(member.summaries)].join('；') || '母站會員名單匯入';
  return env.DB.prepare(`
    INSERT INTO line_threads (
      id, source_type, source_user_id, source_group_id, display_name, picture_url,
      status, risk_level, summary, unread_count, tags,
      last_message_at, created_at, updated_at
    ) VALUES (?, 'line_oa', ?, '', ?, '', 'pending', 'low', ?, 0, ?, '', ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      source_user_id = excluded.source_user_id,
      display_name = CASE WHEN line_threads.display_name <> '' THEN line_threads.display_name ELSE excluded.display_name END,
      status = CASE WHEN line_threads.status = 'closed' THEN line_threads.status ELSE line_threads.status END,
      summary = CASE
        WHEN line_threads.summary = '' OR line_threads.summary LIKE '母站會員名單%' THEN excluded.summary
        ELSE line_threads.summary
      END,
      tags = trim(
        line_threads.tags ||
        CASE WHEN ? <> '' AND (',' || line_threads.tags || ',') NOT LIKE ? THEN ',' || ? ELSE '' END ||
        CASE WHEN ? <> '' AND (',' || line_threads.tags || ',') NOT LIKE ? THEN ',' || ? ELSE '' END ||
        CASE WHEN ? <> '' AND (',' || line_threads.tags || ',') NOT LIKE ? THEN ',' || ? ELSE '' END ||
        CASE WHEN ? <> '' AND (',' || line_threads.tags || ',') NOT LIKE ? THEN ',' || ? ELSE '' END ||
        CASE WHEN ? <> '' AND (',' || line_threads.tags || ',') NOT LIKE ? THEN ',' || ? ELSE '' END,
        ','
      ),
      updated_at = excluded.updated_at
  `).bind(
    threadId,
    member.userId,
    displayName,
    summary,
    tags.join(','),
    now,
    now,
    ...paddedTags.flatMap(tag => [tag, `%,${tag},%`, tag])
  );
}

async function importMembersToMonitor(env, type = 'all') {
  if (!env.DB) throw new Error('D1 binding missing');
  const apiResult = await fetchMemberApiList(env, type);
  if (!apiResult.success) return apiResult;
  const { members, typeCounts } = collectMemberApiUsers(apiResult.data);
  let imported = 0;
  const chunkSize = 80;
  for (let i = 0; i < members.length; i += chunkSize) {
    const chunk = members.slice(i, i + chunkSize).map(member => importedMemberStatement(env, member));
    if (chunk.length) {
      await env.DB.batch(chunk);
      imported += chunk.length;
    }
  }
  return {
    success: true,
    data: {
      imported,
      typeCounts,
      source: 'shop_id=2500',
      syncedAt: new Date().toISOString(),
    },
  };
}

function formatPostbackText(event = {}, fallback = '') {
  const data = String(event.postback?.data || '').trim();
  const params = new URLSearchParams(data);
  const values = [
    params.get('keyword'),
    params.get('title'),
    params.get('label'),
    params.get('hotel'),
    params.get('hostel'),
    params.get('area'),
    params.get('region'),
    params.get('district'),
  ].map(v => String(v || '').trim()).filter(Boolean);
  const uniqueValues = [...new Set(values)];
  if (uniqueValues.length) return `點擊：${uniqueValues.join(' / ')}`;

  const cleanedFallback = String(fallback || '')
    .replace(/^\[postback\]\s*/i, '')
    .replace(/\s*(name|keyword|area|region|district|hotel|hostel|title|label)=[^\s]+.*$/i, '')
    .replace(/\s+\b(name|keyword|area|region|district|hotel|hostel|title|label)\b\s*$/i, '')
    .trim();
  return cleanedFallback ? `點擊：${cleanedFallback}` : '點擊選單';
}

function formatLineMessageForDisplay(row = {}) {
  const type = String(row.message_type || '').trim();
  const storedText = String(row.message_text || '').trim();
  let event = null;
  try { event = JSON.parse(row.raw_json || '{}'); } catch (_err) {}
  const message = event?.message || {};

  if (type === 'text') return String(message.text || storedText).trim();
  if (type === 'postback') return formatPostbackText(event || {}, storedText);
  if (type === 'location') {
    const address = String(message.address || '').trim();
    const title = String(message.title || '').trim();
    const coords = message.latitude !== undefined && message.longitude !== undefined
      ? `${message.latitude}, ${message.longitude}`
      : '';
    return ['位置', title, address, coords].filter(Boolean).join('：');
  }
  if (type === 'sticker') {
    return `貼圖：${[message.packageId, message.stickerId].filter(Boolean).join('/') || 'LINE 貼圖'}`;
  }
  if (type === 'image') return '圖片訊息';
  if (type === 'video') return '影片訊息';
  if (type === 'audio') return '語音訊息';
  if (type === 'file') return `檔案：${message.fileName || 'LINE 檔案'}`;
  if (type === 'follow') return '加入好友';
  if (type === 'unfollow') return '封鎖或取消好友';
  return storedText || `[${type || 'event'}]`;
}

function formatThreadSummary(summary = '') {
  const text = String(summary || '').trim();
  if (!text) return '';
  if (text.startsWith('[postback]')) return formatPostbackText({}, text);
  if (text.startsWith('[follow]')) return '加入好友';
  if (text.startsWith('[unfollow]')) return '封鎖或取消好友';
  if (text.startsWith('[location]')) return text.replace('[location]', '位置').trim();
  return text;
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
    const messageText = getLineMessageText(event, messageType);
    const createdAt = eventCreatedAt(event);
    const { risk, tags } = summarizeRisk(messageText);
    const profile = await fetchLineSourceProfile(env, source);
    const displayName = profile?.displayName || getLineDisplayName(source);
    const pictureUrl = profile?.pictureUrl || '';
    const inferred = inferAudienceSignalsFromText(`${displayName}\n${messageText}`);
    const locationAddress = messageType === 'location' ? String(event.message?.address || event.message?.title || '').trim() : '';
    const locationLatitude = messageType === 'location' && event.message?.latitude !== undefined ? Number(event.message.latitude) : null;
    const locationLongitude = messageType === 'location' && event.message?.longitude !== undefined ? Number(event.message.longitude) : null;

    await env.DB.prepare(`
      INSERT INTO line_threads (
        id, source_type, source_user_id, source_group_id, display_name, picture_url,
        status, risk_level, summary, unread_count, tags,
        inferred_area, inferred_gender, inferred_confidence,
        location_address, location_latitude, location_longitude,
        last_message_at, created_at, updated_at
      ) VALUES (?, 'line_oa', ?, ?, ?, ?, 'open', ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        inferred_area = CASE
          WHEN line_threads.inferred_confidence = 'survey' AND excluded.location_address = '' THEN line_threads.inferred_area
          WHEN excluded.location_address <> '' THEN excluded.inferred_area
          WHEN excluded.inferred_area <> '' AND excluded.inferred_area <> '未判定' THEN excluded.inferred_area
          ELSE line_threads.inferred_area
        END,
        inferred_gender = CASE
          WHEN excluded.inferred_gender <> '' AND excluded.inferred_gender <> '未判定' THEN excluded.inferred_gender
          ELSE line_threads.inferred_gender
        END,
        inferred_confidence = CASE
          WHEN line_threads.inferred_confidence = 'survey' AND excluded.location_address = '' THEN line_threads.inferred_confidence
          WHEN excluded.location_address <> '' THEN 'location'
          WHEN excluded.inferred_confidence <> '' AND excluded.inferred_confidence <> 'none' THEN excluded.inferred_confidence
          ELSE line_threads.inferred_confidence
        END,
        location_address = CASE
          WHEN excluded.location_address <> '' THEN excluded.location_address
          ELSE line_threads.location_address
        END,
        location_latitude = COALESCE(excluded.location_latitude, line_threads.location_latitude),
        location_longitude = COALESCE(excluded.location_longitude, line_threads.location_longitude),
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
      inferred.area === '未判定' ? '' : inferred.area,
      inferred.gender === '未判定' ? '' : inferred.gender,
      inferred.confidence === 'none' ? '' : inferred.confidence,
      locationAddress,
      locationLatitude,
      locationLongitude,
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
    let surveyFirst = false;
    try { surveyFirst = await shouldPrioritizePointsSurvey(env, payload); } catch (err) {
      console.warn('survey priority check failed:', err.message);
    }
    if (surveyFirst) {
      try { await storeLineEvents(env, payload); } catch (err) {
        console.warn('storeLineEvents failed:', err.message);
      }
      try { await handlePointsSurveyAutomation(env, payload); } catch (err) {
        console.warn('points survey failed:', err.message);
      }
      try {
        await postToMotherWebhook(env, rawBody, signature);
      } catch (err) {
        console.error('mother webhook processing failed:', err.message);
      }
    } else {
      try {
        await postToMotherWebhook(env, rawBody, signature);
      } catch (err) {
        console.error('mother webhook processing failed:', err.message);
      }
      try { await storeLineEvents(env, payload); } catch (err) {
        console.warn('storeLineEvents failed:', err.message);
      }
      try { await handlePointsSurveyAutomation(env, payload); } catch (err) {
        console.warn('points survey failed:', err.message);
      }
    }
    try { await forwardWebhookToObserver(env, rawBody, signature); } catch (err) {
      console.warn('observer forward failed:', err.message);
    }
  })());

  return json({
    success: true,
    queued: true,
    events: Array.isArray(payload.events) ? payload.events.length : 0,
    motherWebhook: !!getGasWebhookUrl(env),
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
      summary: formatThreadSummary(row.summary || ''),
      unread: Number(row.unread_count || 0),
      tags: String(row.tags || '').split(',').map(v => v.trim()).filter(Boolean),
      signals: inferAudienceSignals(row),
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
    SELECT id, message_type, sender_role, sender_id, sender_name, message_text, raw_json, created_at
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
      summary: formatThreadSummary(row.summary || ''),
      unread: Number(row.unread_count || 0),
      tags: String(row.tags || '').split(',').map(v => v.trim()).filter(Boolean),
      signals: inferAudienceSignals(row, results || []),
      note: row.note || '',
      lastMessageAt: row.last_message_at || '',
      messages: (results || []).map(msg => ({
        id: msg.id,
        type: msg.message_type || 'text',
        senderRole: msg.sender_role || 'user',
        senderId: msg.sender_id || '',
        senderName: msg.sender_name || '',
        text: formatLineMessageForDisplay(msg),
        rawText: msg.message_text || '',
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
  const { results: riskRows } = await env.DB.prepare(`
    SELECT id, display_name, picture_url, source_user_id, source_group_id,
           risk_level, summary, unread_count, last_message_at
    FROM line_threads
    WHERE risk_level IN ('high', 'medium')
    ORDER BY CASE risk_level WHEN 'high' THEN 0 ELSE 1 END,
             COALESCE(last_message_at, created_at) DESC
    LIMIT 20
  `).all();
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
      riskThreads: (riskRows || []).map(row => ({
        id: row.id,
        name: row.display_name || '',
        pictureUrl: row.picture_url || '',
        userId: row.source_user_id || row.source_group_id || '',
        risk: row.risk_level || 'low',
        summary: formatThreadSummary(row.summary || ''),
        unread: Number(row.unread_count || 0),
        lastMessageAt: row.last_message_at || '',
      })),
    },
  };
}

async function backfillAudienceSignals(env, limit = 300) {
  if (!env.DB) throw new Error('D1 binding missing');
  const size = Math.max(1, Math.min(Number(limit) || 80, 80));
  const { results } = await env.DB.prepare(`
    SELECT id, display_name, summary, tags
    FROM line_threads
    WHERE inferred_area = ''
       OR inferred_gender = ''
    ORDER BY COALESCE(last_message_at, created_at) DESC
    LIMIT ?
  `).bind(size).all();

  let scanned = 0;
  let updated = 0;
  for (const row of results || []) {
    scanned += 1;
    const messages = await env.DB.prepare(`
      SELECT message_text
      FROM line_messages
      WHERE thread_id = ?
      ORDER BY created_at DESC
      LIMIT 20
    `).bind(row.id).all();
    const inferred = inferAudienceSignals(row, messages.results || []);
    const area = inferred.area === '未判定' ? '' : inferred.area;
    const gender = inferred.gender === '未判定' ? '' : inferred.gender;
    const confidence = inferred.confidence === 'none' ? '' : inferred.confidence;
    if (!area && !gender) continue;
    await env.DB.prepare(`
      UPDATE line_threads
      SET inferred_area = CASE WHEN inferred_area = '' THEN ? ELSE inferred_area END,
          inferred_gender = CASE WHEN inferred_gender = '' THEN ? ELSE inferred_gender END,
          inferred_confidence = CASE WHEN inferred_confidence = '' THEN ? ELSE inferred_confidence END,
          updated_at = datetime('now')
      WHERE id = ?
    `).bind(area, gender, confidence, row.id).run();
    updated += 1;
  }

  return { success: true, data: { scanned, updated } };
}

async function backfillPostbackText(env, limit = 500) {
  if (!env.DB) throw new Error('D1 binding missing');
  const size = Math.max(1, Math.min(Number(limit) || 500, 1500));
  const { results } = await env.DB.prepare(`
    SELECT id, thread_id, raw_json, message_text
    FROM line_messages
    WHERE message_type = 'postback'
      AND message_text = '[postback]'
    ORDER BY inserted_at DESC
    LIMIT ?
  `).bind(size).all();

  let scanned = 0;
  let updated = 0;
  const changedThreads = new Set();
  for (const row of results || []) {
    scanned += 1;
    let event = null;
    try { event = JSON.parse(row.raw_json || '{}'); } catch (_err) {}
    const text = getLineMessageText(event || {}, 'postback');
    if (!text || text === '[postback]') continue;
    await env.DB.prepare(`
      UPDATE line_messages
      SET message_text = ?
      WHERE id = ?
    `).bind(text, row.id).run();
    await env.DB.prepare(`
      UPDATE line_threads
      SET summary = CASE WHEN summary = '[postback]' THEN ? ELSE summary END,
          updated_at = datetime('now')
      WHERE id = ?
    `).bind(text, row.thread_id).run();
    changedThreads.add(row.thread_id);
    updated += 1;
  }
  return { success: true, data: { scanned, updated, changedThreads: changedThreads.size } };
}

function addSeconds(date, seconds) {
  return new Date(date.getTime() + seconds * 1000).toISOString();
}

function normalizeLineMessages(input) {
  if (Array.isArray(input)) return input;
  const text = String(input || '').trim();
  if (!text) return null;
  return [{ type: 'text', text }];
}

function buildBroadcastRecipientQuery(filters = {}) {
  const clauses = ["source_user_id <> ''"];
  const values = [];
  const joins = [];
  const status = String(filters.status || '').trim();
  const risk = String(filters.risk || '').trim();
  const gender = String(filters.gender || '').trim();
  const area = String(filters.area || '').trim();
  const tag = String(filters.tag || '').trim();
  const keyword = String(filters.keyword || '').trim();
  const surveyResidenceArea = String(filters.surveyResidenceArea || filters.survey_residence_area || '').trim();
  const surveyArea = String(filters.surveyArea || filters.survey_area || '').trim();
  const surveyGender = String(filters.surveyGender || filters.survey_gender || '').trim();
  const surveyTravelTime = String(filters.surveyTravelTime || filters.survey_travel_time || '').trim();
  const surveyPartyType = String(filters.surveyPartyType || filters.survey_party_type || '').trim();
  const surveyLodgingType = String(filters.surveyLodgingType || filters.survey_lodging_type || '').trim();
  const surveyBudget = String(filters.surveyBudget || filters.survey_budget || '').trim();
  const surveyCompleted = filters.surveyCompleted ?? filters.survey_completed ?? '';
  const activeDays = Number(filters.activeDays || filters.active_days || 0);
  const limit = Math.max(0, Math.min(Number(filters.limit || 0) || 0, 50000));
  const needsSurveyJoin = surveyResidenceArea || surveyArea || surveyGender || surveyTravelTime || surveyPartyType || surveyLodgingType || surveyBudget || surveyCompleted !== '';

  if (needsSurveyJoin) joins.push('LEFT JOIN line_survey_profiles sp ON sp.line_user_id = line_threads.source_user_id');

  if (status && status !== 'all') {
    clauses.push('status = ?');
    values.push(status);
  }
  if (risk && risk !== 'all') {
    clauses.push('risk_level = ?');
    values.push(risk);
  }
  if (gender && gender !== 'all') {
    clauses.push('inferred_gender = ?');
    values.push(gender);
  }
  if (area) {
    clauses.push('(inferred_area LIKE ? OR location_address LIKE ? OR summary LIKE ? OR tags LIKE ?)');
    values.push(`%${area}%`, `%${area}%`, `%${area}%`, `%${area}%`);
  }
  if (tag) {
    clauses.push('tags LIKE ?');
    values.push(`%${tag}%`);
  }
  if (keyword) {
    clauses.push('(display_name LIKE ? OR summary LIKE ? OR tags LIKE ?)');
    values.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }
  if (activeDays > 0) {
    clauses.push("last_message_at >= ?");
    values.push(new Date(Date.now() - activeDays * 24 * 60 * 60 * 1000).toISOString());
  }
  if (surveyCompleted !== '') {
    clauses.push('sp.completed = ?');
    values.push(Number(surveyCompleted) ? 1 : 0);
  }
  if (surveyResidenceArea) {
    clauses.push('sp.residence_area = ?');
    values.push(surveyResidenceArea);
  }
  if (surveyArea) {
    clauses.push('sp.area = ?');
    values.push(surveyArea);
  }
  if (surveyGender) {
    clauses.push('sp.gender = ?');
    values.push(surveyGender);
  }
  if (surveyTravelTime) {
    clauses.push('sp.travel_time = ?');
    values.push(surveyTravelTime);
  }
  if (surveyPartyType) {
    clauses.push('sp.party_type = ?');
    values.push(surveyPartyType);
  }
  if (surveyLodgingType) {
    clauses.push('sp.lodging_type = ?');
    values.push(surveyLodgingType);
  }
  if (surveyBudget) {
    clauses.push('sp.budget = ?');
    values.push(surveyBudget);
  }

  return {
    sql: `
      SELECT line_threads.source_user_id, line_threads.display_name
      FROM line_threads
      ${joins.join('\n')}
      WHERE ${clauses.join(' AND ')}
      GROUP BY line_threads.source_user_id
      ORDER BY MAX(COALESCE(line_threads.last_message_at, line_threads.created_at)) DESC
      ${limit > 0 ? `LIMIT ${limit}` : ''}
    `,
    values,
  };
}

async function previewBroadcastRecipients(env, body = {}) {
  const uid = String(body.uid || '').trim();
  if (!ADMIN_UIDS.has(uid)) return { success: false, error: 'FORBIDDEN' };
  const customUserIds = Array.isArray(body.userIds)
    ? body.userIds.map(v => String(v || '').trim()).filter(Boolean)
    : [];
  if (customUserIds.length) {
    return { success: true, data: { count: [...new Set(customUserIds)].length, sample: [] } };
  }
  const query = buildBroadcastRecipientQuery(body.filters || {});
  const { results } = await env.DB.prepare(query.sql).bind(...query.values).all();
  return {
    success: true,
    data: {
      count: (results || []).length,
      sample: (results || []).slice(0, 10).map(row => ({
        userId: row.source_user_id,
        name: row.display_name || '',
      })),
    },
  };
}

async function createBroadcastJob(env, body = {}) {
  if (!env.DB) throw new Error('D1 binding missing');
  const uid = String(body.uid || '').trim();
  if (!uid) return { success: false, error: 'MISSING_UID' };
  if (!ADMIN_UIDS.has(uid)) return { success: false, error: 'FORBIDDEN' };

  const messages = normalizeLineMessages(body.messages || body.message || body.text);
  if (!messages || !messages.length) return { success: false, error: 'MISSING_MESSAGE' };
  const batchSize = Math.max(1, Math.min(Number(body.batchSize || body.batch_size || 200) || 200, 500));
  const intervalSeconds = Math.max(30, Math.min(Number(body.intervalSeconds || body.interval_seconds || 60) || 60, 3600));
  const title = String(body.title || `Broadcast ${new Date().toISOString()}`).trim();
  const jobId = crypto.randomUUID();
  const now = new Date().toISOString();

  const customUserIds = Array.isArray(body.userIds)
    ? body.userIds.map(v => String(v || '').trim()).filter(Boolean)
    : [];
  let resolvedRecipientRows = customUserIds.map(userId => ({ source_user_id: userId, display_name: '' }));
  if (!customUserIds.length) {
    const query = buildBroadcastRecipientQuery(body.filters || {});
    const result = await env.DB.prepare(query.sql).bind(...query.values).all();
    resolvedRecipientRows = result.results || [];
  }

  const uniqueRecipients = [];
  const seen = new Set();
  for (const row of resolvedRecipientRows) {
    const userId = String(row.source_user_id || '').trim();
    if (!userId || seen.has(userId)) continue;
    seen.add(userId);
    uniqueRecipients.push({ userId, name: String(row.display_name || '') });
  }
  if (!uniqueRecipients.length) return { success: false, error: 'NO_RECIPIENTS' };

  await env.DB.prepare(`
    INSERT INTO line_broadcast_jobs (
      id, title, message_json, status, total_recipients, batch_size,
      interval_seconds, next_run_at, created_by, created_at, updated_at
    ) VALUES (?, ?, ?, 'queued', ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    jobId,
    title,
    JSON.stringify(messages),
    uniqueRecipients.length,
    batchSize,
    intervalSeconds,
    now,
    uid,
    now,
    now
  ).run();

  for (const recipient of uniqueRecipients) {
    await env.DB.prepare(`
      INSERT OR IGNORE INTO line_broadcast_recipients (
        id, job_id, line_user_id, display_name, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, 'queued', ?, ?)
    `).bind(crypto.randomUUID(), jobId, recipient.userId, recipient.name, now, now).run();
  }

  return { success: true, data: { id: jobId, title, totalRecipients: uniqueRecipients.length, batchSize, intervalSeconds } };
}

async function listBroadcastJobs(env, uid) {
  if (!ADMIN_UIDS.has(String(uid || '').trim())) return { success: false, error: 'FORBIDDEN' };
  const { results } = await env.DB.prepare(`
    SELECT id, title, status, total_recipients, sent_count, failed_count,
           batch_size, interval_seconds, next_run_at, created_at, updated_at,
           completed_at, last_error
    FROM line_broadcast_jobs
    ORDER BY created_at DESC
    LIMIT 50
  `).all();
  return {
    success: true,
    data: (results || []).map(row => ({
      id: row.id,
      title: row.title,
      status: row.status,
      totalRecipients: Number(row.total_recipients || 0),
      sentCount: Number(row.sent_count || 0),
      failedCount: Number(row.failed_count || 0),
      batchSize: Number(row.batch_size || 0),
      intervalSeconds: Number(row.interval_seconds || 0),
      nextRunAt: row.next_run_at || '',
      createdAt: row.created_at || '',
      updatedAt: row.updated_at || '',
      completedAt: row.completed_at || '',
      lastError: row.last_error || '',
    })),
  };
}

async function updateBroadcastJobStatus(env, body = {}) {
  const uid = String(body.uid || '').trim();
  if (!ADMIN_UIDS.has(uid)) return { success: false, error: 'FORBIDDEN' };
  const id = String(body.id || '').trim();
  const action = String(body.action || '').trim();
  if (!id) return { success: false, error: 'MISSING_JOB_ID' };
  const statusByAction = {
    pause: 'paused',
    resume: 'queued',
    cancel: 'cancelled',
  };
  const nextStatus = statusByAction[action];
  if (!nextStatus) return { success: false, error: 'INVALID_ACTION' };
  await env.DB.prepare(`
    UPDATE line_broadcast_jobs
    SET status = ?,
        next_run_at = CASE WHEN ? = 'queued' THEN ? ELSE next_run_at END,
        updated_at = ?
    WHERE id = ?
  `).bind(nextStatus, nextStatus, new Date().toISOString(), new Date().toISOString(), id).run();
  return { success: true, data: { id, status: nextStatus } };
}

async function sendLineMulticast(env, userIds, messages) {
  if (!env.LINE_CHANNEL_ACCESS_TOKEN) throw new Error('LINE_CHANNEL_ACCESS_TOKEN missing');
  const res = await fetch('https://api.line.me/v2/bot/message/multicast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ to: userIds, messages }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`LINE multicast failed (${res.status}): ${text.slice(0, 300)}`);
  return text;
}

async function processBroadcastJobs(env, maxJobs = 3) {
  if (!env.DB) throw new Error('D1 binding missing');
  const now = new Date();
  const { results: jobs } = await env.DB.prepare(`
    SELECT *
    FROM line_broadcast_jobs
    WHERE status IN ('queued', 'running')
      AND (next_run_at = '' OR next_run_at <= ?)
    ORDER BY created_at ASC
    LIMIT ?
  `).bind(now.toISOString(), Math.max(1, Math.min(Number(maxJobs) || 3, 10))).all();

  const summaries = [];
  for (const job of jobs || []) {
    const batchSize = Math.max(1, Math.min(Number(job.batch_size || 200), 500));
    const { results: recipients } = await env.DB.prepare(`
      SELECT id, line_user_id
      FROM line_broadcast_recipients
      WHERE job_id = ?
        AND status IN ('queued', 'failed')
        AND attempt_count < 3
      ORDER BY created_at ASC
      LIMIT ?
    `).bind(job.id, batchSize).all();

    if (!recipients || !recipients.length) {
      await env.DB.prepare(`
        UPDATE line_broadcast_jobs
        SET status = 'completed',
            completed_at = ?,
            updated_at = ?,
            next_run_at = ''
        WHERE id = ?
      `).bind(now.toISOString(), now.toISOString(), job.id).run();
      summaries.push({ id: job.id, completed: true, sent: 0 });
      continue;
    }

    const ids = recipients.map(row => row.id);
    const userIds = recipients.map(row => row.line_user_id);
    const placeholders = ids.map(() => '?').join(',');
    await env.DB.prepare(`
      UPDATE line_broadcast_recipients
      SET status = 'sending',
          attempt_count = attempt_count + 1,
          updated_at = ?
      WHERE id IN (${placeholders})
    `).bind(now.toISOString(), ...ids).run();

    let sent = 0;
    let failed = 0;
    let error = '';
    try {
      const messages = JSON.parse(job.message_json || '[]');
      await sendLineMulticast(env, userIds, messages);
      sent = recipients.length;
      await env.DB.prepare(`
        UPDATE line_broadcast_recipients
        SET status = 'sent',
            sent_at = ?,
            updated_at = ?,
            last_error = ''
        WHERE id IN (${placeholders})
      `).bind(now.toISOString(), now.toISOString(), ...ids).run();
    } catch (err) {
      failed = recipients.length;
      error = err.message || 'SEND_FAILED';
      await env.DB.prepare(`
        UPDATE line_broadcast_recipients
        SET status = CASE WHEN attempt_count >= 3 THEN 'failed' ELSE 'queued' END,
            updated_at = ?,
            last_error = ?
        WHERE id IN (${placeholders})
      `).bind(now.toISOString(), error.slice(0, 500), ...ids).run();
    }

    const nextRunAt = addSeconds(now, Number(job.interval_seconds || 60) || 60);
    await env.DB.prepare(`
      UPDATE line_broadcast_jobs
      SET status = 'queued',
          sent_count = sent_count + ?,
          failed_count = failed_count + ?,
          next_run_at = ?,
          updated_at = ?,
          last_error = ?
      WHERE id = ?
    `).bind(sent, failed, nextRunAt, now.toISOString(), error.slice(0, 500), job.id).run();
    summaries.push({ id: job.id, sent, failed, nextRunAt, error });
  }
  return { success: true, data: { processedJobs: summaries.length, jobs: summaries } };
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

async function serveGithubHtml(filename) {
  const res = await fetch(`https://raw.githubusercontent.com/fangwl591021/hostel/${GITHUB_HTML_REF}/${filename}?v=${Date.now()}`, {
    cf: { cacheTtl: 0, cacheEverything: false },
  });
  if (!res.ok) return json({ success: false, error: `HTML_PAGE_FETCH_FAILED_${res.status}` }, 502);
  let html = await res.text();
  if (filename === 'line-oa-monitor.html' && !html.includes('risk-list')) {
    const apiRes = await fetch(`https://api.github.com/repos/fangwl591021/hostel/contents/${encodeURIComponent(filename)}?ref=${GITHUB_HTML_REF}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'hostel-worker',
      },
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    if (!apiRes.ok) return json({ success: false, error: `HTML_PAGE_API_FETCH_FAILED_${apiRes.status}` }, 502);
    const payload = await apiRes.json();
    html = decodeBase64Utf8(payload.content || '');
  }
  if (filename === 'line-oa-monitor.html') html = injectMonitorRiskPanel(html);
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-store',
      'X-Hostel-Version': GITHUB_HTML_REF,
      ...CORS,
    },
  });
}

async function serveGithubAsset(filename, contentType) {
  const safeName = String(filename || '').replace(/[^a-zA-Z0-9._-]/g, '');
  const res = await fetch(`https://raw.githubusercontent.com/fangwl591021/hostel/main/assets/${safeName}?v=${Date.now()}`, {
    cf: { cacheTtl: 0, cacheEverything: false },
  });
  if (!res.ok) return json({ success: false, error: `ASSET_FETCH_FAILED_${res.status}` }, 404);
  return new Response(res.body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=300',
      ...CORS,
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const url = new URL(request.url);
    try {
      if (url.pathname === '/line-webhook' && request.method === 'POST') return handleLineWebhook(request, env, ctx);
      if (url.pathname === '/api/hub-test' && request.method === 'GET') return json({ success: true, data: await hubStatus(env) });
      if (url.pathname === '/api/admin/login' && request.method === 'POST') return handleAdminLogin(request, env);
      if (url.pathname === '/api/admin/logout' && request.method === 'POST') return handleAdminLogout();
      if (url.pathname === '/api/admin/session' && request.method === 'GET') {
        return json({ success: true, authenticated: await verifyAdminSession(request, env) });
      }
      if (url.pathname === '/hub-test' && request.method === 'GET') {
        return new Response(renderHubHtml(await hubStatus(env), url.origin), {
          headers: { 'Content-Type': 'text/html; charset=UTF-8', ...CORS },
        });
      }
      if ((url.pathname === '/' || url.pathname === '/monitor' || url.pathname === '/line-oa-monitor.html') && request.method === 'GET') {
        return serveGithubHtml('line-oa-monitor.html');
      }
      if ((url.pathname === '/broadcast' || url.pathname === '/line-broadcast.html') && request.method === 'GET') {
        return serveGithubHtml('line-broadcast.html');
      }
      if ((url.pathname === '/crm' || url.pathname === '/survey-crm' || url.pathname === '/line-survey-crm.html') && request.method === 'GET') {
        return serveGithubHtml('line-survey-crm.html');
      }
      if ((url.pathname === '/kb' || url.pathname === '/knowledge-base' || url.pathname === '/knowledge-base.html') && request.method === 'GET') {
        return serveGithubHtml('knowledge-base.html');
      }
      if (url.pathname === '/r/tainan-events' && request.method === 'GET') {
        await recordLinkClick(env, request, TAINAN_TOURISM_NEWS_TRACK_TARGET, {
          lineUserId: url.searchParams.get('uid') || '',
          source: url.searchParams.get('source') || '',
        });
        return Response.redirect(TAINAN_TOURISM_NEWS_URL, 302);
      }
      if (url.pathname === '/assets/survey-opening-sticker.png' && request.method === 'GET') {
        return serveGithubAsset('survey-opening-sticker.png', 'image/png');
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
      if (url.pathname === '/api/survey/summary' && request.method === 'GET') {
        const auth = authorizeAdminFromQuery(url);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await getSurveySummary(env));
      }
      if (url.pathname === '/api/survey/records' && request.method === 'GET') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        const result = await listSurveyRecords(env, { ...Object.fromEntries(url.searchParams.entries()), authorized: true });
        return json(result, result.success ? 200 : 403);
      }
      if (url.pathname === '/api/survey/export.csv' && request.method === 'GET') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        const result = await exportSurveyRecordsCsv(env, { ...Object.fromEntries(url.searchParams.entries()), authorized: true });
        if (!result.success) return json(result, 403);
        return new Response(result.csv, {
          headers: {
            'Content-Type': 'text/csv; charset=UTF-8',
            'Content-Disposition': 'attachment; filename="line-survey-crm.csv"',
            'Cache-Control': 'no-store',
            ...CORS,
          },
        });
      }
      if (url.pathname === '/api/crm/customers' && request.method === 'GET') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await listCrmCustomers(env, { ...Object.fromEntries(url.searchParams.entries()), authorized: true }));
      }
      if (url.pathname === '/api/crm/customers/export.csv' && request.method === 'GET') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        const result = await exportCrmCustomersCsv(env, { ...Object.fromEntries(url.searchParams.entries()), authorized: true });
        if (!result.success) return json(result, 403);
        return new Response(result.csv, {
          headers: {
            'Content-Type': 'text/csv; charset=UTF-8',
            'Content-Disposition': 'attachment; filename="crm-customers.csv"',
            'Cache-Control': 'no-store',
            ...CORS,
          },
        });
      }
      if (url.pathname === '/api/crm/point-events' && request.method === 'GET') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await listCrmPointEvents(env, { ...Object.fromEntries(url.searchParams.entries()), authorized: true }));
      }
      if (url.pathname === '/api/crm/link-clicks' && request.method === 'GET') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await getLinkClickStats(env, { ...Object.fromEntries(url.searchParams.entries()), authorized: true }));
      }
      if (url.pathname === '/api/kb/tree' && request.method === 'GET') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await listKnowledgeBase(env, { ...Object.fromEntries(url.searchParams.entries()), authorized: true }));
      }
      if (url.pathname === '/api/kb/folder' && request.method === 'POST') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        const result = await saveKnowledgeFolder(env, await request.json().catch(() => ({})));
        return json(result, result.success ? 200 : 400);
      }
      if (url.pathname === '/api/kb/item' && request.method === 'POST') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        const result = await saveKnowledgeItem(env, await request.json().catch(() => ({})));
        return json(result, result.success ? 200 : 400);
      }
      if (url.pathname === '/api/kb/item/delete' && request.method === 'POST') {
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await deleteKnowledgeItem(env, await request.json().catch(() => ({}))));
      }
      if (url.pathname === '/api/survey/backfill-residence' && ['GET', 'POST'].includes(request.method)) {
        const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {};
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await backfillSurveyResidenceAreas(env, body.limit || url.searchParams.get('limit') || 5000));
      }
      if (url.pathname === '/api/sync/hourly' && ['GET', 'POST'].includes(request.method)) {
        const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {};
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await runHourlyMonitorSync(env, Boolean(body.force || url.searchParams.get('force'))));
      }
      if (url.pathname === '/api/line-oa/import-members' && ['GET', 'POST'].includes(request.method)) {
        const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {};
        const auth = await authorizeAdminFromRequest(request, url, env);
        if (!auth.ok) return json({ success: false, error: auth.error }, auth.status);
        return json(await importMembersToMonitor(env, body.type || url.searchParams.get('type') || 'all'));
      }
      if (url.pathname === '/api/line-oa/backfill-signals' && ['GET', 'POST'].includes(request.method)) {
        const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {};
        const uid = String(body.uid || url.searchParams.get('uid') || '').trim();
        if (!uid) return json({ success: false, error: 'MISSING_UID' }, 400);
        if (!ADMIN_UIDS.has(uid)) return json({ success: false, error: 'FORBIDDEN' }, 403);
        return json(await backfillAudienceSignals(env, body.limit || url.searchParams.get('limit') || 300));
      }
      if (url.pathname === '/api/line-oa/backfill-postbacks' && ['GET', 'POST'].includes(request.method)) {
        const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {};
        const uid = String(body.uid || url.searchParams.get('uid') || '').trim();
        if (!uid) return json({ success: false, error: 'MISSING_UID' }, 400);
        if (!ADMIN_UIDS.has(uid)) return json({ success: false, error: 'FORBIDDEN' }, 403);
        return json(await backfillPostbackText(env, body.limit || url.searchParams.get('limit') || 500));
      }
      if (url.pathname === '/api/broadcast/jobs' && request.method === 'GET') {
        const uid = url.searchParams.get('uid') || '';
        return json(await listBroadcastJobs(env, uid));
      }
      if (url.pathname === '/api/broadcast/jobs' && request.method === 'POST') {
        const body = await request.json();
        const result = await createBroadcastJob(env, body);
        return json(result, result.success ? 200 : 400);
      }
      if (url.pathname === '/api/broadcast/preview' && request.method === 'POST') {
        const body = await request.json();
        const result = await previewBroadcastRecipients(env, body);
        return json(result, result.success ? 200 : 400);
      }
      if (url.pathname === '/api/broadcast/job' && request.method === 'POST') {
        const body = await request.json();
        const result = await updateBroadcastJobStatus(env, body);
        return json(result, result.success ? 200 : 400);
      }
      if (url.pathname === '/api/broadcast/run' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const uid = String(body.uid || url.searchParams.get('uid') || '').trim();
        if (!ADMIN_UIDS.has(uid)) return json({ success: false, error: 'FORBIDDEN' }, 403);
        return json(await processBroadcastJobs(env, body.maxJobs || url.searchParams.get('maxJobs') || 3));
      }
      return json({ success: false, error: 'NOT_FOUND' }, 404);
    } catch (err) {
      return json({ success: false, error: err.message }, 500);
    }
  },
  async scheduled(_event, env, _ctx) {
    await processBroadcastJobs(env, 3);
    await runHourlyMonitorSync(env);
  },
};

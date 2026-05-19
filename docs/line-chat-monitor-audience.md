# Hostel LINE 聊天室監控與受眾分析

## 架構

LINE Official Account 只設定一個 Webhook：

```text
https://hostel-worker.fangwl591021.workers.dev/line-webhook
```

Worker 負責：

- 驗證 LINE `x-line-signature`。
- 寫入 D1：`line_threads`、`line_messages`。
- 轉發同一批 events 到母站 webhook：`https://aiwe.cc/index.php/line_login/4572/`。
- 母站若回傳 `replyPayload`，由 Worker 呼叫 LINE Reply API。
- 選填 `FORWARD_WEBHOOK_URL` 做第二系統觀察或日誌，不消耗 reply token。

## 環境變數

非機密：

```text
GAS_URL=https://aiwe.cc/index.php/line_login/4572/
```

機密：

```text
LINE_CHANNEL_SECRET
LINE_CHANNEL_ACCESS_TOKEN
```

選填：

```text
FORWARD_WEBHOOK_URL
```

## 管理後台

```text
https://fangwl591021.github.io/hostel/line-oa-monitor.html
```

目前頁面提供：

- 聊天室列表、搜尋、待回覆、高風險篩選。
- 單一聊天室訊息檢視。
- 狀態、備註、標籤。
- 住宿情境的建議回覆草稿。
- 受眾分析：30 天活躍、7 天訊息、高風險、未讀、需求熱度、常見標籤。

## 診斷

```text
GET /hub-test
GET /api/hub-test
```

## API

```text
GET /api/line-oa/threads?uid={adminLineUid}
GET /api/line-oa/thread?uid={adminLineUid}&id={threadId}
POST /api/line-oa/thread
GET /api/line-oa/audience?uid={adminLineUid}
```

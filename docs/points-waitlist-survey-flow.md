# 水映南瀛點數候補問卷流程

活動頁：https://tainantravels.net/accommodations

## 觸發時機

當 LINE 使用者點擊或傳送「水映南瀛點數專區」時，系統啟動候補問卷。這個流程用在點數已領完、每週三才補發 5 萬點的空窗期，把重複點擊點數按鈕的人轉成可分眾名單。

## 問卷題目

1. 想找住宿的區域
   - 台南市區/安平
   - 北門/將軍/七股
   - 新化/玉井/楠西
   - 白河/東山/關子嶺
   - 還不確定

2. 旅遊或住宿時間
   - 本週
   - 2 週內
   - 1 個月內
   - 連假/暑假
   - 還不確定

3. 同行型態
   - 情侶/夫妻
   - 親子家庭
   - 朋友同行
   - 獨旅
   - 團體/公司

4. 住宿偏好
   - 民宿
   - 飯店
   - 親子住宿
   - 包棟
   - 先看優惠

5. 一晚住宿預算
   - 2000 內
   - 2000-4000
   - 4000-6000
   - 6000 以上
   - 看活動優惠

## 寫入資料

答案會寫入 `line_survey_profiles`：

- `area`
- `travel_time`
- `party_type`
- `lodging_type`
- `budget`
- `completed`
- `opt_in`
- `source_url`

同時會回填聊天室標籤，例如：

- `問卷:點數候補`
- `問卷:完成`
- `問卷:area:台南市區/安平`
- `問卷:travel_time:1 個月內`
- `問卷:party_type:親子家庭`
- `問卷:lodging_type:親子住宿`
- `問卷:budget:2000-4000`
- `分眾:可推播`

## 分眾推播使用方式

第一階段可直接用標籤或關鍵字推播：

- 標籤：`問卷:完成`
- 標籤：`分眾:可推播`
- 關鍵字：`親子家庭`
- 關鍵字：`台南市區/安平`

第二階段可用 API filters 精準篩：

```json
{
  "surveyCompleted": 1,
  "surveyArea": "台南市區/安平",
  "surveyPartyType": "親子家庭",
  "surveyLodgingType": "親子住宿",
  "surveyBudget": "2000-4000"
}
```

## 管理查詢

問卷統計：

```text
GET /api/survey/summary?uid={adminLineUid}
```

推播預覽：

```text
POST /api/broadcast/preview
```

帶入 `surveyCompleted`、`surveyArea`、`surveyTravelTime`、`surveyPartyType`、`surveyLodgingType`、`surveyBudget` 即可預覽受眾人數。

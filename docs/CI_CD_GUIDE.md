# 自動檢查與自動修正 — 使用說明

## 一、整體流程（白話版）

1. Claude 改程式，開一條獨立分支。
2. 推上 GitHub，GitHub 自動跑檢查（CI）。
3. 檢查過了 → 使用者看過改動，決定要不要合併。
4. 檢查失敗 → 開啟自動修正，Claude 讀取錯誤紀錄、找原因、改程式、重新推上去，最多 3 次。
5. 3 次還過不了 → 停下來回報，由人處理。

**合併與發布永遠由人決定**，Claude 不會自己合併或發布。

## 二、現在有哪些檢查

- **HTML 內嵌 JavaScript 語法檢查**：掃描所有 `.htm` / `.html` 檔案裡的 `<script>` 區塊。

要看結果：到 GitHub 的這個 repo → 上方 **Actions** 分頁。綠勾是通過，紅叉是失敗。

## 三、怎麼開啟 Claude 自動修正

前提：方案是 Claude Max，且 Claude GitHub App 已安裝在這個 repo 上。

1. 到 claude.ai/code 開一個工作階段，選這個 repo，貼上 PR 網址，說「幫我 auto-fix 這個 PR」。
2. Auto-fix 是**一個一個 PR 手動開啟**的，不是所有 PR 自動開。

## 四、自動修正的規則

見 `CLAUDE.md` 的「自動化開發規範」一節。

## 五、CI 失敗時怎麼看

1. GitHub → Actions → 點那次失敗的執行。
2. 展開紅色的步驟，找 `error` 字樣。
3. 把錯誤截圖或貼給 Claude，請它分析。

## 六、安全合併（人工步驟）

1. PR 的檢查全部綠勾。
2. 看一遍改動（Files changed 分頁）。
3. 確認沒有刪測試、沒有改 workflow、沒有寫入密碼。
4. 按 **Merge pull request**。

## 七、無法自動修正時

3 次仍失敗 → Claude 會停下來回報。你可以自己看錯誤、決定怎麼改。

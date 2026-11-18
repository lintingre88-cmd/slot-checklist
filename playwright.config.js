// 瀏覽器自動測試設定：起本機網頁伺服器，用桌面、平板、手機三種畫面測試。
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: { baseURL: 'http://127.0.0.1:8767' },
  webServer: {
    command: 'python3 -m http.server 8767 --bind 127.0.0.1',
    url: 'http://127.0.0.1:8767/index.html',
    reuseExistingServer: false,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 }, hasTouch: true, isMobile: false } },
    { name: 'phone', use: { ...devices['Pixel 5'] } },
  ],
});

// 機台設定檢查表：外部 CDN 與查詢 API 用假資料代替，只測本頁自己的功能與版面。
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.route('**/*', async (route) => {
    const url = route.request().url();
    if (url.startsWith('http://127.0.0.1')) return route.continue();
    if (url.includes('cdnjs.cloudflare.com')) {
      return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
    }
    if (url.includes('ngrok')) {
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    }
    return route.abort();
  });
});

test('頁面載入沒有 JavaScript 錯誤', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('/index.html');
  await expect(page.locator('#main')).toBeAttached();
  await page.waitForTimeout(500);
  expect(errors, errors.join('\n')).toEqual([]);
});

test('版面沒有橫向溢出（手機/平板不會被切掉）', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page.locator('#main')).toBeAttached();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, `橫向多出 ${overflow}px`).toBeLessThanOrEqual(1);
});

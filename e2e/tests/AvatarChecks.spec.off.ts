import { test, expect } from '@playwright/test';

test('Login page has proper title', async ({ page }) => {
  await page.goto('https://qa-task.redvike.rocks/');

  await expect(page).toHaveTitle(/Recruitment Task - Web Form/);
});

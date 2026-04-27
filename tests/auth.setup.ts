import { test as setup, expect } from '@playwright/test';

setup('login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input[name="email"]', 'alex.dev@test.com');
  await page.fill('input[name="password"]', 'password123');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("http://localhost:3000");

  await page.context().storageState({ path: 'storageState.json' });
});

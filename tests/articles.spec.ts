import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';


test('user sees articles page with content', async ({ page }) => {
  await page.goto('/articles');

  await expect(page).toHaveURL(/articles/);

  await expect(page.getByText('Останні публікації')).toBeVisible();
});


test('user can open article details', async ({ page }) => {
  await page.goto('/articles');

  await page.getByRole('link', { name: /читати далі/i }).first().click();

  await expect(page).toHaveURL(/articles\/\d+/);
});

test('user can create article', async ({ page }) => {
  await page.goto('/articles/create');

  await page.getByPlaceholder('Введіть цікаву назву...').fill('Test');
  await page.getByPlaceholder('Про що буде ваша стаття?').fill('Body');

  await page.getByRole('button', { name: /опублікувати/i }).click();

  await expect(page).toHaveURL(/articles/);
});

import { expect, test } from '@playwright/test';

test('Auth Test: protected URLs', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/dashboard');
  await expect(page).toHaveURL(/login/);

  await page.goto('/tasks');
  await expect(page).toHaveURL(/login/);

  await page.goto('/projects');
  await expect(page).toHaveURL(/login/);

  await context.close();
});

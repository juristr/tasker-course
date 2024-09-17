import { expect, test } from '@playwright/test';
import { login } from './helpers/auth-helper';

test('Tasks Test: List page', async ({ page }) => {
  await login(page);
  await page.goto('/tasks');

  await expect(page).toHaveURL('/tasks');
});

import { expect, test } from '@playwright/test';
import { login } from './helpers/auth-helper';

test('Sidebar Test: Navigation links', async ({ page }) => {
  await login(page);

  await page.click('[data-testid=nav-link-tasks]');

  await expect(page).toHaveURL('/tasks');

  await page.click('[data-testid=nav-link-projects]');

  await expect(page).toHaveURL('/projects');

  await page.click('[data-testid=nav-link-dashboard]');

  await expect(page).toHaveURL('/dashboard');
});

test('Sidebar Test: Logout', async ({ page }) => {
  await login(page);

  await page.click('[data-testid=logout]');

  await expect(page).toHaveURL('/login');
});

import { test, expect } from '@playwright/test';
import { login } from './helpers/auth-helper';

test('Login Test: Bad credentials', async ({ page }) => {
  await page.goto('/login');

  await page.fill('[data-testid=email]', 'alice@tasker.io');
  await page.fill('[data-testid=password]', 'bad');

  await page.click('[data-testid=submit]');

  const errorMessage = await page.textContent('[data-testid=error]');
  expect(errorMessage).toMatch(/Incorrect/);
});

test('Login Test: Good credentials', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL('/dashboard');
});

test('Logout and Re-Login Test', async ({ page }) => {
  await login(page, {
    email: 'alice@tasker.io',
    password: '123456',
  });

  await expect(page).toHaveURL('/dashboard');

  let text = await page.textContent('text=Alice Chen (You)');
  expect(text).toBeTruthy();

  await page.click('[data-testid=logout]');

  await expect(page).toHaveURL('/login');

  await login(page, {
    email: 'bob@tasker.io',
    password: '123456',
  });

  await expect(page).toHaveURL('/dashboard');

  text = await page.textContent('text=Bob Smith (You)');
  expect(text).toBeTruthy();
});

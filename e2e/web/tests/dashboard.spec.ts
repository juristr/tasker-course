import { expect, test } from '@playwright/test';
import { login } from './helpers/auth-helper';
import { createTask } from './helpers/task-helper';

test('Dashboard Test: Title', async ({ page }) => {
  await login(page);
  await page.goto('/dashboard');

  await expect(page).toHaveTitle(/Dashboard/);
});

test('Dashboard Test: Add new task', async ({ page }) => {
  const now = Date.now();
  await login(page, { email: 'alice@tasker.io', password: '123456' });
  await page.screenshot({ path: 'test-results/img.png' });
  await page.goto('/dashboard');

  const tasks = page.locator('[data-testid=task-item]');
  const initialTaskCount = await tasks.count();

  await createTask(page, {
    title: `Title ${now}`,
    description: `Description ${now}`,
    project: 'Engineering',
    assignToMe: true,
  });

  const newTaskCount = await tasks.count();

  expect(newTaskCount).toBeGreaterThan(initialTaskCount);
});

test('Dashboard Test: Team members', async ({ page }) => {
  await login(page, { email: 'alice@tasker.io', password: '123456' });
  await page.goto('/dashboard');

  const textContent = await page.textContent('[data-testid=team-members]');
  expect(textContent).toMatch(/Alice/);
  expect(textContent).toMatch(/Bob/);
});

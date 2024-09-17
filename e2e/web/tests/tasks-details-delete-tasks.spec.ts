import { test } from '@playwright/test';
import { login } from './helpers/auth-helper';
import { createTask } from './helpers/task-helper';

test('Tasks Test: Delete tasks', async ({ page }) => {
  const now = Date.now();
  await login(page, { email: 'alice@tasker.io', password: '123456' });
  await page.goto('/tasks');

  const tasks = page.locator('[data-testid=task-item]');

  await createTask(page, {
    title: `Test 1 ${now}`,
    description: `Test ${now}`,
    project: 'Engineering',
    assignToMe: true,
  });
  await createTask(page, {
    title: `Test 2 ${now}`,
    description: `Test ${now}`,
    project: 'Engineering',
    assignToMe: true,
  });

  await page.waitForTimeout(process.env.CI ? 2000 : 200);

  while ((await tasks.count()) > 0) {
    // Go to details view
    await tasks.first().click();
    await page.waitForTimeout(process.env.CI ? 1000 : 100);
    await page.click(`[data-testid=task-delete]`);
    // Back in project page
    await page.waitForTimeout(process.env.CI ? 1000 : 100);
  }
});

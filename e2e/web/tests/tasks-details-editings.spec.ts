import { expect, test } from '@playwright/test';
import { login } from './helpers/auth-helper';
import { createTask } from './helpers/task-helper';
import { format } from 'date-fns';

test('Tasks Tests: Details page editing', async ({ page }) => {
  const now = Date.now();
  await login(page, { email: 'alice@tasker.io', password: '123456' });

  await page.goto('/tasks');

  await createTask(page);

  // Go to created task
  const tasks = page.locator('[data-testid=my-tasks] [data-testid=task-item]');
  const taskCount = await tasks.count();
  const lastTask = tasks.nth(taskCount - 1);
  await lastTask.click();
  await page.waitForTimeout(process.env.CI ? 10_000 : 1000);

  await page.fill('[data-testid=task-input-title]', `New title ${now}`);
  await page.fill(
    '[data-testid=task-input-description]',
    `New description ${now}`,
  );
  await page.fill(
    '[data-testid=task-input-dueAt]',
    format(new Date(), 'yyyy-MM-dd'),
  );

  // Wait for data to update then reload
  await page.waitForTimeout(process.env.CI ? 10_000 : 1000);
  await page.reload();

  expect(
    await page.locator('[data-testid=task-input-title]').inputValue(),
  ).toEqual(`New title ${now}`);
  expect(
    await page.locator('[data-testid=task-input-description]').inputValue(),
  ).toEqual(`New description ${now}`);
  expect(
    await page.locator('[data-testid=task-input-dueAt]').inputValue(),
  ).toEqual(format(new Date(), 'yyyy-MM-dd'));
});

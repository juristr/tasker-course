import { expect, test } from '@playwright/test';
import { login } from './helpers/auth-helper';
import { createTask } from './helpers/task-helper';

test('Tasks Test: Create new task', async ({ page }) => {
  const now = Date.now();
  await login(page, { email: 'alice@tasker.io', password: '123456' });
  await page.goto('/tasks');

  const tasks = page.locator('[data-testid=task-item]');
  const initialTaskCount = await tasks.count();

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
  await createTask(page, {
    title: `Test 3 ${now}`,
    description: `Test ${now}`,
    project: 'Engineering',
    assignToMe: true,
  });
  await createTask(page, {
    title: `Test 4 ${now}`,
    description: `Test ${now}`,
    project: 'Engineering',
    assignToMe: true,
  });
  await createTask(page, {
    title: `Test 5 ${now}`,
    description: `Test ${now}`,
    project: 'Design',
    assignToMe: true,
  });
  await createTask(page, {
    title: `Test 6 ${now}`,
    description: `Test ${now}`,
    project: 'Design',
    assignToMe: true,
  });
  await createTask(page, {
    title: `Test 7 ${now}`,
    description: `Test ${now}`,
    project: 'Design',
    assignToMe: true,
  });
  await createTask(page, {
    title: `Test 8 ${now}`,
    description: `Test ${now}`,
    project: 'Design',
    assignToMe: true,
  });

  const newTaskCount = await tasks.count();

  expect(newTaskCount).toBeGreaterThan(initialTaskCount);

  const taskItemTextContents = await tasks.allTextContents();
  expect(
    taskItemTextContents.some((s) => s.match(`Test 1 ${now}`)),
  ).toBeTruthy();
  expect(
    taskItemTextContents.some((s) => s.match(`Test 2 ${now}`)),
  ).toBeTruthy();
  expect(
    taskItemTextContents.some((s) => s.match(`Test 3 ${now}`)),
  ).toBeTruthy();
  expect(
    taskItemTextContents.some((s) => s.match(`Test 4 ${now}`)),
  ).toBeTruthy();
  expect(
    taskItemTextContents.some((s) => s.match(`Test 5 ${now}`)),
  ).toBeTruthy();
  expect(
    taskItemTextContents.some((s) => s.match(`Test 6 ${now}`)),
  ).toBeTruthy();
  expect(
    taskItemTextContents.some((s) => s.match(`Test 7 ${now}`)),
  ).toBeTruthy();
  expect(
    taskItemTextContents.some((s) => s.match(`Test 8 ${now}`)),
  ).toBeTruthy();
});

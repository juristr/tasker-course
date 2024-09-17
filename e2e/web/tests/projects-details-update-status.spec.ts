import { expect, test } from '@playwright/test';
import { login } from './helpers/auth-helper';
import { setStatus } from './helpers/project-helper';

test('Projects Details: Update project status', async ({ page }) => {
  await login(page, { email: 'alice@tasker.io', password: '123456' });
  await page.goto('/projects/UX');

  await setStatus(page, 'at_risk');

  await page.waitForTimeout(process.env.CI ? 5000 : 1000);
  await page.reload();

  expect(
    await page.locator('[data-testid=project-input-status]').inputValue(),
  ).toEqual('at_risk');

  await setStatus(page, 'off_track');

  await page.waitForTimeout(process.env.CI ? 5000 : 1000);
  await page.reload();

  expect(
    await page.locator('[data-testid=project-input-status]').inputValue(),
  ).toEqual('off_track');

  await setStatus(page, 'on_track');

  await page.waitForTimeout(process.env.CI ? 5000 : 1000);
  await page.reload();

  expect(
    await page.locator('[data-testid=project-input-status]').inputValue(),
  ).toEqual('on_track');

  // Checking another project
  await page.goto('/projects/ENG');
  // Other project has default status
  expect(
    await page.locator('[data-testid=project-input-status]').inputValue(),
  ).toEqual('on_track');

  await setStatus(page, 'off_track');

  await page.waitForTimeout(process.env.CI ? 5000 : 1000);
  await page.reload();

  expect(
    await page.locator('[data-testid=project-input-status]').inputValue(),
  ).toEqual('off_track');

  await setStatus(page, 'at_risk');

  await page.waitForTimeout(process.env.CI ? 5000 : 1000);
  await page.reload();

  expect(
    await page.locator('[data-testid=project-input-status]').inputValue(),
  ).toEqual('at_risk');

  await setStatus(page, 'on_track');

  await page.waitForTimeout(process.env.CI ? 5000 : 1000);
  await page.reload();

  expect(
    await page.locator('[data-testid=project-input-status]').inputValue(),
  ).toEqual('on_track');
});

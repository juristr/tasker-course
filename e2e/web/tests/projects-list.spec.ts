import { expect, test } from '@playwright/test';
import { login } from './helpers/auth-helper';

test('Projects Tests: List page', async ({ page }) => {
  await login(page, { email: 'alice@tasker.io', password: '123456' });

  await page.goto('/projects');

  const projectCount = await page.locator('[data-testid=project-item]').count();

  expect(projectCount).toEqual(2);
});

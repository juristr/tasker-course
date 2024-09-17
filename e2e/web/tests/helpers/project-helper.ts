import type { Page } from '@playwright/test';

export async function setStatus(page: Page, status: string) {
  const select = page.locator('[data-testid=project-input-status]');
  const statusOptions = page.locator(
    '[data-testid=project-input-status] option',
  );
  let selectedStatus: string | null;
  for (let i = 0; i < (await statusOptions.count()); i++) {
    const value = await statusOptions.nth(i).getAttribute('value');

    if (value === status) {
      selectedStatus = await statusOptions.nth(i).getAttribute('value');
    }
  }
  await select.selectOption(selectedStatus!);

  await page.waitForTimeout(process.env.CI ? 5000 : 500);
}

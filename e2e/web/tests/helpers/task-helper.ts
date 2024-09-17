import type { Page } from '@playwright/test';
import { addDays, format } from 'date-fns';

export async function createTask(
  page: Page,
  data: {
    title?: string;
    description?: string;
    project?: string;
    assignToMe?: boolean;
  } = {},
) {
  data.title ??= 'Test title';
  data.description ??= 'Test description';
  data.assignToMe ??= true;

  await page.click('[data-testid=create-task-button]');

  const form = page.locator('[data-testid=create-task-form]');
  await form.waitFor();

  await page.fill('[data-testid=create-task-input-title]', data.title);
  await page.fill(
    '[data-testid=create-task-input-description]',
    data.description,
  );
  await page.fill(
    '[data-testid=create-task-input-dueAt]',
    format(addDays(new Date(), 1), 'yyyy-MM-dd'),
  );

  if (data.project) {
    const project = page.locator('[data-testid=create-task-input-project]');
    const projectOptions = page.locator(
      '[data-testid=create-task-input-project] option',
    );
    let selectedProject: string | null;
    for (let i = 0; i < (await projectOptions.count()); i++) {
      const text = await projectOptions.nth(i).textContent();

      if (text?.match(data.project)) {
        selectedProject = await projectOptions.nth(i).getAttribute('value');
      }
    }
    await project.selectOption(selectedProject!);
  }

  const assignee = page.locator('[data-testid=create-task-input-assignee]');
  const assigneeOptions = page.locator(
    '[data-testid=create-task-input-assignee] option',
  );

  let selectedAssignee: string | null;
  for (let i = 0; i < (await assigneeOptions.count()); i++) {
    const text = await assigneeOptions.nth(i).textContent();

    if (
      (data.assignToMe && text?.match(/Alice/)) ||
      (!data.assignToMe && !text?.match(/Alice/))
    ) {
      selectedAssignee = await assigneeOptions.nth(i).getAttribute('value');
    }
  }
  await assignee.selectOption(selectedAssignee!);

  await page.click('[data-testid=create-task-submit]');

  while (await form.isVisible()) {
    await page.waitForTimeout(process.env.CI ? 500 : 200);
  }

  await page.waitForTimeout(process.env.CI ? 10_000 : 500);
}

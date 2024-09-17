import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ProjectsStatuses } from './projects-statuses';

test('ProjectStatus: renders with empty', () => {
  const { baseElement } = render(<ProjectsStatuses projects={[]} />);

  expect(baseElement).toMatchSnapshot();
});

test('ProjectStatus: renders with projects', () => {
  const { baseElement } = render(
    <ProjectsStatuses
      projects={[
        {
          status: 'on_track',
          name: 'Engineering',
          id: 1,
          slug: 'ENG',
          Task: [],
        },
        { status: 'on_track', name: 'Design', id: 2, slug: 'UX', Task: [] },
      ]}
    />,
  );

  expect(baseElement).toMatchSnapshot();
});

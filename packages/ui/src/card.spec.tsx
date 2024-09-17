import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Card } from './card';

test('ProjectStatus: renders with empty', () => {
  const { baseElement } = render(
    <Card title="Hello" href="/hello">
      <p>This is a test</p>
    </Card>,
  );

  expect(baseElement).toMatchSnapshot();
});

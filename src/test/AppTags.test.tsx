import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import AppTags from '../components/global/AppTags';

test('renders children', () => {
  render(<AppTags variant="blue">Tag text</AppTags>);
  expect(screen.getByText('Tag text')).toBeInTheDocument();
});

test.each(['red', 'blue', 'purple', 'teal', 'gray'] as const)(
  'renders variant %s',
  (variant) => {
    const { container } = render(<AppTags variant={variant}>{variant}</AppTags>);
    expect(container.firstChild).toHaveTextContent(variant);
  }
);

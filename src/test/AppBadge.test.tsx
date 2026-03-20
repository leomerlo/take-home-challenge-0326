import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import AppBadge from '../components/global/AppBadge';

test('renders children', () => {
  render(
    <AppBadge severity="high">
      Critical issue
    </AppBadge>
  );
  expect(screen.getByText('Critical issue')).toBeInTheDocument();
});

test.each(['critical', 'high', 'medium', 'low'] as const)(
  'renders for severity %s',
  (severity) => {
    const { container } = render(<AppBadge severity={severity}>{severity}</AppBadge>);
    expect(container.querySelector('.capitalize')).toHaveTextContent(severity);
  }
);

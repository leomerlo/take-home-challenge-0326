import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import AppConfidenceBar from '../components/global/AppConfidenceBar';

test('sets progressbar semantics and width from confidence', () => {
  render(<AppConfidenceBar confidence={72} variant="medium" />);
  const bar = screen.getByRole('progressbar');
  expect(bar).toHaveAttribute('aria-valuenow', '72');
  expect(bar).toHaveAttribute('aria-valuemin', '0');
  expect(bar).toHaveAttribute('aria-valuemax', '100');
  expect(bar).toHaveStyle({ width: '72%' });
});

test('shows numeric confidence label', () => {
  render(<AppConfidenceBar confidence={40} variant="low" />);
  expect(screen.getByText('40')).toBeInTheDocument();
});

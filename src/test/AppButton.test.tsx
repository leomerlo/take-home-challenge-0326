import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import AppButton from '../components/global/AppButton';

test('renders children', () => {
  render(<AppButton>Submit</AppButton>);
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
});

test.each([
  ['primary', '[var(--augur-blue)]'],
  ['secondary', '[var(--border-default)]'],
  ['ghost', 'border-none'],
  ['danger', '[var(--severity-critical-bg)]'],
] as const)(
  'renders for variant %s',
  (variant, classNeedle) => {
    render(<AppButton variant={variant}>{variant}</AppButton>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent(variant);
    expect(btn.className).toContain(classNeedle);
  }
);

test('invokes onClick when clicked', () => {
  const onClick = vi.fn();
  render(<AppButton onClick={onClick}>Go</AppButton>);
  fireEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('does not invoke onClick when disabled', () => {
  const onClick = vi.fn();
  render(
    <AppButton onClick={onClick} disabled>
      Go
    </AppButton>
  );
  fireEvent.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
});

test('sets data-testid when testId is provided', () => {
  render(<AppButton testId="my-btn">X</AppButton>);
  expect(screen.getByTestId('my-btn')).toBeInTheDocument();
});

test('renders icon on the left by default', () => {
  render(
    <AppButton icon={<span data-testid="icon">★</span>} iconPosition="left">
      Label
    </AppButton>
  );
  expect(screen.getByRole('button').textContent).toMatch(/★/);
  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('renders icon on the right when iconPosition is right', () => {
  render(
    <AppButton icon={<span data-testid="icon">★</span>} iconPosition="right">
      Label
    </AppButton>
  );
  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

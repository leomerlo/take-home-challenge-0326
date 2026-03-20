import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import AppInput from '../components/global/AppInput';

test('associates input with sr-only label when no icon', () => {
  render(<AppInput label="Search field" placeholder="Type…" />);
  const input = screen.getByLabelText('Search field');
  expect(input).toHaveAttribute('placeholder', 'Type…');
});

test('uses visible icon label with aria-label when icon is set', () => {
  render(
    <AppInput
      label="Search"
      icon={<span data-testid="search-icon">🔍</span>}
    />
  );
  expect(screen.getByLabelText('Search')).toBeInTheDocument();
  expect(screen.getByTestId('search-icon')).toBeInTheDocument();
});

test('derives input id from label when id is omitted', () => {
  render(<AppInput label="My Field" />);
  expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-field');
});

test('respects explicit id', () => {
  render(<AppInput label="My Field" id="custom-id" />);
  expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
});

test('forwards change events', () => {
  const onChange = vi.fn();
  render(<AppInput label="x" onChange={onChange} />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } });
  expect(onChange).toHaveBeenCalled();
});

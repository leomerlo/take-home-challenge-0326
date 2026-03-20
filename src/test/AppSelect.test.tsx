import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import AppSelect from '../components/global/AppSelect';

const options = [
  { label: 'All', value: '' },
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
];

test('renders all options', () => {
  render(
    <AppSelect label="Pick" options={options} value="" onChange={() => {}} />
  );
  const sel = screen.getByRole('combobox');
  expect(sel).toHaveDisplayValue('All');
  expect(screen.getByRole('option', { name: 'One' })).toHaveValue('one');
  expect(screen.getByRole('option', { name: 'Two' })).toHaveValue('two');
});

test('shows selected value', () => {
  render(
    <AppSelect label="Pick" options={options} value="two" onChange={() => {}} />
  );
  expect(screen.getByRole('combobox')).toHaveDisplayValue('Two');
});

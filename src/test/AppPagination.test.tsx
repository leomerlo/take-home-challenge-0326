import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import AppPagination from '../components/global/AppPagination';

test('renders nothing when there are no pages', () => {
  const { container } = render(
    <AppPagination
      total={0}
      page={1}
      limit={10}
      elements="rows"
      onPageChange={vi.fn()}
    />
  );
  expect(container).toBeEmptyDOMElement();
});

test('shows range summary for current page', () => {
  render(
    <AppPagination
      total={25}
      page={1}
      limit={10}
      elements="rows"
      onPageChange={vi.fn()}
    />
  );
  expect(screen.getByText(/Showing 1-10 of 25 rows/)).toBeInTheDocument();
});

test('disables previous on first page and next on last page', () => {
  const onPageChange = vi.fn();
  const { rerender } = render(
    <AppPagination
      total={25}
      page={1}
      limit={10}
      elements="rows"
      onPageChange={onPageChange}
    />
  );
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled();

  rerender(
    <AppPagination
      total={25}
      page={3}
      limit={10}
      elements="rows"
      onPageChange={onPageChange}
    />
  );
  expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
});

test('invokes onPageChange when navigating', () => {
  const onPageChange = vi.fn();
  render(
    <AppPagination
      total={30}
      page={1}
      limit={10}
      elements="rows"
      onPageChange={onPageChange}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
  expect(onPageChange).toHaveBeenCalledWith(2);

  const pageTwo = screen
    .getAllByRole('button')
    .find((btn) => btn.querySelector('span')?.textContent === '2');
  expect(pageTwo).toBeDefined();
  fireEvent.click(pageTwo!);
  expect(onPageChange).toHaveBeenLastCalledWith(2);
});

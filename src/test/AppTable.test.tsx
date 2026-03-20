import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import AppTable from '../components/global/AppTable';

type Row = { id: string; name: string };

const headings = [
  { key: 'name' as const, label: 'Name' },
  { key: 'id' as const, label: 'ID', sortable: true as const },
];

const data: Row[] = [
  { id: 'a', name: 'Alpha' },
  { id: 'b', name: 'Beta' },
];

test('renders header labels and cell values', () => {
  render(
    <AppTable<Row> headings={headings} data={data} rowKey="id" />
  );
  expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'ID' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Alpha' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Beta' })).toBeInTheDocument();
});

test('calls onSortChange when clicking a sortable heading', () => {
  const onSortChange = vi.fn();
  render(
    <AppTable<Row>
      headings={headings}
      data={data}
      rowKey="id"
      onSortChange={onSortChange}
    />
  );
  fireEvent.click(screen.getByRole('columnheader', { name: 'ID' }));
  expect(onSortChange).toHaveBeenCalledWith('id', 'asc');
});

test('toggles sort direction when column is active', () => {
  const onSortChange = vi.fn();
  render(
    <AppTable<Row>
      headings={headings}
      data={data}
      rowKey="id"
      sortKey="id"
      sortOrder="asc"
      onSortChange={onSortChange}
    />
  );
  fireEvent.click(screen.getByRole('columnheader', { name: 'ID' }));
  expect(onSortChange).toHaveBeenCalledWith('id', 'desc');
});

test('calls onRowClick when row is clicked', () => {
  const onRowClick = vi.fn();
  render(
    <AppTable<Row>
      headings={headings}
      data={data}
      rowKey="id"
      onRowClick={onRowClick}
    />
  );
  const row = screen.getByText('Alpha').closest('tr');
  expect(row).not.toBeNull();
  fireEvent.click(row!);
  expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
});

test('supports row selection', () => {
  const onSelectionChange = vi.fn();
  render(
    <AppTable<Row>
      headings={headings}
      data={data}
      rowKey="id"
      selectable
      onSelectionChange={onSelectionChange}
    />
  );
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes.length).toBe(3);

  fireEvent.click(checkboxes[1]!);
  expect(onSelectionChange).toHaveBeenCalledWith(
    ['a'],
    [data[0]]
  );

  const selectAll = checkboxes[0]!;
  fireEvent.click(selectAll);
  expect(onSelectionChange).toHaveBeenLastCalledWith(
    ['a', 'b'],
    data
  );
});

test('uses heading and cell slots when provided', () => {
  render(
    <AppTable<Row>
      headings={headings}
      data={data}
      rowKey="id"
      headingSlots={{ name: <span>Custom</span> }}
      cellSlots={{
        name: (row) => <span>{`Row: ${row.name}`}</span>,
      }}
    />
  );
  expect(screen.getByRole('columnheader', { name: 'Custom' })).toBeInTheDocument();
  expect(screen.getByText('Row: Alpha')).toBeInTheDocument();
});

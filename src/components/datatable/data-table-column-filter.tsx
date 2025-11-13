import type { Column } from '@tanstack/react-table';
import DataTableColumnFilterInput from '~/components/datatable/filter/data-table-column-filter-input';
import DataTableColumnFilterRange from '~/components/datatable/filter/data-table-column-filter-range';
import DataTableColumnFilterSelect from '~/components/datatable/filter/data-table-column-filter-select';

interface DataTableColumnFilterProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

export default function DataTableColumnFilter<TData, TValue>({
  column,
}: DataTableColumnFilterProps<TData, TValue>) {
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === 'range' ? (
    <DataTableColumnFilterRange column={column} />
  ) : filterVariant === 'select' ? (
    <DataTableColumnFilterSelect column={column} />
  ) : (
    <DataTableColumnFilterInput column={column} />
  );
}

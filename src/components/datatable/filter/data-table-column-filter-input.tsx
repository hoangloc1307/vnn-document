import type { Column } from '@tanstack/react-table';
import { Input } from '~/components/ui/input';

type DataTableColumnFilterInputProps<TData, TValue> = {
  column: Column<TData, TValue>;
};

export default function DataTableColumnFilterInput<TData, TValue>({
  column,
}: DataTableColumnFilterInputProps<TData, TValue>) {
  return (
    <Input
      type='text'
      className='w-full'
      value={(column.getFilterValue() ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  );
}

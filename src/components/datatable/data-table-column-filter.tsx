import type { Column } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

interface DataTableColumnFilterProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

export default function DataTableColumnFilter<TData, TValue>({
  column,
}: DataTableColumnFilterProps<TData, TValue>) {
  const { filterVariant } = column.columnDef.meta ?? {};
  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant],
  );

  return filterVariant === 'range' ? (
    'Range'
  ) : filterVariant === 'select' ? (
    <Select
      onValueChange={(value) => column.setFilterValue(value === 'all' ? '' : value)}
      value={column.getFilterValue()?.toString() || 'all'}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Filter...' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='all'>All</SelectItem>
          {sortedUniqueValues.map((value, index) => {
            return (
              <SelectItem value={value} key={index}>
                {value}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <Input
      type='text'
      className='w-full'
      value={(column.getFilterValue() ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  );
}

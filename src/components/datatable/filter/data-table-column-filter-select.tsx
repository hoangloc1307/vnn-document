import type { Column } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

type DataTableColumnFilterSelectProps<TData, TValue> = {
  column: Column<TData, TValue>;
};

export default function DataTableColumnFilterSelect<TData, TValue>({
  column,
}: DataTableColumnFilterSelectProps<TData, TValue>) {
  const facetedUniqueValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(
    () => Array.from(facetedUniqueValues.keys()).sort().slice(0, 5000),
    [facetedUniqueValues],
  );

  return (
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
  );
}

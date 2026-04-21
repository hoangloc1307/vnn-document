import type { Column } from '@tanstack/react-table';
import { format, isEqual } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Calendar } from '~/components/ui/calendar';
import { Input } from '~/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

type DataTableColumnFilterDateProps<TData, TValue> = {
  column: Column<TData, TValue>;
};

export default function DataTableColumnFilterDate<TData, TValue>({
  column,
}: DataTableColumnFilterDateProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue() as DateRange | undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          type='text'
          className='w-full'
          value={
            columnFilterValue?.from
              ? columnFilterValue?.to
                ? isEqual(columnFilterValue.from, columnFilterValue.to)
                  ? format(columnFilterValue.from, 'dd/MM/yyyy')
                  : `${format(columnFilterValue.from, 'dd/MM/yyyy')} - ${format(columnFilterValue.to, 'dd/MM/yyyy')}`
                : format(columnFilterValue.from, 'dd/MM/yyyy')
              : ''
          }
          readOnly
        />
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='range'
          defaultMonth={columnFilterValue?.from}
          selected={columnFilterValue}
          onSelect={column.setFilterValue}
          numberOfMonths={2}
          captionLayout='dropdown'
        />
      </PopoverContent>
    </Popover>
  );
}

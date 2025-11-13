import type { Column } from '@tanstack/react-table';
import { InputGroup, InputGroupInput } from '~/components/ui/input-group';
import { Separator } from '~/components/ui/separator';

type DataTableColumnFilterRangeProps<TData, TValue> = {
  column: Column<TData, TValue>;
};

export default function DataTableColumnFilterRange<TData, TValue>({
  column,
}: DataTableColumnFilterRangeProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue() as
    | [number | undefined, number | undefined]
    | undefined;

  const min = columnFilterValue?.[0] ?? '';
  const max = columnFilterValue?.[1] ?? '';

  return (
    <InputGroup>
      <InputGroupInput
        type='number'
        placeholder='Min'
        value={min}
        onChange={(event) => {
          const value = event.target.value;
          const nextMin = value === '' ? undefined : Number(value);
          column.setFilterValue([nextMin, max]);
        }}
      />
      <Separator orientation='vertical' />
      <InputGroupInput
        type='number'
        placeholder='Max'
        value={max}
        onChange={(event) => {
          const value = event.target.value;
          const nextMax = value === '' ? undefined : Number(value);
          column.setFilterValue([min, nextMax]);
        }}
      />
    </InputGroup>
  );
}

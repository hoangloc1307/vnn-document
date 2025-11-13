import type { Column } from '@tanstack/react-table';
import { InputGroup, InputGroupInput } from '~/components/ui/input-group';
import { Separator } from '~/components/ui/separator';
import { NumericFormat } from 'react-number-format';

type DataTableColumnFilterRangeProps<TData, TValue> = {
  column: Column<TData, TValue>;
};

export default function DataTableColumnFilterRange<TData, TValue>({
  column,
}: DataTableColumnFilterRangeProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue() as
    | [number | undefined, number | undefined]
    | undefined;

  const [min, max] = columnFilterValue ?? ['', ''];

  return (
    <InputGroup>
      <NumericFormat
        customInput={InputGroupInput}
        inputMode='decimal'
        allowNegative={false}
        thousandSeparator
        placeholder='Min'
        value={min}
        onValueChange={({ value }) => {
          const nextMin = value === '' ? undefined : Number(value);
          column.setFilterValue([nextMin, max]);
        }}
      />
      <Separator orientation='vertical' />
      <NumericFormat
        customInput={InputGroupInput}
        inputMode='decimal'
        allowNegative={false}
        thousandSeparator
        placeholder='Max'
        value={max}
        onValueChange={({ value }) => {
          const nextMax = value === '' ? undefined : Number(value);
          column.setFilterValue([min, nextMax]);
        }}
      />
    </InputGroup>
  );
}

import type { Column } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { Button } from '~/components/ui/button';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  label: React.ReactNode;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  label,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <Button
      variant='ghost'
      size='sm'
      className='w-full justify-normal px-0 has-[>svg]:px-0'
      onClick={(e) => column.toggleSorting(undefined, (e as React.MouseEvent).shiftKey)}
    >
      <span>{label}</span>
      {column.getCanSort() && (
        <>
          {column.getIsSorted() === 'desc' ? (
            <ChevronDown />
          ) : column.getIsSorted() === 'asc' ? (
            <ChevronUp />
          ) : (
            <ChevronsUpDown className='text-muted-foreground/50' />
          )}
        </>
      )}
    </Button>
  );
}

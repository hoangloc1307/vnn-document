import type { Column } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  label: React.ReactNode;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  label,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{label}</div>;
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant='ghost'
        size='sm'
        className='data-[state=open]:bg-accent -ml-3 h-8'
        onClick={(e) => column.toggleSorting(undefined, (e as React.MouseEvent).shiftKey)}
      >
        <span>{label}</span>
        {column.getIsSorted() === 'desc' ? (
          <ChevronDown />
        ) : column.getIsSorted() === 'asc' ? (
          <ChevronUp />
        ) : (
          <ChevronsUpDown className='text-muted-foreground/50' />
        )}
      </Button>
    </div>
  );
}

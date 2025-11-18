import type { Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { Fragment } from 'react';
import DataTableColumnFilter from '~/components/datatable/data-table-column-filter';
import { Button } from '~/components/ui/button';
import { TableHead, TableHeader, TableRow } from '~/components/ui/table';

interface DataTableHeaderProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  const showFilters = table.options.meta?.showFilters;

  return (
    <TableHeader className='bg-muted shadow-border sticky top-0 z-10 grid shadow [&_tr]:border-b-0'>
      {table.getHeaderGroups().map((headerGroup) => (
        <Fragment key={headerGroup.id}>
          <TableRow className='flex h-full w-full'>
            {headerGroup.headers.map((header) => {
              if (header.isPlaceholder)
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize(),
                    }}
                  />
                );

              const title =
                typeof header.column.columnDef.header === 'string'
                  ? (header.column.columnDef.header as string)
                  : flexRender(header.column.columnDef.header, header.getContext());

              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className='h-full p-0'
                  style={{
                    width: header.getSize(),
                    flex: `${header.getSize()} 0 auto`,
                  }}
                >
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-full min-h-10 w-full justify-normal gap-0.5 px-2 has-[>svg]:px-2'
                    onClick={(e) => {
                      if (!table.getRowModel().rows?.length) return;
                      header.column.toggleSorting(undefined, (e as React.MouseEvent).shiftKey);
                    }}
                  >
                    <p className='max-w-[calc(100%-16x)] whitespace-break-spaces'>{title}</p>
                    {header.column.getCanSort() && (
                      <>
                        {header.column.getIsSorted() === 'desc' ? (
                          <ChevronDown />
                        ) : header.column.getIsSorted() === 'asc' ? (
                          <ChevronUp />
                        ) : (
                          <ChevronsUpDown className='text-muted-foreground/50' />
                        )}
                      </>
                    )}
                  </Button>
                </TableHead>
              );
            })}
          </TableRow>

          {/* <==> FILTER ROW <==> */}
          {showFilters && (
            <TableRow className='flex w-full'>
              {headerGroup.headers.map((header) => {
                const column = header.column;
                if (!column.getCanFilter()) {
                  return <TableHead key={header.id} />;
                }

                return (
                  <TableHead
                    key={header.id}
                    className='h-max p-2'
                    style={{
                      width: header.getSize(),
                      flex: `${header.getSize()} 0 auto`,
                    }}
                  >
                    <DataTableColumnFilter column={header.column} />
                  </TableHead>
                );
              })}
            </TableRow>
          )}
        </Fragment>
      ))}
    </TableHeader>
  );
}

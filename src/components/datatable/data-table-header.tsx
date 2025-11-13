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
    <TableHeader className='bg-background shadow-border sticky top-0 shadow [&_tr]:border-b-0'>
      {table.getHeaderGroups().map((headerGroup) => (
        <Fragment key={headerGroup.id}>
          <TableRow>
            {headerGroup.headers.map((header) => {
              if (header.isPlaceholder)
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: header.column.getSize(),
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
                  style={{
                    width: header.column.getSize(),
                  }}
                >
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-normal px-0 has-[>svg]:px-0'
                    onClick={(e) =>
                      header.column.toggleSorting(undefined, (e as React.MouseEvent).shiftKey)
                    }
                  >
                    <span>{title}</span>
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
            <TableRow>
              {headerGroup.headers.map((header) => {
                const column = header.column;
                if (!column.getCanFilter()) {
                  return <TableHead key={header.id} />;
                }

                return (
                  <TableHead key={header.id} className='p-2'>
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

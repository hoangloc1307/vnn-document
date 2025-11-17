import type { Cell, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useTranslation } from 'react-i18next';
import { TableBody, TableCell, TableRow } from '~/components/ui/table';

interface DataTableBodyProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
}

const ESTIMATED_ROW_HEIGHT = 39;
const ROW_VIRTUAL_THRESHOLD = 25;

export function DataTableBody<TData>({ table, tableContainerRef }: DataTableBodyProps<TData>) {
  const { t } = useTranslation(['datatable']);
  const emptyBody = Boolean(!table.getRowModel().rows?.length);
  const visibleRows = table.getRowModel().rows;
  const enableVirtual = visibleRows.length > ROW_VIRTUAL_THRESHOLD;

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: enableVirtual ? visibleRows.length : 0,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    getScrollElement: () => tableContainerRef.current,
    overscan: 5,
  });

  return (
    <>
      {/* <==> EMPTY BODY <==> */}
      {emptyBody && (
        <TableBody>
          <TableRow>
            <TableCell colSpan={table.getAllLeafColumns().length} className='h-24 text-center'>
              {t('datatable:empty')}
            </TableCell>
          </TableRow>
        </TableBody>
      )}

      {/* <==> BODY WITH DATA AND NOT ENABLE VIRTUAL <==> */}
      {Boolean(!emptyBody && !enableVirtual) && (
        <TableBody className='relative grid'>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className='flex w-full'>
              {row.getVisibleCells().map((cell) => (
                <DataTableCell cell={cell} key={cell.id} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}

      {/* <==> BODY WITH DATA AND ENABLE VIRTUAL <==> */}
      {Boolean(!emptyBody && enableVirtual) && (
        <TableBody
          className='relative grid'
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = visibleRows[virtualRow.index];
            return (
              <TableRow
                className='absolute flex w-full'
                key={virtualRow.key}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <DataTableCell cell={cell} key={cell.id} />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </>
  );
}

function DataTableCell<TData>({ cell }: { cell: Cell<TData, unknown> }) {
  return (
    <TableCell
      key={cell.id}
      style={{
        width: cell.column.getSize(),
        flex: `${cell.column.getSize()} 0 auto`,
      }}
      className='overflow-hidden text-ellipsis whitespace-nowrap'
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
}

import type { Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { TableBody, TableCell, TableRow } from '~/components/ui/table';

interface DataTableBodyProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
}

export function DataTableBody<TData>({ table }: DataTableBodyProps<TData>) {
  const { t } = useTranslation(['datatable']);
  const emptyBody = Boolean(!table.getRowModel().rows?.length);

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

      {/* <==> BODY WITH DATA <==> */}
      {!emptyBody && (
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}
    </>
  );
}

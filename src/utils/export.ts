import { flexRender, type Table } from '@tanstack/react-table';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export async function datatableExportDefaultHandler<TData>(
  table: Table<TData>,
  options?: {
    filename?: string;
  },
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet();

  const rows = table.getCoreRowModel().rows;
  const columns = table.getVisibleLeafColumns().filter((col) => col.accessorFn);
  const headers = table
    .getHeaderGroups()
    .map((headerGroup) =>
      headerGroup.headers.map((header) =>
        flexRender(header.column.columnDef.header, header.getContext()),
      ),
    );

  worksheet.addRow(headers[0].filter((h) => typeof h === 'string'));

  rows.forEach((row) => {
    const rowData = columns.map((col) => {
      const value = row.getValue(col.id);
      return value ?? '';
    });

    worksheet.addRow(rowData);
  });

  worksheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer]);

  saveAs(blob, options?.filename ?? 'export.xlsx');
}

import type { ColumnDef } from '@tanstack/react-table';
import { endOfDay, format, isAfter, isBefore, startOfDay } from 'date-fns';
import type { TFunction } from 'i18next';
import ActionCell, { type WarehouseRowActions } from '~/pages/warehouses/ActionCell';
import type { Warehouse } from '~/types/warehouse';

export const getWarehouseColumns = (
  t: TFunction,
  actions?: WarehouseRowActions,
): ColumnDef<Warehouse>[] => [
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const warehouse = row.original;
      return <ActionCell row={warehouse} actions={actions} t={t} />;
    },
  },
  {
    accessorKey: 'code',
    header: t('warehouse:code'),
  },
  {
    accessorKey: 'name',
    header: t('warehouse:name'),
    size: 250,
  },
  {
    accessorKey: 'note',
    header: t('common:note'),
  },
  {
    accessorKey: 'createdAt',
    header: t('common:created_at'),
    cell: ({ row }) => {
      const date = format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm:ss');
      return date;
    },
    meta: {
      filterVariant: 'date',
    },
    filterFn: (row, column, value) => {
      const date = new Date(row.getValue(column) as string);
      if (!date) return false;
      const { from, to } = value as { from: Date; to: Date };
      return isAfter(date, startOfDay(from)) && isBefore(date, endOfDay(to));
    },
  },
  {
    accessorKey: 'createdBy',
    header: t('common:created_by'),
  },
  {
    accessorKey: 'updatedAt',
    header: t('common:updated_at'),
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt') as string | null;
      const date = updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy HH:mm:ss') : null;
      return date;
    },
    meta: {
      filterVariant: 'date',
    },
    filterFn: (row, column, value) => {
      const date = new Date(row.getValue(column) as string);
      if (!date) return false;
      const { from, to } = value as { from: Date; to: Date };
      return isAfter(date, startOfDay(from)) && isBefore(date, endOfDay(to));
    },
  },
  {
    accessorKey: 'updatedBy',
    header: t('common:updated_by'),
  },
];

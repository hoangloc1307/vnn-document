import type { ColumnDef } from '@tanstack/react-table';
import { endOfDay, format, isAfter, isBefore, startOfDay } from 'date-fns';
import type { TFunction } from 'i18next';
import ActionCell, { type ZoneRowActions } from '~/pages/zones/ActionCell';
import type { Zone } from '~/types/zone';

export const getZoneColumns = (t: TFunction, actions?: ZoneRowActions): ColumnDef<Zone>[] => [
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const zone = row.original;
      return <ActionCell row={zone} actions={actions} t={t} />;
    },
  },
  {
    accessorKey: 'code',
    header: t('zone:code'),
  },
  {
    accessorKey: 'name',
    header: t('zone:name'),
    size: 250,
  },
  {
    accessorKey: 'warehouse.name',
    header: t('zone:warehouse_code'),
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

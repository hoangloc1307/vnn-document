import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { TFunction } from 'i18next';
import { Badge } from '~/components/ui/badge';
import ActionCell, { type ItemRowActions } from '~/pages/items/ActionCell';
import type { Item } from '~/types/item';

export const getItemColumns = (t: TFunction, actions?: ItemRowActions): ColumnDef<Item>[] => [
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const item = row.original;
      return <ActionCell item={item} actions={actions} t={t} />;
    },
  },
  {
    accessorKey: 'itemCode',
    header: t('item:item_code'),
  },
  {
    accessorKey: 'productCode',
    header: t('item:product_code'),
    size: 120,
  },
  {
    accessorKey: 'name',
    header: t('item:name'),
  },
  {
    accessorKey: 'unit',
    header: t('item:unit'),
    size: 120,
  },
  {
    accessorKey: 'baseUnit',
    header: t('item:base_unit'),
    size: 100,
  },
  {
    accessorKey: 'conversionFactor',
    header: t('item:conversion_factor'),
    size: 130,
    filterFn: 'inNumberRange',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'deliveryOnBaseUnit',
    accessorFn: (row) => (row.deliveryOnBaseUnit ? 'Yes' : 'No'),
    header: t('item:delivery_on_base_unit'),
    size: 160,
    meta: {
      filterVariant: 'select',
    },
    cell: ({ row }) => {
      const isTrue = row.getValue('deliveryOnBaseUnit') === 'Yes';
      return (
        <Badge
          variant='default'
          className={
            isTrue
              ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
              : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
          }
        >
          {isTrue ? 'Yes' : 'No'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'trackingType',
    header: t('item:tracking_type'),
    meta: {
      filterVariant: 'select',
    },
  },
  {
    accessorKey: 'note',
    header: t('item:note'),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: t('common:created_at'),
    cell: ({ row }) => {
      const date = format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm:ss');
      return date;
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
  },
  {
    accessorKey: 'updatedBy',
    header: t('common:updated_by'),
  },
];

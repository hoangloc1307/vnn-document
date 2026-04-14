import type { ColumnDef } from '@tanstack/react-table';
import type { TFunction } from 'i18next';
import { Badge } from '~/components/ui/badge';
import type { Item } from '~/types/item';

export const getItemColumns = (t: TFunction): ColumnDef<Item>[] => [
  {
    accessorKey: 'itemCode',
    header: t('item_code'),
  },
  {
    accessorKey: 'productCode',
    header: t('product_code'),
    size: 120,
  },
  {
    accessorKey: 'name',
    header: t('name'),
  },
  {
    accessorKey: 'unit',
    header: t('unit'),
    size: 120,
  },
  {
    accessorKey: 'baseUnit',
    header: t('base_unit'),
    size: 100,
  },
  {
    accessorKey: 'conversionFactor',
    header: t('conversion_factor'),
    size: 130,
    filterFn: 'inNumberRange',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'deliveryOnBaseUnit',
    accessorFn: (row) => (row.deliveryOnBaseUnit ? 'Yes' : 'No'),
    header: t('delivery_on_base_unit'),
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
    header: t('tracking_type'),
    meta: {
      filterVariant: 'select',
    },
  },
];

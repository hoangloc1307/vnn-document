import type { ColumnDef } from '@tanstack/react-table';
import type { Item } from '~/types/item';

export const itemColumns: ColumnDef<Item>[] = [
  {
    accessorKey: 'itemCode',
    header: 'Item Code',
  },
  {
    accessorKey: 'productCode',
    header: 'Product Code',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'unit',
    header: 'Unit',
  },
  {
    accessorKey: 'baseUnit',
    header: 'Base Unit',
  },
  {
    accessorKey: 'conversionFactor',
    header: 'Conversion Factor',
  },
  {
    accessorKey: 'deliveryOnBaseUnit',
    header: 'Delivery On Base Unit',
  },
  {
    accessorKey: 'trackingType',
    header: 'Tracking Type',
  },
  // {
  //   accessorKey: 'maintenanceIntervalHours',
  //   header: 'Maintenance After (hours)',
  //   filterFn: 'inNumberRange',
  //   meta: {
  //     filterVariant: 'range',
  //   },
  // },
  // {
  //   accessorKey: 'status',
  //   accessorFn: (row) => (row.status ? 'Active' : 'Inactive'),
  //   header: 'Status',
  //   filterFn: 'equals',
  //   size: 100,
  //   cell: ({ row }) => {
  //     const isActive = row.getValue('status') === 'Active';
  //     return (
  //       <Badge variant='outline' className='px-1.5'>
  //         {isActive ? (
  //           <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />
  //         ) : (
  //           <IconCircleXFilled className='fill-red-500 dark:fill-red-400' />
  //         )}
  //         {isActive ? 'Active' : 'Inactive'}
  //       </Badge>
  //     );
  //   },
  //   meta: {
  //     filterVariant: 'select',
  //   },
  // },
];

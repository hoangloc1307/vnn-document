import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '~/components/ui/badge';

export type Category = {
  id: string;
  name: string;
  description?: string;
  maintenanceIntervalHours?: number;
  status: boolean;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    enableSorting: false,
  },
  {
    accessorKey: 'maintenanceIntervalHours',
    header: 'Maintenance After (hours)',
    filterFn: 'inNumberRange',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'status',
    accessorFn: (row) => (row.status ? 'Active' : 'Inactive'),
    header: 'Status',
    filterFn: 'equals',
    size: 100,
    cell: ({ row }) => {
      const isActive = row.getValue('status') === 'Active';
      return (
        <Badge variant='outline' className='px-1.5'>
          {isActive ? (
            <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />
          ) : (
            <IconCircleXFilled className='fill-red-500 dark:fill-red-400' />
          )}
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
    meta: {
      filterVariant: 'select',
    },
  },
];

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
    size: 100,
  },
  {
    accessorKey: 'status',
    accessorFn: (row) => (row.status ? 'Active' : 'Inactive'),
    header: 'Status',
    filterFn: 'equals',
    size: 50,
    cell: ({ row }) => {
      const isActive = row.getValue('status') === 'Active';
      return (
        <Badge className={isActive ? 'bg-green-700' : 'bg-red-700'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
    meta: {
      filterVariant: 'select',
    },
  },
];

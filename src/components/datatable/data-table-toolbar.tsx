import type { Table } from '@tanstack/react-table';
import { Funnel, FunnelX } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { DataTableGlobalSearch } from '~/components/datatable/data-table-global-search';
import { DataTableViewOptions } from '~/components/datatable/data-table-view-options';
import { Button } from '~/components/ui/button';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
}

export function DataTableToolbar<TData>({
  table,
  showFilters,
  setShowFilters,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        {/* <==> SEARCH <==> */}
        <DataTableGlobalSearch table={table} />
      </div>

      <div className='flex space-x-2'>
        {/* <==> SHOW / HIDE FILTERS <==> */}
        <Button
          size={'sm'}
          variant={showFilters ? 'default' : 'outline'}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? <FunnelX /> : <Funnel />}
          Filters
        </Button>

        {/* <==> SHOW / HIDE COLUMNS <==> */}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

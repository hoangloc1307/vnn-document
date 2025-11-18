import type { Table } from '@tanstack/react-table';
import { Fullscreen, Funnel, Search } from 'lucide-react';
import { useEffect } from 'react';
import { DataTableGlobalSearch } from '~/components/datatable/data-table-global-search';
import { DataTableViewOptions } from '~/components/datatable/data-table-view-options';
import { Button } from '~/components/ui/button';
import { ButtonGroup } from '~/components/ui/button-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const showFilters = table.options.meta?.showFilters;
  const setShowFilters = table.options.meta?.setShowFilters;
  const showSearch = table.options.meta?.showSearch;
  const setShowSearch = table.options.meta?.setShowSearch;
  const fullScreen = table.options.meta?.fullScreen;
  const setFullScreen = table.options.meta?.setFullScreen;

  useEffect(() => {
    if (!showFilters) {
      table.resetColumnFilters();
    }
  }, [showFilters, table]);

  useEffect(() => {
    if (!showSearch) {
      table.resetGlobalFilter();
    }
  }, [showSearch, table]);

  return (
    <div className='flex items-center justify-end gap-2'>
      <DataTableGlobalSearch table={table} />
      <ButtonGroup>
        {/* <==> TOGGLE SEARCH <==> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'sm'}
              variant={showSearch ? 'default' : 'outline'}
              disabled={!table.getRowModel().rows?.length}
              onClick={() => setShowSearch && setShowSearch(!showSearch)}
            >
              <Search />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Search</TooltipContent>
        </Tooltip>

        {/* <==> TOGGLE FILTERS <==> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'sm'}
              variant={showFilters ? 'default' : 'outline'}
              disabled={!table.getRowModel().rows?.length}
              onClick={() => setShowFilters && setShowFilters(!showFilters)}
            >
              <Funnel />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Filter</TooltipContent>
        </Tooltip>

        {/* <==> SHOW / HIDE COLUMNS <==> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'sm'}
              variant={'outline'}
              className='p-0'
              disabled={!table.getRowModel().rows?.length}
            >
              <DataTableViewOptions table={table} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Show/Hide columns</TooltipContent>
        </Tooltip>

        {/* <==> TOGGLE FULLSCREEN <==> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'sm'}
              variant={fullScreen ? 'default' : 'outline'}
              disabled={!table.getRowModel().rows?.length}
              onClick={() => setFullScreen && setFullScreen(!fullScreen)}
            >
              <Fullscreen />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Full screen</TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}

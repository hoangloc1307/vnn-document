import type { Table } from '@tanstack/react-table';
import { Fullscreen, Funnel, Search } from 'lucide-react';
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

  return (
    <div className='flex items-center justify-end gap-2 p-2'>
      <div className='flex items-center'>
        {showSearch && <DataTableGlobalSearch table={table} />}
      </div>

      <ButtonGroup>
        {/* <==> TOGGLE SEARCH <==> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'sm'}
              variant={showSearch ? 'default' : 'outline'}
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
            <Button size={'sm'} variant={'outline'}>
              <DataTableViewOptions table={table} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Full screen</TooltipContent>
        </Tooltip>

        {/* <==> TOGGLE FULLSCREEN <==> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'sm'}
              variant={fullScreen ? 'default' : 'outline'}
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

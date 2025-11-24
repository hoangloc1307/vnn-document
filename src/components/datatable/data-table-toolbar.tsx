import { IconColumns3 } from '@tabler/icons-react';
import type { Table } from '@tanstack/react-table';
import { Fullscreen, Funnel, Search } from 'lucide-react';
import { useEffect } from 'react';
import { DataTableGlobalSearch } from '~/components/datatable/data-table-global-search';
import { Button } from '~/components/ui/button';
import { ButtonGroup } from '~/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const meta = table.options.meta!;
  const { showFilters, setShowFilters, showSearch, setShowSearch, fullScreen, setFullScreen } =
    meta;

  useEffect(() => {
    if (!showFilters) {
      table.resetColumnFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilters]);

  useEffect(() => {
    if (!showSearch) {
      table.resetGlobalFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSearch]);

  return (
    <div className='flex items-center justify-end gap-2'>
      <DataTableGlobalSearch table={table} />
      <ButtonGroup>
        {/* <==> TOGGLE SEARCH <==> */}
        <Button
          size={'sm'}
          title='Search'
          variant={showSearch ? 'default' : 'outline'}
          onClick={() => setShowSearch && setShowSearch(!showSearch)}
        >
          <Search />
        </Button>

        {/* <==> TOGGLE FILTERS <==> */}
        <Button
          size={'sm'}
          title='Filter'
          variant={showFilters ? 'default' : 'outline'}
          onClick={() => setShowFilters && setShowFilters(!showFilters)}
        >
          <Funnel />
        </Button>

        {/* <==> SHOW / HIDE COLUMNS <==> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'sm'} variant={'outline'} className='p-0' title='Show/Hide columns'>
              <IconColumns3 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <==> TOGGLE FULLSCREEN <==> */}
        <Button
          size={'sm'}
          title='Full screen'
          variant={fullScreen ? 'default' : 'outline'}
          onClick={() => setFullScreen && setFullScreen(!fullScreen)}
        >
          <Fullscreen />
        </Button>
      </ButtonGroup>
    </div>
  );
}

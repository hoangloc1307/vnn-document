import type { Table } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import { useEffect } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '~/components/ui/input-group';

export function DataTableGlobalSearch<TData>({ table }: { table: Table<TData> }) {
  const showSearch = table.options.meta?.showSearch;

  useEffect(() => {
    return () => {
      table.setGlobalFilter('');
    };
  }, [showSearch, table]);

  return (
    <InputGroup className='h-8 w-[150px] lg:w-[250px]'>
      <InputGroupInput
        placeholder='Search...'
        value={table.getState().globalFilter ?? ''}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {table.getState().globalFilter && (
        <InputGroupAddon align='inline-end'>
          <InputGroupButton
            aria-label='Clear'
            size='icon-xs'
            onClick={() => {
              table.setGlobalFilter('');
            }}
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}

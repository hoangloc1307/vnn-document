import type { Table } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '~/components/ui/input-group';

export function DataTableGlobalSearch<TData>({ table }: { table: Table<TData> }) {
  const { t } = useTranslation(['datatable']);
  const showSearch = table.options.meta?.showSearch;

  return (
    <>
      {showSearch && (
        <InputGroup className='h-8 w-[150px] lg:w-[250px]'>
          <InputGroupInput
            placeholder={t('datatable:toolbar.search') + '...'}
            value={table.getState().globalFilter ?? ''}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {table.getState().globalFilter && (
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                title={t('datatable:toolbar.clear_search')}
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
      )}
    </>
  );
}

import {
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

type ClientPaginationConfig = {
  type: 'client';
  initial?: { pageIndex?: number; pageSize?: number };
  pageSizeOptions?: number[];
};

type PaginationConfig = ClientPaginationConfig;

type UseDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationConfig;
};

export default function useDatatable<TData, TValue>({
  columns,
  data,
  pagination,
}: UseDataTableProps<TData, TValue>) {
  const hasPagination = Boolean(pagination);

  // UI states (meta)
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  // Table states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [paginationState, setPaginationState] = useState({
    pageIndex: pagination?.initial?.pageIndex ?? 0,
    pageSize: pagination?.initial?.pageSize ?? pagination?.pageSizeOptions?.[0] ?? 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: hasPagination ? paginationState : undefined,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: hasPagination ? setPaginationState : undefined,
    globalFilterFn: 'includesString',
    enableSorting: true,
    enableGlobalFilter: true,
    meta: {
      showFilters,
      setShowFilters,
      showSearch,
      setShowSearch,
      fullScreen,
      setFullScreen,
      hasPagination,
      pageSizeOptions: pagination?.pageSizeOptions ?? [10, 20, 50, 100],
    },
  });

  return table;
}

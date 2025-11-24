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

type SortingConfig = {
  initial?: { id: string; desc: boolean }[];
};

interface UseDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationConfig;
  sorting?: SortingConfig;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export default function useDatatable<TData, TValue>({
  columns,
  data,
  pagination,
  sorting,
}: UseDataTableProps<TData, TValue>) {
  const hasPagination = Boolean(pagination);
  const hasSorting = Boolean(sorting);

  // UI states (meta)
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  // Table states
  const [sortingState, setSortingState] = useState<SortingState>(sorting?.initial ?? []);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [paginationState, setPaginationState] = useState({
    pageIndex: pagination?.initial?.pageIndex ?? 0,
    pageSize: pagination?.initial?.pageSize
      ? pagination.pageSizeOptions?.includes(pagination?.initial?.pageSize)
        ? pagination?.initial?.pageSize
        : (pagination.pageSizeOptions?.[0] ?? DEFAULT_PAGE_SIZE_OPTIONS[0])
      : DEFAULT_PAGE_SIZE_OPTIONS[0],
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: hasSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting: hasSorting ? sortingState : undefined,
      globalFilter,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: hasPagination ? paginationState : undefined,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: hasSorting ? setSortingState : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: hasPagination ? setPaginationState : undefined,
    globalFilterFn: 'includesString',
    enableSorting: true,
    enableGlobalFilter: true,
    autoResetPageIndex: false,
    meta: {
      showFilters,
      setShowFilters,
      showSearch,
      setShowSearch,
      fullScreen,
      setFullScreen,
      hasPagination,
      pageSizeOptions: pagination?.pageSizeOptions ?? [...DEFAULT_PAGE_SIZE_OPTIONS],
      hasSorting,
    },
  });

  return table;
}

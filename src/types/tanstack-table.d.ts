/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  type FilterVariant = 'text' | 'select' | 'range' | 'date' | 'boolean';

  interface TableMeta<TData extends RowData> {
    showFilters?: boolean;
    setShowFilters?: (v: boolean) => void;
    showSearch?: boolean;
    setShowSearch?: (v: boolean) => void;
    fullScreen?: boolean;
    setFullScreen?: (v: boolean) => void;
    hasSorting?: boolean;
    hasPagination?: boolean;
    pageSizeOptions: number[];
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: FilterVariant;
  }
}

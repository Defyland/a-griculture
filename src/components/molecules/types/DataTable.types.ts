import type { ReactNode } from 'react';

export interface TableRowProps {
  $clickable?: boolean;
  $isOdd?: boolean;
}

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
  sortField?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
  rowStyles?: Record<string, string>;
} 
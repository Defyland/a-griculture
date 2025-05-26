import type { Propriedade } from '../../types';

export type ThemeColorKey = 'primary' | 'success' | 'warning' | 'lightText' | 'info';

export type ViewMode = 'grid' | 'table';

export type SortField = 'nome' | 'areaTotal';

export type SortDirection = 'asc' | 'desc';

export interface PropriedadesListProps {
  propriedades: Propriedade[];
  isLoading?: boolean;
  onAdd?: () => void;
  onEdit?: (propriedade: Propriedade) => void;
  onDelete?: (id: string) => void;
  onRowClick?: (propriedade: Propriedade) => void;
}

export interface ProgressFillProps {
  width: number;
  color: ThemeColorKey;
}

export interface AreaBadgeProps {
  variant: 'agricultavel' | 'vegetacao' | 'total';
}

export interface PropertyTableRow {
  id: string;
  nome: string;
  localizacao: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  produtorId: string;
  produtorNome?: string;
  actions?: React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
} 
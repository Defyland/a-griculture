export interface SortOption {
  field: string;
  label: string;
}

export interface ViewOption {
  id: string;
  label: string;
  icon: string;
}

export interface FilterOption {
  id: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

export interface FilterSearchBarProps {
  searchPlaceholder?: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  
  // Ordenação
  sortOptions?: SortOption[];
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (field: string) => void;
  
  // Alternar visualização (ex: Cards, Tabela)
  viewOptions?: ViewOption[];
  currentView?: string;
  onViewChange?: (view: string) => void;
  
  // Filtros adicionais
  filterOptions?: FilterOption[];
  filterValues?: Record<string, string>;
  onFilterChange?: (filterId: string, value: string) => void;
  
  // Exibir apenas busca
  searchOnly?: boolean;
}

export interface ViewToggleButtonProps {
  $active: boolean;
}

export interface SortButtonProps {
  $active: boolean;
} 
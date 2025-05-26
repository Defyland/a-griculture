export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface ThemeColorProps {
  color: 'primary' | 'success' | 'warning' | 'lightText' | 'info';
}

export interface ProgressFillProps extends ThemeColorProps {
  width: number;
}

export interface StatusTagProps {
  status: 'ativa' | 'concluida' | 'planejada';
}

export interface CulturaTagProps {
  index: number;
} 
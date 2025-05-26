import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface ProgressFillProps {
  width: number;
  color: string;
  style?: React.CSSProperties;
}

export interface StatusTagProps {
  status: 'ativa' | 'concluida' | 'planejada';
  children: ReactNode;
}

export interface CulturaTagProps {
  index: number;
} 
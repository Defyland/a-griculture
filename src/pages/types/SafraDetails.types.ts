export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface StatusStepProps {
  active: boolean;
}

export interface StatusTagProps {
  status: 'ativa' | 'concluida' | 'planejada';
}

export interface CulturaTagProps {
  index: number;
} 
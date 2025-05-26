import type { Propriedade, Safra, Produtor } from '../../types';

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface SafraCompleta extends Safra {
  propriedade?: Propriedade;
  produtor?: Produtor | null;
}

export interface StatusTagProps {
  status: 'ativa' | 'concluida' | 'planejada';
}

export interface CulturaTagProps {
  index: number;
} 
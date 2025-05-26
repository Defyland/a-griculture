import type { Cultura, Safra } from '../../types';

export interface SafraExtended extends Omit<Safra, 'culturas'> {
  culturas: (Cultura | string)[];
  areaHectares?: number;
}

export interface FormErrors {
  nome?: string;
  ano?: string;
  propriedadeId?: string;
  status?: string;
  areaHectares?: string;
  global?: string;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface CulturaTagProps {
  index: number;
} 
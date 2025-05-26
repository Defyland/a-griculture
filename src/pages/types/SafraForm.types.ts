import type { Cultura, Safra } from '../../types';

// Estendendo a interface Safra para incluir propriedades específicas
export interface SafraExtended extends Omit<Safra, 'culturas'> {
  culturas: (Cultura | string)[];
  areaHectares?: number;
  
  // Propriedades adicionais que podem ser utilizadas na visualização
  descricao?: string;
  anoInicio?: number;
  anoFim?: number;
  areaPlantada?: number;
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
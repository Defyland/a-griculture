import type { Propriedade, Produtor } from '../../types';

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface ProdutorDetailProps {
  produtor: Produtor;
  propriedades: Propriedade[];
  loading: boolean;
  error: string | null;
} 
import type { Safra } from './safra';
import type { Estado } from './common';

// Tipo para Propriedade Rural
export interface Propriedade {
  id: string;
  nome: string;
  cidade: string;
  estado: Estado;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  produtorId: string;
  safras: Safra[];
} 
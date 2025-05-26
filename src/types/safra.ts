import type { Cultura } from './cultura';

// Tipo para Safra
export interface Safra {
  id: string;
  nome: string; // Ex: "Safra 2021"
  ano: number;
  propriedadeId: string;
  culturas: Cultura[];
  status?: 'ativa' | 'concluida' | 'planejada';
  areaHectares?: number;
} 
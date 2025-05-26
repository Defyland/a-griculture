import type { Estado } from './common';

// Tipo para Dashboard
export interface DashboardData {
  totalFazendas: number;
  totalAreaHectares: number;
  distribuicaoPorEstado: {
    estado: Estado;
    quantidade: number;
  }[];
  distribuicaoPorCultura: {
    cultura: string;
    quantidade: number;
  }[];
  distribuicaoUsoSolo: {
    tipo: 'Agricultável' | 'Vegetação';
    area: number;
  }[];
} 
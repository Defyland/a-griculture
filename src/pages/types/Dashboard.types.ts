export interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
    color?: string;
  }>;
  label?: string;
}

// Interfaces para os dados do dashboard
export interface UsoSoloItem {
  tipo: string;
  area: number;
}

export interface CulturaItem {
  cultura: string;
  quantidade: number;
}

export interface EstadoItem {
  estado: string;
  quantidade: number;
}

export interface DashboardData {
  totalFazendas: number;
  totalAreaHectares: number;
  distribuicaoPorEstado: EstadoItem[];
  distribuicaoPorCultura: CulturaItem[];
  distribuicaoUsoSolo: UsoSoloItem[];
} 
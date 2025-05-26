// Importações e re-exportações dos arquivos de tipos específicos
export * from './produtor';
export * from './propriedade';
export * from './safra';
export * from './cultura';
export * from './dashboard';
export * from './common';
export * from './form';
export * from './forms';

// Tipo para Produtor Rural
export interface Produtor {
  id: string;
  documentoCpfCnpj: string;
  tipoDocumento: 'CPF' | 'CNPJ';
  nome: string;
  propriedades: Propriedade[];
  cpfCnpj?: string;
}

// Tipo para Propriedade Rural
export interface Propriedade {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  produtorId: string;
  safras: Safra[];
}

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

// Tipo para Cultura
export interface Cultura {
  id: string;
  nome: string; // Ex: "Soja", "Milho"
  safraId: string;
}

// Estados brasileiros
export type Estado =
  | 'AC'
  | 'AL'
  | 'AP'
  | 'AM'
  | 'BA'
  | 'CE'
  | 'DF'
  | 'ES'
  | 'GO'
  | 'MA'
  | 'MT'
  | 'MS'
  | 'MG'
  | 'PA'
  | 'PB'
  | 'PR'
  | 'PE'
  | 'PI'
  | 'RJ'
  | 'RN'
  | 'RS'
  | 'RO'
  | 'RR'
  | 'SC'
  | 'SP'
  | 'SE'
  | 'TO';

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
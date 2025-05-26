import type { Propriedade } from './propriedade';

// Tipo para Produtor Rural
export interface Produtor {
  id: string;
  documentoCpfCnpj: string;
  tipoDocumento: 'CPF' | 'CNPJ';
  nome: string;
  propriedades: Propriedade[];
  cpfCnpj?: string;
} 
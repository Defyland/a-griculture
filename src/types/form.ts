import type { Estado } from './index';

// Types pour le formulaire de propriété
export interface PropriedadeFormValues {
  nome: string;
  cidade: string;
  estado: Estado;
  areaTotal: string;
  areaAgricultavel: string;
  areaVegetacao: string;
}

export interface PropriedadeFormErrors {
  nome?: string;
  cidade?: string;
  estado?: string;
  areaTotal?: string;
  areaAgricultavel?: string;
  areaVegetacao?: string;
}

// Types pour le formulaire de safra
export interface SafraFormValues {
  nome: string;
  ano: number;
  propriedadeId: string;
  status?: 'planejada' | 'ativa' | 'concluida';
  areaHectares?: number;
}

export interface SafraFormErrors {
  nome?: string;
  ano?: string;
  propriedadeId?: string;
  status?: string;
  areaHectares?: string;
  global?: string;
}

// Types pour le formulaire de produtor
export interface ProdutorFormValues {
  nome: string;
  documentoCpfCnpj: string;
  tipoDocumento: 'CPF' | 'CNPJ';
}

export interface ProdutorFormErrors {
  nome?: string;
  documentoCpfCnpj?: string;
  tipoDocumento?: string;
}

// Interface générique pour les erreurs de formulaire
export interface FormErrors {
  [key: string]: string | undefined;
} 
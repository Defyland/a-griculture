export interface FormValues {
  nome: string;
  documentoCpfCnpj: string;
  tipoDocumento: 'CPF' | 'CNPJ';
}

export interface FormErrors {
  nome?: string;
  documentoCpfCnpj?: string;
  tipoDocumento?: string;
}

export interface ProdutorFormProps {
  isReadOnly?: boolean;
} 
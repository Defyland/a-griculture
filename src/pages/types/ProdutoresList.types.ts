export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface ProducerTableRow {
  id: string;
  nome: React.ReactNode;
  documento: React.ReactNode;
  acoes: React.ReactNode;
} 
export interface PropertyTableRow {
  id: string;
  nome: React.ReactNode;
  localizacao: React.ReactNode;
  areaTotal: React.ReactNode;
  acoes: React.ReactNode;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface PageButtonProps {
  $active?: boolean;
} 
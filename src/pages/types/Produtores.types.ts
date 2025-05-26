import type { Produtor } from '../../types';

export interface ProdutoresListProps {
  produtores: Produtor[];
  isLoading?: boolean;
  onAdd?: () => void;
  onEdit?: (produtor: Produtor) => void;
  onDelete?: (id: string) => void;
  onRowClick?: (produtor: Produtor) => void;
}

export interface ProdutorDetailsProps {
  produtor: Produtor;
  isLoading?: boolean;
  onBack?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface ProdutorFormProps {
  produtor?: Partial<Produtor>;
  isLoading?: boolean;
  onSave: (produtor: Partial<Produtor>) => void;
  onCancel: () => void;
} 
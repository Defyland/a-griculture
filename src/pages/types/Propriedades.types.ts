import type { Propriedade } from '../../types';

export interface PropriedadesListProps {
  propriedades: Propriedade[];
  isLoading?: boolean;
  onAdd?: () => void;
  onEdit?: (propriedade: Propriedade) => void;
  onDelete?: (id: string) => void;
  onRowClick?: (propriedade: Propriedade) => void;
}

export interface PropriedadeDetailsProps {
  propriedade: Propriedade;
  isLoading?: boolean;
  onBack?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface PropriedadeFormProps {
  propriedade?: Partial<Propriedade>;
  isLoading?: boolean;
  onSave: (propriedade: Partial<Propriedade>) => void;
  onCancel: () => void;
} 
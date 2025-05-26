import type { Safra } from '../../types';

export interface SafrasListProps {
  safras: Safra[];
  isLoading?: boolean;
  onAdd?: () => void;
  onEdit?: (safra: Safra) => void;
  onDelete?: (id: string) => void;
  onRowClick?: (safra: Safra) => void;
}

export interface SafraDetailsProps {
  safra: Safra;
  isLoading?: boolean;
  onBack?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface SafraFormProps {
  safra?: Partial<Safra>;
  isLoading?: boolean;
  onSave: (safra: Partial<Safra>) => void;
  onCancel: () => void;
} 
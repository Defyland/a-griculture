import type { ReactNode } from 'react';
import type { CardElevation, CardVariant } from '../../atoms/types/Card.types';

export interface EntityCardActions {
  onClick?: () => void;
  menuOptions?: Array<{
    label: string;
    onClick: () => void;
    icon?: string;
    isDanger?: boolean;
  }>;
}

export interface EntityCardProps {
  // Propriedades básicas do cartão
  title: string;
  subtitle?: string;
  id: string;
  
  // Aparência e comportamento
  elevation?: CardElevation;
  variant?: CardVariant;
  hoverable?: boolean;
  highlighted?: boolean;
  
  // Ações e interatividade
  onClick?: () => void;
  actions?: EntityCardActions;
  actionMenu?: boolean;
  menuTitle?: string;
  
  // Conteúdo
  headerContent?: ReactNode;
  mainContent?: ReactNode;
  children?: ReactNode;
  footerContent?: ReactNode;
  
  // Botões de ação no rodapé
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  
  // Opções de estilo
  className?: string;
} 
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export interface AlertContainerProps {
  variant: AlertVariant;
}

// Mapeamento de variantes para cores do tema
export const variantToColorMap = {
  info: 'secondary' as const,
  success: 'success' as const,
  warning: 'warning' as const,
  error: 'danger' as const
}; 
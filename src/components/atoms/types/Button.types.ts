import React from 'react';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary'
  | 'danger' 
  | 'success' 
  | 'warning' 
  | 'info'
  | 'text' 
  | 'outlined' 
  | 'link';

export type ButtonSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';

// Props de base comuns a ambos os tipos de botão
export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  rounded?: boolean;
  elevated?: boolean;
  active?: boolean;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}

// Props para o componente Button padrão
export interface ButtonProps extends ButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  href?: undefined;
}

// Props para o componente LinkButton
export interface LinkButtonProps extends ButtonBaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  href: string;
} 
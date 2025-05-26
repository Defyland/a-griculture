import React from 'react';

export type CardElevation = 'none' | 'low' | 'medium' | 'high' | 'xl';
export type CardVariant = 'default' | 'outlined' | 'filled' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type CardTextAlign = 'left' | 'center' | 'right';
export type CardOverflowY = 'visible' | 'hidden' | 'scroll' | 'auto';

// Props básicas para o Card
export interface CardBaseProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  elevation?: CardElevation;
  variant?: CardVariant;
  borderColor?: string;
  textAlign?: CardTextAlign;
  onClick?: () => void;
  hoverable?: boolean;
  fullWidth?: boolean;
  highlighted?: boolean;
  rounded?: boolean;
  maxHeight?: string;
  overflowY?: CardOverflowY;
}

// Props para o Card composto (com header e footer)
export interface CardProps extends CardBaseProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

// Props internas para o StyledCard
export interface StyledCardProps {
  noPadding?: boolean;
  elevation?: CardElevation;
  variant?: CardVariant;
  borderColor?: string;
  textAlign?: CardTextAlign;
  onClick?: () => void;
  hoverable?: boolean;
  fullWidth?: boolean;
  highlighted?: boolean;
  rounded?: boolean;
  maxHeight?: string;
  overflowY?: CardOverflowY;
} 
import React from 'react';

export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'tertiary'
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info' 
  | 'outline';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  pulsing?: boolean;
  withDot?: boolean;
  count?: number;
  maxCount?: number;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export interface StyledBadgeProps {
  $variant: BadgeVariant;
  $size: BadgeSize;
  $rounded?: boolean;
  $pulsing?: boolean;
  $withDot?: boolean;
  $isClickable?: boolean;
  $hasIcon?: boolean;
  $iconPosition?: 'left' | 'right';
} 
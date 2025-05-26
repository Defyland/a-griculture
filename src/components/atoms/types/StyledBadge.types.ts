import React from 'react';
import type { CSSProperties } from 'react';

export interface StyledBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface StyledBadgeWrapperProps {
  customStyles?: CSSProperties;
} 
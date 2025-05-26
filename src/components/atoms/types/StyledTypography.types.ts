import React from 'react';
import type { CSSProperties } from 'react';

export interface StyledTypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'subtitle';
  weight?: 'normal' | 'medium' | 'bold';
  align?: 'left' | 'center' | 'right';
  color?: 'primary' | 'secondary' | 'text' | 'lightText' | 'danger' | 'success' | 'warning';
  className?: string;
  noMargin?: boolean;
  ellipsis?: boolean;
  style?: CSSProperties;
}

export interface StyledTypographyWrapperProps {
  customStyles?: CSSProperties;
} 
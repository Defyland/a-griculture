import React from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'subtitle';
export type TypographyWeight = 'normal' | 'medium' | 'bold';
export type TypographyAlign = 'left' | 'center' | 'right';
export type TypographyColor = 'primary' | 'secondary' | 'text' | 'lightText' | 'danger' | 'success' | 'warning';

export interface TypographyProps {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  color?: TypographyColor;
  children: React.ReactNode;
  className?: string;
  noMargin?: boolean;
  ellipsis?: boolean;
  style?: React.CSSProperties;
}

// Mapeamento de variantes para elementos HTML
export const variantMapping: { [key in TypographyVariant]: React.ElementType } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  subtitle: 'h6',
};

// Mapeamento de pesos para valores CSS
export const weightMapping: { [key in TypographyWeight]: number } = {
  normal: 400,
  medium: 500,
  bold: 700,
}; 
import type { ReactNode } from 'react';
import type { CardVariant } from '../../atoms/types/Card.types';

export interface CardWithTitleProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  variant?: CardVariant;
  className?: string;
} 
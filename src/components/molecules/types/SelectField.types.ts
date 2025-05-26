import type { SelectHTMLAttributes } from 'react';
import type { SelectOption } from '../../atoms/types/Select.types';

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
}

export interface SelectFieldContainerProps {
  fullWidth?: boolean;
} 
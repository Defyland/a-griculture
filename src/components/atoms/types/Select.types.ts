import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
  label?: string;
  placeholder?: string;
}

export interface SelectContainerProps {
  fullWidth?: boolean;
}

export interface StyledSelectProps {
  hasError?: boolean;
} 
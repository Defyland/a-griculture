import React from 'react';
import type { InputHTMLAttributes } from 'react';

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface FormFieldContainerProps {
  fullWidth?: boolean;
} 
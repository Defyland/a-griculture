import React from 'react';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface InputContainerProps {
  fullWidth?: boolean;
}

export interface StyledInputProps {
  hasError?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
} 
import React from 'react';

export interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface StyledLabelProps {
  required?: boolean;
  disabled?: boolean;
} 
import React from 'react';

export interface FormField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string | number | boolean | null;
  options?: Array<{ value: string; label: string }>;
  error?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

export interface FormSection {
  title?: string;
  fields: FormField[];
}

export interface FormBuilderProps {
  sections: FormSection[];
  errors: Record<string, string>;
  successMessage?: string;
  globalError?: string;
  isSubmitting?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCancel?: () => void;
} 
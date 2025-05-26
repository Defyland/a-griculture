import { forwardRef } from 'react';
import { FormLabel, Input } from '../atoms';
import type { FormFieldProps } from './types/FormField.types';
import { FormFieldContainer, ErrorMessage } from './styles/FormField.styles';

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, error, required, disabled, fullWidth, ...props }, ref) => {
    return (
      <FormFieldContainer fullWidth={fullWidth}>
        <FormLabel htmlFor={name} required={required} disabled={disabled}>
          {label}
        </FormLabel>
        <Input
          id={name}
          name={name}
          error={!!error}
          disabled={disabled}
          ref={ref}
          fullWidth={fullWidth}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
        {error && (
          <ErrorMessage id={`${name}-error`}>
            {error}
          </ErrorMessage>
        )}
      </FormFieldContainer>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField; 
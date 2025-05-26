import React, { forwardRef } from 'react';
import { FormLabel, Select } from '../atoms';
import type { SelectFieldProps } from './types/SelectField.types';
import { SelectFieldContainer } from './styles/SelectField.styles';

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, name, options, error, required, disabled, fullWidth, ...props }, ref) => {
    return (
      <SelectFieldContainer fullWidth={fullWidth}>
        <FormLabel htmlFor={name} required={required} disabled={disabled}>
          {label}
        </FormLabel>
        <Select
          id={name}
          name={name}
          options={options}
          error={error}
          required={required}
          disabled={disabled}
          fullWidth={fullWidth}
          ref={ref}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
      </SelectFieldContainer>
    );
  }
);

SelectField.displayName = 'SelectField';

export default SelectField; 
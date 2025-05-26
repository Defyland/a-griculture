import { forwardRef } from 'react';
import type { SelectProps } from './types/Select.types';
import {
  SelectContainer,
  StyledSelect,
  SelectWrapper
} from './styles/Select.styles';
import { Typography } from './Typography';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, fullWidth, label, placeholder, ...props }, ref) => {
    return (
      <SelectContainer fullWidth={fullWidth}>
        {label && (
          <Typography 
            variant="body2" 
            style={{ marginBottom: '0.5rem' }}
          >
            {label}
          </Typography>
        )}
        <SelectWrapper>
          <StyledSelect ref={ref} hasError={!!error} {...props}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
        </SelectWrapper>
        {error && (
          <Typography 
            variant="caption" 
            color="danger" 
            style={{ marginTop: '0.25rem', fontSize: '0.8rem' }}
          >
            {error}
          </Typography>
        )}
      </SelectContainer>
    );
  }
);

Select.displayName = 'Select';

export default Select; 
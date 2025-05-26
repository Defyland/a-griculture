import React from 'react';
import type { FormLabelProps } from './types/FormLabel.types';
import { StyledLabel } from './styles/FormLabel.styles';

export const FormLabel: React.FC<FormLabelProps> = ({ children, htmlFor, required, disabled }) => {
  return (
    <StyledLabel htmlFor={htmlFor} required={required} disabled={disabled}>
      {children}
    </StyledLabel>
  );
};

export default FormLabel; 
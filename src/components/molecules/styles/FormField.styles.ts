import styled from 'styled-components';
import type { FormFieldContainerProps } from '../types/FormField.types';

export const FormFieldContainer = styled.div<FormFieldContainerProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`; 
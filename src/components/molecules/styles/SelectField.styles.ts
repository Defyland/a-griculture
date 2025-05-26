import styled from 'styled-components';
import type { SelectFieldContainerProps } from '../types/SelectField.types';

export const SelectFieldContainer = styled.div<SelectFieldContainerProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`; 
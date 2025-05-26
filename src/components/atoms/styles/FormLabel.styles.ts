import styled, { css } from 'styled-components';
import type { StyledLabelProps } from '../types/FormLabel.types';

export const StyledLabel = styled.label<StyledLabelProps>`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.lightText : theme.colors.text)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
  
  ${({ required }) =>
    required &&
    css`
      &::after {
        content: '*';
        color: ${({ theme }) => theme.colors.danger};
        margin-left: 0.25rem;
      }
    `}
`; 
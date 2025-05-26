import styled from 'styled-components';
import type { SelectContainerProps, StyledSelectProps } from '../types/Select.types';

export const SelectContainer = styled.div<SelectContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  position: relative;
`;

export const StyledSelect = styled.select<StyledSelectProps>`
  appearance: none;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  outline: none;
  background-color: white;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  
  &:focus {
    border-color: ${({ theme, hasError }) => (hasError ? theme.colors.danger : theme.colors.primary)};
    box-shadow: 0 0 0 2px ${({ theme, hasError }) => 
      hasError 
        ? `${theme.colors.danger}20` 
        : `${theme.colors.primary}20`
    };
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid ${({ theme }) => theme.colors.text};
    pointer-events: none;
  }
`; 
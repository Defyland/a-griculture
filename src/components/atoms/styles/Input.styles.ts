import styled, { css } from 'styled-components';
import type { InputContainerProps, StyledInputProps } from '../types/Input.types';

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  position: relative;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.lightText};
  z-index: 1;
`;

export const RightIconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.lightText};
  z-index: 1;
  cursor: pointer;
`;

export const StyledInput = styled.input<StyledInputProps>`
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  outline: none;
  background-color: white;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ hasLeftIcon }) => hasLeftIcon && css`
    padding-left: 2.75rem;
  `}
  
  ${({ hasRightIcon }) => hasRightIcon && css`
    padding-right: 2.75rem;
  `}
  
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
  
  ::placeholder {
    color: ${({ theme }) => theme.colors.lightText};
    opacity: 0.7;
  }
`; 
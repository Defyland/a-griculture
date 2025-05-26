import React, { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'outlined';
  error?: boolean;
  hasIcon?: boolean;
  fullWidth?: boolean;
}

const StyledInputComponent = styled.input<InputProps>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme, variant }) => 
    variant === 'filled' 
      ? theme.colors.backgroundDarker 
      : theme.colors.white};
  padding: ${({ theme, hasIcon }) => 
    hasIcon 
      ? `${theme.spacing.sm} ${theme.spacing.lg} ${theme.spacing.sm} ${theme.spacing.xl}` 
      : `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: 1px solid ${({ theme, error }) => 
    error ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  min-width: 0;
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;
  
  &:focus {
    border-color: ${({ theme, error }) => 
      error ? theme.colors.danger : theme.colors.primary};
    box-shadow: ${({ theme, error }) => 
      error 
        ? `0 0 0 2px ${theme.colors.dangerAlpha}`
        : `0 0 0 2px ${theme.colors.primaryAlpha}`};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
    opacity: 0.8;
  }
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', fullWidth = false, ...props }, ref) => {
    return (
      <StyledInputComponent
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input; 
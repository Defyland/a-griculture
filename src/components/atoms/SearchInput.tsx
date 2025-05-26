import React from 'react';
import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

const StyledInput = styled.input<SearchInputProps>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: 42px;
  min-width: 0;
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => `0 0 0 2px ${theme.colors.primaryAlpha}`};
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

const SearchInput: React.FC<SearchInputProps> = ({ fullWidth = true, ...props }) => {
  return (
    <StyledInput
      fullWidth={fullWidth}
      {...props}
    />
  );
};

export { SearchInput };
export default SearchInput; 
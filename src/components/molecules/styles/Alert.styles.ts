import styled, { css } from 'styled-components';
import type { AlertContainerProps, AlertVariant } from '../types/Alert.types';
import type { DefaultTheme } from 'styled-components';

export const getAlertColor = (variant: AlertVariant, theme: DefaultTheme) => {
  switch (variant) {
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.danger;
    case 'info':
    default:
      return theme.colors.secondary;
  }
};

export const AlertContainer = styled.div<AlertContainerProps>`
  display: flex;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1rem;
  position: relative;
  
  ${({ theme, variant }) => {
    const color = getAlertColor(variant, theme);
    return css`
      background-color: ${color}10;
      border-left: 4px solid ${color};
    `;
  }}
`;

export const AlertContent = styled.div`
  flex: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0.25rem;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  color: ${({ theme }) => theme.colors.lightText};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`; 
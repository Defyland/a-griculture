import styled, { css, keyframes } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import type { ButtonSize, ButtonVariant } from '../types/Button.types';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const getButtonColor = (variant: ButtonVariant, theme: DefaultTheme, active?: boolean) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${active ? theme.colors.primaryDark : theme.colors.primary};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primaryDark};
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.small};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primaryDark};
          transform: translateY(0);
        }
      `;
    case 'secondary':
      return css`
        background-color: ${active ? theme.colors.secondaryDark : theme.colors.secondary};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondaryDark};
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.small};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.secondaryDark};
          transform: translateY(0);
        }
      `;
    case 'tertiary':
      return css`
        background-color: ${active ? theme.colors.tertiaryDark : theme.colors.tertiary};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.tertiaryDark};
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.small};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.tertiaryDark};
          transform: translateY(0);
        }
      `;
    case 'danger':
      return css`
        background-color: ${active ? theme.colors.dangerDark : theme.colors.danger};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.dangerDark};
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.small};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.dangerDark};
          transform: translateY(0);
        }
      `;
    case 'success':
      return css`
        background-color: ${active ? theme.colors.successDark : theme.colors.success};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.successDark};
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.small};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.successDark};
          transform: translateY(0);
        }
      `;
    case 'warning':
      return css`
        background-color: ${active ? theme.colors.warningDark : theme.colors.warning};
        color: ${theme.colors.text};
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.warningDark};
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.small};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.warningDark};
          transform: translateY(0);
        }
      `;
    case 'info':
      return css`
        background-color: ${active ? theme.colors.infoDark : theme.colors.info};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.infoDark};
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.small};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.infoDark};
          transform: translateY(0);
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: none;
        padding-left: ${theme.spacing.sm};
        padding-right: ${theme.spacing.sm};
        
        &:hover:not(:disabled) {
          color: ${theme.colors.primaryDark};
          transform: translateY(-1px);
        }
        
        &:active:not(:disabled) {
          color: ${theme.colors.primaryDark};
          transform: translateY(0);
        }
      `;
    case 'outlined':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid currentColor;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primaryAlpha};
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.small};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primaryAlpha};
          transform: translateY(0);
        }
      `;
    case 'link':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: none;
        padding: 0;
        
        &:hover:not(:disabled) {
          color: ${theme.colors.primaryDark};
          text-decoration: underline;
        }
        
        &:active:not(:disabled) {
          color: ${theme.colors.primaryDark};
        }
      `;
    default:
      return css``;
  }
};

export const getButtonSize = (size: ButtonSize, theme: DefaultTheme) => {
  switch (size) {
    case 'xs':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.fontSizes.tiny};
        border-radius: 4px;
      `;
    case 'small':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.fontSizes.small};
        border-radius: 6px;
      `;
    case 'medium':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        font-size: ${theme.fontSizes.medium};
        border-radius: 8px;
      `;
    case 'large':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: ${theme.fontSizes.medium};
        border-radius: 10px;
      `;
    case 'xl':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.xl};
        font-size: ${theme.fontSizes.large};
        border-radius: 12px;
      `;
    default:
      return css``;
  }
};

export interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $rounded: boolean;
  $elevated: boolean;
  $active: boolean;
  $iconOnly?: boolean;
}

export const StyledButtonBase = css<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme, $rounded }) => 
    $rounded ? '50px' : theme.borderRadius.medium};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  box-shadow: ${({ theme, $elevated }) => 
    $elevated ? theme.shadows.medium : 'none'};
  margin: 0;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
    border-color: ${({ theme }) => theme.colors.disabledBorder};
    box-shadow: none;
    transform: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
  
  ${({ $variant, theme, $active }) => getButtonColor($variant, theme, $active)}
  ${({ $size, theme }) => getButtonSize($size, theme)}
  
  ${({ $iconOnly, theme }) => $iconOnly && css`
    padding: ${theme.spacing.sm};
    width: ${({ theme }) => theme.elements.buttonHeight.medium};
    height: ${({ theme }) => theme.elements.buttonHeight.medium};
  `}
`;

export const StyledButton = styled.button<StyledButtonProps>`
  ${StyledButtonBase}
`;

export const StyledAnchor = styled.a<StyledButtonProps>`
  ${StyledButtonBase}
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s linear infinite;
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
`; 
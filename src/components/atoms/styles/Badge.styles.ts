import styled, { css } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import { pulse } from '../../../styles/animations';
import type { BadgeSize, BadgeVariant, StyledBadgeProps } from '../types/Badge.types';

export const getSizeStyles = (size: BadgeSize, theme: DefaultTheme) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.fontSizes.tiny};
      `;
    case 'large':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.fontSizes.medium};
      `;
    case 'medium':
    default:
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.md};
        font-size: ${theme.fontSizes.small};
      `;
  }
};

export const getVariantStyles = (variant: BadgeVariant, theme: DefaultTheme) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primaryLighter};
        color: ${theme.colors.primaryDark};
        border: 1px solid ${theme.colors.primary};
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondaryLighter};
        color: ${theme.colors.secondaryDark};
        border: 1px solid ${theme.colors.secondary};
      `;
    case 'tertiary':
      return css`
        background-color: ${theme.colors.tertiaryLighter};
        color: ${theme.colors.tertiaryDark};
        border: 1px solid ${theme.colors.tertiary};
      `;
    case 'success':
      return css`
        background-color: ${theme.colors.successLighter};
        color: ${theme.colors.successDark};
        border: 1px solid ${theme.colors.success};
      `;
    case 'warning':
      return css`
        background-color: ${theme.colors.warningLighter};
        color: ${theme.colors.warningDark};
        border: 1px solid ${theme.colors.warning};
      `;
    case 'danger':
      return css`
        background-color: ${theme.colors.dangerLighter};
        color: ${theme.colors.dangerDark};
        border: 1px solid ${theme.colors.danger};
      `;
    case 'info':
      return css`
        background-color: ${theme.colors.infoLighter};
        color: ${theme.colors.infoDark};
        border: 1px solid ${theme.colors.info};
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.border};
      `;
    case 'default':
    default:
      return css`
        background-color: ${theme.colors.badgeBackground};
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.border};
      `;
  }
};

export const StyledBadge = styled.span<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme, $rounded }) => 
    $rounded ? theme.borderRadius.round : theme.borderRadius.small};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ $hasIcon, $iconPosition }) => $hasIcon && $iconPosition === 'right' && css`
    flex-direction: row-reverse;
  `}
  
  ${({ $size, theme }) => getSizeStyles($size, theme)}
  ${({ $variant, theme }) => getVariantStyles($variant, theme)}
  
  ${({ $pulsing }) => $pulsing && css`
    animation: ${pulse} 1.5s infinite;
  `}
  
  ${({ $isClickable }) => $isClickable && css`
    cursor: pointer;
    
    &:hover {
      filter: brightness(0.95);
    }
    
    &:active {
      filter: brightness(0.9);
    }
  `}
  
  ${({ $withDot, theme, $variant }) => $withDot && css`
    position: relative;
    padding-left: ${theme.spacing.lg};
    
    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      left: ${theme.spacing.xs};
      background-color: ${
        $variant === 'primary' ? theme.colors.primary :
        $variant === 'secondary' ? theme.colors.secondary :
        $variant === 'tertiary' ? theme.colors.tertiary :
        $variant === 'success' ? theme.colors.success :
        $variant === 'warning' ? theme.colors.warning :
        $variant === 'danger' ? theme.colors.danger :
        $variant === 'info' ? theme.colors.info :
        theme.colors.lightText
      };
    }
  `}
`;

export const CountIndicator = styled.span`
  display: inline-block;
  padding-left: ${({ theme }) => theme.spacing.xs};
  font-size: 0.85em;
  opacity: 0.8;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  
  & > svg, & > img {
    width: 1em;
    height: 1em;
  }
`; 
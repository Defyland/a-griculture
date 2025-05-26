import styled, { css, keyframes } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import type { CardElevation, CardVariant, StyledCardProps } from '../types/Card.types';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(52, 199, 89, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 199, 89, 0);
  }
`;

export const getShadow = (elevation: CardElevation, theme: DefaultTheme) => {
  switch (elevation) {
    case 'none':
      return 'none';
    case 'low':
      return theme.shadows.small;
    case 'medium':
      return theme.shadows.medium;
    case 'high':
      return theme.shadows.large;
    case 'xl':
      return theme.shadows.xl;
    default:
      return theme.shadows.small;
  }
};

export const getVariantStyles = (variant: CardVariant | undefined, theme: DefaultTheme, borderColor?: string) => {
  switch (variant) {
    case 'outlined':
      return css`
        background-color: ${theme.colors.white};
        border: 1px solid ${borderColor || theme.colors.border};
        box-shadow: none;
      `;
    case 'filled':
      return css`
        background-color: ${theme.colors.backgroundDarker};
        border: none;
      `;
    case 'primary':
      return css`
        background-color: ${theme.colors.primaryLighter};
        border-left: 4px solid ${theme.colors.primary};
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondaryLighter};
        border-left: 4px solid ${theme.colors.secondary};
      `;
    case 'success':
      return css`
        background-color: ${theme.colors.successLighter};
        border-left: 4px solid ${theme.colors.success};
      `;
    case 'warning':
      return css`
        background-color: ${theme.colors.warningLighter};
        border-left: 4px solid ${theme.colors.warning};
      `;
    case 'danger':
      return css`
        background-color: ${theme.colors.dangerLighter};
        border-left: 4px solid ${theme.colors.danger};
      `;
    default:
      return css`
        background-color: ${theme.colors.white};
        border: none;
      `;
  }
};

export const StyledCard = styled.div<StyledCardProps>`
  border-radius: ${({ theme, rounded }) => rounded ? theme.borderRadius.xl : theme.borderRadius.large};
  padding: ${({ theme, noPadding }) => (noPadding ? '0' : `${theme.spacing.lg} ${theme.spacing.lg}`)};
  box-shadow: ${({ theme, elevation }) => getShadow(elevation || 'low', theme)};
  
  ${({ theme, variant, borderColor }) => getVariantStyles(variant, theme, borderColor)}
  
  text-align: ${({ textAlign }) => textAlign || 'left'};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  transition: all ${({ theme }) => theme.transitions.medium};
  position: relative;
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  overflow-y: ${({ overflowY }) => overflowY || 'visible'};
  
  ${({ hoverable, theme, elevation }) => hoverable && css`
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${getShadow(elevation === 'none' ? 'low' : 
                   elevation === 'low' ? 'medium' : 
                   elevation === 'medium' ? 'high' : 'xl', theme)};
    }
  `}
  
  ${({ highlighted }) => highlighted && css`
    animation: ${pulseAnimation} 2s infinite;
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme, noPadding }) => (noPadding ? '0' : `${theme.spacing.md} ${theme.spacing.md}`)};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme, noPadding }) => (noPadding ? '0' : theme.spacing.md)};
    border-radius: ${({ theme, rounded }) => rounded ? 
      theme.borderRadius.large : theme.borderRadius.medium};
  }
`;

export const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:empty {
    display: none;
  }
`;

export const CardFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  
  &:empty {
    display: none;
  }
`;

export const CardBody = styled.div`
  flex: 1;
`; 
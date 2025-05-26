import styled, { css } from 'styled-components';
import type { TypographyProps } from '../types/Typography.types';

// Estilos base para todas as variantes
export const baseStyles = css<TypographyProps>`
  margin: ${({ noMargin }) => (noMargin ? '0' : '0 0 1rem 0')};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-align: ${({ align }) => align || 'left'};
  color: ${({ theme, color }) => {
    if (!color) return theme.colors.text;
    return theme.colors[color];
  }};
  
  ${({ ellipsis }) =>
    ellipsis &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

// Estilos específicos para cada variante
export const variantStyles = {
  h1: css`
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    line-height: 1.2;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.75rem;
    }
  `,
  h2: css`
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
    line-height: 1.25;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.5rem;
    }
  `,
  h3: css`
    font-size: ${({ theme }) => theme.fontSizes.large};
    line-height: 1.3;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.25rem;
    }
  `,
  h4: css`
    font-size: 1.125rem;
    line-height: 1.4;
  `,
  h5: css`
    font-size: 1rem;
    line-height: 1.5;
  `,
  h6: css`
    font-size: 0.875rem;
    line-height: 1.5;
  `,
  body1: css`
    font-size: 1rem;
    line-height: 1.5;
  `,
  body2: css`
    font-size: 0.875rem;
    line-height: 1.5;
  `,
  caption: css`
    font-size: 0.75rem;
    line-height: 1.5;
  `,
  subtitle: css`
    font-size: 0.875rem;
    line-height: 1.5;
    font-weight: 500;
    letter-spacing: 0.5px;
  `,
};

// Criamos componentes estilizados para cada variante
export const StyledH1 = styled.h1<TypographyProps>`
  ${baseStyles}
  ${variantStyles.h1}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;

export const StyledH2 = styled.h2<TypographyProps>`
  ${baseStyles}
  ${variantStyles.h2}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;

export const StyledH3 = styled.h3<TypographyProps>`
  ${baseStyles}
  ${variantStyles.h3}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;

export const StyledH4 = styled.h4<TypographyProps>`
  ${baseStyles}
  ${variantStyles.h4}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;

export const StyledH5 = styled.h5<TypographyProps>`
  ${baseStyles}
  ${variantStyles.h5}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;

export const StyledH6 = styled.h6<TypographyProps>`
  ${baseStyles}
  ${variantStyles.h6}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;

export const StyledBody1 = styled.p<TypographyProps>`
  ${baseStyles}
  ${variantStyles.body1}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;

export const StyledBody2 = styled.p<TypographyProps>`
  ${baseStyles}
  ${variantStyles.body2}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;

export const StyledCaption = styled.span<TypographyProps>`
  ${baseStyles}
  ${variantStyles.caption}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;

export const StyledSubtitle = styled.h6<TypographyProps>`
  ${baseStyles}
  ${variantStyles.subtitle}
  font-weight: ${({ weight }) => weight === 'bold' ? 700 : weight === 'medium' ? 500 : 400};
`;
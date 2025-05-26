import React from 'react';
import type { TypographyProps } from './types/Typography.types';
import {
  StyledH1,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledH6,
  StyledBody1,
  StyledBody2,
  StyledCaption,
  StyledSubtitle
} from './styles/Typography.styles';

export const Typography: React.FC<TypographyProps> = (props) => {
  const { variant = 'body1', children, ...rest } = props;

  // Selecionar o componente estilizado apropriado com base na variante
  switch (variant) {
    case 'h1':
      return <StyledH1 {...rest}>{children}</StyledH1>;
    case 'h2':
      return <StyledH2 {...rest}>{children}</StyledH2>;
    case 'h3':
      return <StyledH3 {...rest}>{children}</StyledH3>;
    case 'h4':
      return <StyledH4 {...rest}>{children}</StyledH4>;
    case 'h5':
      return <StyledH5 {...rest}>{children}</StyledH5>;
    case 'h6':
      return <StyledH6 {...rest}>{children}</StyledH6>;
    case 'body1':
      return <StyledBody1 {...rest}>{children}</StyledBody1>;
    case 'body2':
      return <StyledBody2 {...rest}>{children}</StyledBody2>;
    case 'caption':
      return <StyledCaption {...rest}>{children}</StyledCaption>;
    case 'subtitle':
      return <StyledSubtitle {...rest}>{children}</StyledSubtitle>;
    default:
      return <StyledBody1 {...rest}>{children}</StyledBody1>;
  }
};

export default Typography; 
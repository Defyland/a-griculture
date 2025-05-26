import React from 'react';
import type { CardProps } from './types/Card.types';
import {
  StyledCard,
  CardHeader,
  CardFooter,
  CardBody
} from './styles/Card.styles';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  className, 
  noPadding = false,
  elevation = 'low',
  variant = 'default',
  borderColor,
  textAlign = 'left',
  onClick,
  hoverable = false,
  fullWidth = false,
  highlighted = false,
  rounded = false,
  maxHeight,
  overflowY,
  header,
  footer,
  ...rest
}, ref) => {
  // Função para lidar com o clique se fornecido
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledCard
      ref={ref}
      className={className}
      noPadding={noPadding}
      elevation={elevation}
      variant={variant}
      borderColor={borderColor}
      textAlign={textAlign}
      onClick={onClick ? handleClick : undefined}
      hoverable={hoverable}
      fullWidth={fullWidth}
      highlighted={highlighted}
      rounded={rounded}
      maxHeight={maxHeight}
      overflowY={overflowY}
      {...rest}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
}); 
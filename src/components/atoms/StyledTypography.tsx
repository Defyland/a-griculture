import React from 'react';
import { Typography } from './Typography';
import type { StyledTypographyProps } from './types/StyledTypography.types';
import { StyledTypographyWrapper } from './styles/StyledTypography.styles';

export const StyledTypography: React.FC<StyledTypographyProps> = ({
  children,
  variant,
  weight,
  align,
  color,
  className,
  noMargin,
  ellipsis,
  style,
}) => {
  return (
    <StyledTypographyWrapper customStyles={style}>
      <Typography
        variant={variant}
        weight={weight}
        align={align}
        color={color}
        className={className}
        noMargin={noMargin}
        ellipsis={ellipsis}
      >
        {children}
      </Typography>
    </StyledTypographyWrapper>
  );
};

export default StyledTypography; 
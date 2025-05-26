import React from 'react';
import { Badge } from './Badge';
import type { StyledBadgeProps } from './types/StyledBadge.types';
import { StyledBadgeWrapper } from './styles/StyledBadge.styles';

export const StyledBadge: React.FC<StyledBadgeProps> = ({
  children,
  variant,
  size,
  rounded,
  className,
  style,
}) => {
  return (
    <StyledBadgeWrapper customStyles={style}>
      <Badge
        variant={variant}
        size={size}
        rounded={rounded}
        className={className}
      >
        {children}
      </Badge>
    </StyledBadgeWrapper>
  );
};

export default StyledBadge; 
import React from 'react';
import type { BadgeProps } from './types/Badge.types';
import { StyledBadge, CountIndicator, IconWrapper } from './styles/Badge.styles';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  rounded = false,
  pulsing = false,
  withDot = false,
  count,
  maxCount = 99,
  onClick,
  className,
  icon,
  iconPosition = 'left',
}) => {
  const formattedCount = count !== undefined && (
    count > maxCount ? `${maxCount}+` : count.toString()
  );
  
  return (
    <StyledBadge
      className={className}
      $variant={variant}
      $size={size}
      $rounded={rounded}
      $pulsing={pulsing}
      $withDot={withDot}
      $isClickable={!!onClick}
      $hasIcon={!!icon}
      $iconPosition={iconPosition}
      onClick={onClick}
    >
      {icon && (
        <IconWrapper>{icon}</IconWrapper>
      )}
      {children}
      {formattedCount && (
        <CountIndicator>{formattedCount}</CountIndicator>
      )}
    </StyledBadge>
  );
};

export default Badge; 
import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'danger';
  size?: 'small' | 'medium' | 'large';
  title?: string;
  disabled?: boolean;
  rounded?: boolean;
  elevated?: boolean;
  className?: string;
}

const StyledIconButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.sm};
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  variant = 'primary',
  size = 'medium',
  title,
  disabled = false,
  rounded = true,
  elevated = false,
  className
}) => {
  return (
    <StyledIconButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      title={title}
      rounded={rounded}
      elevated={elevated}
      className={className}
      aria-label={title}
    >
      {icon}
    </StyledIconButton>
  );
};

export default IconButton; 
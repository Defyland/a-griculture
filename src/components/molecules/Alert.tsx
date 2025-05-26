import React from 'react';
import { Typography } from '../atoms';
import type { AlertProps } from './types/Alert.types';
import { variantToColorMap } from './types/Alert.types';
import { 
  AlertContainer, 
  AlertContent, 
  CloseButton 
} from './styles/Alert.styles';

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
  className,
}) => {
  return (
    <AlertContainer variant={variant} className={className}>
      <AlertContent>
        {title && (
          <Typography variant="subtitle" weight="medium" noMargin color={variantToColorMap[variant]}>
            {title}
          </Typography>
        )}
        <Typography
          variant="body2"
          noMargin={!title}
          color={variant === 'error' ? 'danger' : variant === 'warning' ? 'warning' : 'text'}
        >
          {message}
        </Typography>
      </AlertContent>
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Fechar">
          &times;
        </CloseButton>
      )}
    </AlertContainer>
  );
};

export default Alert; 
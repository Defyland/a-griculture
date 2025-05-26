import React from 'react';
import { Button, Typography } from '../atoms';
import type { EmptyStateProps } from './types/EmptyState.types';
import { 
  EmptyStateContainer, 
  IconContainer, 
  ButtonContainer 
} from './styles/EmptyState.styles';

/**
 * Componente reutilizável para exibir estados vazios e erros
 * Usado em listas, resultados de pesquisa, etc.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
  buttonText,
  buttonAction,
  secondaryButtonText,
  secondaryButtonAction,
  isError = false
}) => {
  return (
    <EmptyStateContainer>
      {icon && (
        <IconContainer isError={isError}>
          {icon}
        </IconContainer>
      )}
      
      <Typography 
        variant="h4" 
        color={isError ? 'danger' : 'text'}
        noMargin={message ? true : false}
      >
        {title}
      </Typography>
      
      {message && (
        <Typography noMargin>
          {message}
        </Typography>
      )}
      
      {buttonText && buttonAction && (
        <ButtonContainer>
          <Button 
            variant={isError ? 'danger' : 'primary'} 
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
        </ButtonContainer>
      )}
      
      {secondaryButtonText && secondaryButtonAction && (
        <ButtonContainer isSecondary>
          <Button 
            variant="text" 
            onClick={secondaryButtonAction}
          >
            {secondaryButtonText}
          </Button>
        </ButtonContainer>
      )}
    </EmptyStateContainer>
  );
}; 
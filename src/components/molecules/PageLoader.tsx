import React from 'react';
import { Spinner } from '../atoms';
import type { PageLoaderProps } from './types/PageLoader.types';
import { LoadingContainer, LoadingDot } from './styles/PageLoader.styles';

/**
 * Componente de carregamento reutilizável para páginas
 */
export const PageLoader: React.FC<PageLoaderProps> = ({ 
  type = 'spinner',
  size = 'large',
  minHeight
}) => {
  return (
    <LoadingContainer minHeight={minHeight}>
      {type === 'spinner' ? (
        <Spinner size={size} />
      ) : (
        <>
          <LoadingDot />
          <LoadingDot />
          <LoadingDot />
        </>
      )}
    </LoadingContainer>
  );
}; 
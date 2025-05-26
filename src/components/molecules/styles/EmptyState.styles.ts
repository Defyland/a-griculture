import styled from 'styled-components';
import type { IconContainerProps, ButtonContainerProps } from '../types/EmptyState.types';

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

export const IconContainer = styled.div<IconContainerProps>`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme, isError }) => isError ? theme.colors.danger : '#a0a0a0'};
`;

export const ButtonContainer = styled.div<ButtonContainerProps>`
  margin-top: ${({ isSecondary }) => isSecondary ? '0.5rem' : '1rem'};
`; 
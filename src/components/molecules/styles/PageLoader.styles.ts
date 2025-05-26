import styled, { keyframes } from 'styled-components';
import type { LoadingContainerProps } from '../types/PageLoader.types';

export const LoadingContainer = styled.div<LoadingContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: ${({ minHeight }) => minHeight || '200px'};
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.5;
    transform: scale(0.75);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const LoadingDot = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  margin: 0 0.25rem;
  display: inline-block;
  animation: ${pulse} 1.4s infinite ease-in-out both;
  
  &:nth-child(1) {
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`; 
import styled, { keyframes } from 'styled-components';
import type { ActionItemProps } from '../types/ActionBottomSheet.types';
import { Typography } from '../../atoms/Typography';

// Animação de deslizar para cima
export const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Animação de fade para o overlay
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Overlay para escurecer o fundo
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  backdrop-filter: blur(3px);
`;

// Container principal do BottomSheet
export const BottomSheetContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.large};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.large};
  z-index: 1001;
  box-shadow: ${({ theme }) => theme.shadows.large};
  padding-bottom: env(safe-area-inset-bottom, 16px);
  animation: ${slideUp} 0.3s ease;
`;

// Cabeçalho do BottomSheet
export const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

// Título do BottomSheet
export const BottomSheetTitle = styled(Typography)`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

// Botão de fechar
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

// Item de ação
export const ActionItem = styled.button<ActionItemProps>`
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: none;
  background: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme, $danger }) => $danger ? theme.colors.danger : theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:hover {
    background-color: ${({ theme, $danger }) => 
      $danger ? theme.colors.dangerLighter : theme.colors.backgroundLight};
  }
`; 
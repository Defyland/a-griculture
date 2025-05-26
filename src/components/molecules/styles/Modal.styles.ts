import styled, { css, keyframes } from 'styled-components';
import type { ModalOverlayProps, ModalContentProps } from '../types/Modal.types';
import { Typography } from '../../atoms/Typography';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div<ModalOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  
  ${({ isOpen }) =>
    !isOpen &&
    css`
      display: none;
    `}
`;

export const getModalWidth = (size: string) => {
  switch (size) {
    case 'small':
      return '400px';
    case 'large':
      return '800px';
    case 'medium':
    default:
      return '600px';
  }
};

export const ModalContent = styled.div<ModalContentProps>`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.large};
  max-width: ${({ size }) => getModalWidth(size)};
  width: 95%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 95%;
    max-width: 95%;
  }
`;

export const ModalHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled(Typography)`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0.25rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.lightText};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`; 
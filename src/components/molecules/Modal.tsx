import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../atoms';
import type { ModalProps, ModalFooterActionsProps } from './types/Modal.types';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter
} from './styles/Modal.styles';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  className,
}) => {
  // Impedir o scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Fechar o modal ao pressionar a tecla ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Usar portal para renderizar o modal fora da hierarquia normal do DOM
  return ReactDOM.createPortal(
    <ModalOverlay
      isOpen={isOpen}
      className={className}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <ModalContent
        size={size}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          <CloseButton onClick={onClose} aria-label="Fechar">
            &times;
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

// Helper para um rodapé padrão
export const ModalFooterActions: React.FC<ModalFooterActionsProps> = ({
  onCancel,
  onConfirm,
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
  isConfirmLoading = false,
  isConfirmDisabled = false,
}) => {
  return (
    <>
      <Button variant="secondary" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
        disabled={isConfirmDisabled}
        isLoading={isConfirmLoading}
      >
        {confirmText}
      </Button>
    </>
  );
};

export default Modal; 
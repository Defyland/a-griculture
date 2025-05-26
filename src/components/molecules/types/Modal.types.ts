import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  closeOnOverlayClick?: boolean;
  className?: string;
}

export interface ModalOverlayProps {
  isOpen: boolean;
}

export interface ModalContentProps {
  size: string;
}

export interface ModalFooterActionsProps {
  onCancel: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  isConfirmLoading?: boolean;
  isConfirmDisabled?: boolean;
} 
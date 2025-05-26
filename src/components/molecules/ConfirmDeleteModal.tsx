import React from 'react';
import { Modal } from './Modal';
import { Typography } from '../atoms';
import {
  ConfirmDeleteContent,
  ConfirmDeleteMessage,
  ConfirmDeleteWarning,
  ConfirmDeleteDetails,
  ConfirmDeleteActions,
  CancelButton,
  DeleteButton
} from './styles/ConfirmDeleteModal.styles';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
  itemType: string;
  warningMessage: string;
  details?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  itemType,
  warningMessage,
  details,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="medium"
    >
      <ConfirmDeleteContent>
        <ConfirmDeleteMessage>
          <Typography variant="body1">
            Tem certeza que deseja excluir {itemType} <strong>{itemName}</strong>?
          </Typography>
        </ConfirmDeleteMessage>

        <ConfirmDeleteWarning>
          <Typography variant="body2">
            {warningMessage}
          </Typography>
        </ConfirmDeleteWarning>

        {details && (
          <ConfirmDeleteDetails>
            {details}
          </ConfirmDeleteDetails>
        )}

        <ConfirmDeleteActions>
          <CancelButton
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </CancelButton>
          <DeleteButton
            variant="danger"
            onClick={onConfirm}
            disabled={isDisabled}
            isLoading={isLoading}
          >
            Excluir
          </DeleteButton>
        </ConfirmDeleteActions>
      </ConfirmDeleteContent>
    </Modal>
  );
};

export default ConfirmDeleteModal; 
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import type { ActionBottomSheetProps } from './types/ActionBottomSheet.types';
import {
  Overlay,
  BottomSheetContainer,
  BottomSheetHeader,
  BottomSheetTitle,
  CloseButton,
  ActionItem
} from './styles/ActionBottomSheet.styles';

const ActionBottomSheet: React.FC<ActionBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  options
}) => {
  // Impedir o scroll do body quando o BottomSheet estiver aberto
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
  
  // Fechar ao pressionar ESC
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
  
  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onClose} />
      <BottomSheetContainer>
        <BottomSheetHeader>
          <BottomSheetTitle>{title}</BottomSheetTitle>
          <CloseButton onClick={onClose} aria-label="Fechar">
            &times;
          </CloseButton>
        </BottomSheetHeader>
        <div>
          {options.map((option, index) => (
            <ActionItem
              key={`option-${index}`}
              onClick={() => {
                option.onClick();
                onClose();
              }}
              $danger={option.isDanger}
            >
              {option.icon && <span role="img" aria-label={option.label}>{option.icon}</span>}
              {option.label}
            </ActionItem>
          ))}
        </div>
      </BottomSheetContainer>
    </>,
    document.body
  );
};

export default ActionBottomSheet; 
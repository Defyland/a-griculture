import React, { useState } from 'react';
import ActionBottomSheet from './ActionBottomSheet';
import type { ActionMenuProps } from './types/ActionMenu.types';
import { 
  ActionMenuContainer, 
  ActionButton
} from './styles/ActionMenu.styles';

const ActionMenu: React.FC<ActionMenuProps> = ({ 
  options, 
  title = 'Ações',
  className = '',
  onClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      <ActionMenuContainer className={className} onClick={onClick || ((e) => e.stopPropagation())}>
        <ActionButton onClick={toggleMenu} data-action-button>
          ⋮
        </ActionButton>
      </ActionMenuContainer>
      
      <ActionBottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        options={options}
      />
    </>
  );
};

export default ActionMenu; 
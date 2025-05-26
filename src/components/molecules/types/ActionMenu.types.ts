import React from 'react';

export interface ActionMenuOption {
  label: string;
  icon?: string;
  onClick: () => void;
  isDanger?: boolean;
}

export interface ActionMenuProps {
  id?: string;
  options: ActionMenuOption[];
  title?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
} 
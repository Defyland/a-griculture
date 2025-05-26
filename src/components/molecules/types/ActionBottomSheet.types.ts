export interface ActionOption {
  label: string;
  icon?: string;
  onClick: () => void;
  isDanger?: boolean;
}

export interface ActionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  options: ActionOption[];
}

export interface ActionItemProps {
  $danger?: boolean;
} 
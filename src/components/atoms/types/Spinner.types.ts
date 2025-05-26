import type { DefaultTheme } from 'styled-components';

export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerColor = 'primary' | 'secondary' | 'white';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
}

export interface StyledSpinnerProps {
  $size?: SpinnerSize;
  $color?: SpinnerColor;
}

export const getSize = (size: SpinnerSize = 'medium') => {
  switch (size) {
    case 'small':
      return '1rem';
    case 'large':
      return '3rem';
    case 'medium':
    default:
      return '2rem';
  }
};

export const getColor = (color: SpinnerColor = 'primary', theme: DefaultTheme) => {
  switch (color) {
    case 'secondary':
      return theme.colors.secondary;
    case 'white':
      return 'white';
    case 'primary':
    default:
      return theme.colors.primary;
  }
}; 
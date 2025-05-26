import React from 'react';
import type { SpinnerProps } from './types/Spinner.types';
import { StyledSpinner } from './styles/Spinner.styles';

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = 'primary', className }) => {
  return <StyledSpinner $size={size} $color={color} className={className} />;
};

export default Spinner; 
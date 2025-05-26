import styled, { keyframes } from 'styled-components';
import type { StyledSpinnerProps } from '../types/Spinner.types';
import { getSize, getColor } from '../types/Spinner.types';

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div<StyledSpinnerProps>`
  display: inline-block;
  width: ${({ $size }) => getSize($size)};
  height: ${({ $size }) => getSize($size)};
  
  &:after {
    content: " ";
    display: block;
    width: 80%;
    height: 80%;
    margin: 10%;
    border-radius: 50%;
    border: 2px solid ${({ theme, $color }) => getColor($color, theme)};
    border-color: ${({ theme, $color }) => getColor($color, theme)} transparent ${({ theme, $color }) => getColor($color, theme)} transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`; 
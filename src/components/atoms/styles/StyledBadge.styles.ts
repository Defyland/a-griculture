import styled from 'styled-components';
import type { StyledBadgeWrapperProps } from '../types/StyledBadge.types';

export const StyledBadgeWrapper = styled.span<StyledBadgeWrapperProps>`
  ${({ customStyles }) => customStyles && { ...customStyles }}
`; 
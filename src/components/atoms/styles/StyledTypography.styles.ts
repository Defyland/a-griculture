import styled from 'styled-components';
import type { StyledTypographyWrapperProps } from '../types/StyledTypography.types';

export const StyledTypographyWrapper = styled.div<StyledTypographyWrapperProps>`
  ${({ customStyles }) => customStyles && { ...customStyles }}
  
  /* Remover margens padrão se o componente Typography que estamos estilizando já tem sua própria margem */
  margin: 0;
  padding: 0;
  
  & > * {
    /* Manter as margens originais do componente Typography envolvido */
    margin: inherit;
  }
`; 
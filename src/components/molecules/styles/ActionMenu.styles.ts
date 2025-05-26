import styled from 'styled-components';

// Container do botão de ações
export const ActionMenuContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: auto;
  z-index: 20;
`;

// Botão de ações
export const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  z-index: 10;
  padding: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: none;
  }
`; 
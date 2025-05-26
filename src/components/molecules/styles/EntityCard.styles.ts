import styled from 'styled-components';

export const EntityCardContainer = styled.div`
  /* Não precisa estilos extras pois o Card já vem com estilos */
`;

export const EntityCardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
`;

export const EntityCardTitleArea = styled.div`
  flex: 1;
  min-width: 0; /* Para permitir truncamento de texto */
`;

export const EntityCardActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: ${({ theme }) => theme.spacing.md};
`;

export const EntityCardBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const EntityCardContentSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const EntityCardFooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const EntityCardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const EntityCardDetailLabel = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.lightText};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const EntityCardDetailValue = styled.div`
  flex: 1;
  text-align: right;
  word-break: break-word;
  color: ${({ theme }) => theme.colors.text};
`;

export const EntityCardTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.primaryLighter};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const EntityCardGraphContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
`; 
import styled from 'styled-components';
import { Card } from '../../components/atoms';
import type { StyledCardProps } from '../types/SelecionarProdutor.types';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StyledCard = styled(Card)<StyledCardProps>`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: ${props => props.selected ? `2px solid ${props.theme.colors.primary}` : `1px solid ${props.theme.colors.border}`};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const ProdutorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DocumentoTag = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  font-size: 0.8rem;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 100px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: fit-content;
`;

export const PropriedadesCount = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
`; 
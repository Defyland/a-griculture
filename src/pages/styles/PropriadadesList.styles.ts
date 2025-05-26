import styled from 'styled-components';
import { Button, Typography } from '../../components';
import { Card } from '../../components/atoms';
import type { PageButtonProps } from '../types/PropriadadesList.types';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

// Componentes para visualização em cards
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PropertyCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const PropertyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const PropertyName = styled(Typography)`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const LocationTag = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  font-size: 0.8rem;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 100px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const AreaInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const AreaItem = styled.div`
  font-size: 0.85rem;
`;

export const AreaLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const AreaValue = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const PageButton = styled(Button)<PageButtonProps>`
  margin: 0 ${({ theme }) => theme.spacing.xs};
  min-width: 36px;
  min-height: 36px;
  padding: 0;
  
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) => 
    $active ? 'white' : theme.colors.primary};
  
  &:hover {
    background-color: ${({ theme, $active }) => 
      $active ? theme.colors.primary : theme.colors.primaryAlpha};
  }
`; 
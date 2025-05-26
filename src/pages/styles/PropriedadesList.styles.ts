import styled from 'styled-components';
import { Typography } from '../../components/atoms';
import { Card } from '../../components/atoms';
import type { ProgressFillProps, AreaBadgeProps } from '../types/PropriedadesList.types';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const BackButton = styled.div`
  margin-right: ${({ theme }) => theme.spacing.md};
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const RefreshButton = styled.div`
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardHeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

export const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PropertyDetail = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  min-height: 28px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const DetailLabel = styled(Typography).attrs({
  variant: 'caption',
  weight: 'medium',
})`
  color: ${({ theme }) => theme.colors.textSecondary};
  min-width: 100px;
  flex-shrink: 0;
`;

export const DetailValue = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
`;

export const PropriedadeTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.primaryLighter};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

export const ProgressContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  border-radius: 4px;
  margin-top: 4px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<ProgressFillProps>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme, color }) => theme.colors[color]};
`;

export const AreaBadge = styled.div<AreaBadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'agricultavel':
        return `
          background-color: ${theme.colors.successLighter};
          color: ${theme.colors.success};
        `;
      case 'vegetacao':
        return `
          background-color: ${theme.colors.primaryLighter};
          color: ${theme.colors.primary};
        `;
      case 'total':
      default:
        return `
          background-color: ${theme.colors.infoLighter};
          color: ${theme.colors.info};
        `;
    }
  }}
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

export const PropertyCard = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`;

export const PropertyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PropertyName = styled(Typography)`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LocationTag = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 100px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const AreaInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const AreaItem = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 0.9rem;
`;

export const AreaLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

export const AreaValue = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PageButton = styled.button<{ isActive?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : 'transparent'};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ theme, isActive }) => 
      isActive ? theme.colors.primary : theme.colors.backgroundDarker};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ViewToggleContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-left: ${({ theme }) => theme.spacing.md};
`;

export const ViewToggleButton = styled.button<{ isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.backgroundDarker};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${({ theme, isActive }) => 
      isActive ? theme.colors.primary : theme.colors.border};
  }
`;

export const TableContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const StatusChip = styled(Typography).attrs({
  variant: 'caption',
  weight: 'medium',
})<{ status: 'success' | 'warning' | 'danger' | 'info' }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 100px;
  
  ${({ status, theme }) => {
    switch (status) {
      case 'success':
        return `
          background-color: ${theme.colors.successLighter};
          color: ${theme.colors.success};
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warningLighter};
          color: ${theme.colors.warning};
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.dangerLighter};
          color: ${theme.colors.danger};
        `;
      case 'info':
      default:
        return `
          background-color: ${theme.colors.primaryLighter};
          color: ${theme.colors.primary};
        `;
    }
  }}
`; 
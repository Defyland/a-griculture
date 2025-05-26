import styled from 'styled-components';
import { Card } from '../../components/atoms';
import { Typography } from '../../components/atoms/Typography';
import type { ProgressFillProps, StatusTagProps, CulturaTagProps } from '../types/PropriedadeDetails.types';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const ContentSection = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled(Typography).attrs({
  variant: 'h4',
  weight: 'medium',
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled(Typography).attrs({
  variant: 'body2',
  weight: 'medium',
})`
  width: 150px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const InfoValue = styled(Typography).attrs({
  variant: 'body2',
})`
  flex: 1;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  border-radius: 4px;
  margin-top: 4px;
`;

export const ProgressFill = styled.div<ProgressFillProps>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme, color }) => theme.colors[color]};
`;

export const ProgressContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

export const SafraItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SafraHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SafraInfo = styled(Typography).attrs({
  variant: 'body2',
  color: 'secondary',
})`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.9rem;
`;

export const StatusTag = styled(Typography).attrs({
  variant: 'caption',
  weight: 'medium',
})<StatusTagProps>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  
  ${({ status, theme }) => {
    switch (status) {
      case 'ativa':
        return `
          background-color: ${theme.colors.successLighter};
          color: ${theme.colors.success};
        `;
      case 'concluida':
        return `
          background-color: ${theme.colors.primaryLighter};
          color: ${theme.colors.primary};
        `;
      case 'planejada':
        return `
          background-color: ${theme.colors.warningLighter};
          color: ${theme.colors.warning};
        `;
      default:
        return '';
    }
  }}
`;

export const CulturasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const CulturaTag = styled(Typography).attrs({
  variant: 'caption',
  weight: 'medium',
})<CulturaTagProps>`
  background-color: ${({ theme, index }) => {
    const colors = [
      theme.colors.primaryLighter,
      theme.colors.secondaryLighter,
      theme.colors.tertiaryLighter,
      theme.colors.infoLighter,
      theme.colors.successLighter,
      theme.colors.warningLighter
    ];
    return colors[index % colors.length];
  }};
  color: ${({ theme, index }) => {
    const colors = [
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.tertiary,
      theme.colors.info,
      theme.colors.success,
      theme.colors.warning
    ];
    return colors[index % colors.length];
  }};
  border-radius: 100px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.dangerLighter};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const ProdutorTag = styled(Typography).attrs({
  variant: 'caption',
  weight: 'medium',
})`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.primaryLighter};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`; 
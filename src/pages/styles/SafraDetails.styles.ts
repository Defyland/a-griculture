import styled from 'styled-components';
import { Card } from '../../components/atoms';
import type { StatusStepProps, StatusTagProps, CulturaTagProps } from '../types/SafraDetails.types';

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

export const SectionTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled.span`
  width: 150px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const InfoValue = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
`;

export const CulturasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const CulturaTag = styled.span<CulturaTagProps>`
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
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const StatusTag = styled.span<StatusTagProps>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
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

export const PropriedadeTag = styled.span`
  background-color: ${({ theme }) => theme.colors.infoLighter};
  color: ${({ theme }) => theme.colors.info};
  border-radius: 100px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.infoLight};
  }
`;

export const ProdutorTag = styled.span`
  background-color: ${({ theme }) => theme.colors.secondaryLighter};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: 100px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  min-height: 300px;
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

export const StatusHistory = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const StatusStep = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const StatusStepDot = styled.div<StatusStepProps>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme, active }) => 
    active ? theme.colors.success : theme.colors.backgroundDarker};
  margin-right: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
  margin-top: 4px;
`;

export const StatusStepContent = styled.div``;

export const StatusStepTitle = styled.span`
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const StatusStepDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  color: ${({ theme }) => theme.colors.textSecondary};
`; 
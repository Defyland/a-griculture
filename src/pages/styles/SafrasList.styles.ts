import styled, { keyframes } from 'styled-components';
import type { StatusTagProps } from '../types/SafrasList.types';

// Styled components otimizados para uso em tela cheia
export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

export const ContentContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Animação para os pontos de carregamento
const loadingAnimation = keyframes`
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LoadingDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${loadingAnimation} 1.4s infinite ease-in-out both;
  
  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

export const StatusTag = styled.span<StatusTagProps>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 100px;
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

// Componente para culturas
export const CulturasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const CulturaTag = styled.span<{ index: number }>`
  padding: 4px 8px;
  border-radius: 50px;
  font-size: 0.8rem;
  background-color: ${({ theme, index }) => {
    const colors = [
      theme.colors.successLighter,
      theme.colors.primaryLighter,
      theme.colors.warningLighter,
      theme.colors.infoLighter
    ];
    return colors[index % colors.length];
  }};
  color: ${({ theme, index }) => {
    const colors = [
      theme.colors.success,
      theme.colors.primary,
      theme.colors.warning,
      theme.colors.info
    ];
    return colors[index % colors.length];
  }};
`;

export const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const ModalTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
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

// Componentes para visualização em cards
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StyledCard = styled.div`
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

export const DetailLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  min-width: 100px;
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const DetailValue = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
`; 
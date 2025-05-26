import styled from 'styled-components';
import { Card, Typography } from '../../components';

// Estado vazio - usado em várias páginas de listagem
export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

// Container para estados de carregamento
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  height: 200px;
  flex: 1;
`;

// Loading dots animation - usado em várias telas
export const LoadingDot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  animation: pulse 1.5s infinite ease-in-out;
  
  &:nth-child(1) {
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.3s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.6s;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
`;

// Container para mensagens de erro
export const ErrorContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.dangerLighter};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

// Mensagem de erro - usada em formulários
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: 0.875rem;
`;

// Mensagem de sucesso - usada em formulários
export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.successLighter};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// Container para formulários
export const FormContainer = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

// Formulário principal
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

// Layout de linha para formulários
export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

// Grupo de campos de formulário
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Ações de formulário (botões no rodapé)
export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

// Cabeçalho de seção - usado em cards e blocos
export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

// Layout de linha para informações detalhadas
export const InfoRow = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// Rótulo para campos de informação
export const InfoLabel = styled.div`
  width: 180px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// Valor para campos de informação
export const InfoValue = styled.div`
  flex: 1;
`;

// Botões de ação em linha
export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

// Tags para elementos como localização, status, etc.
export const Tag = styled.div<{ variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme, variant = 'primary' }) => theme.colors[`${variant}Lighter`]};
  color: ${({ theme, variant = 'primary' }) => theme.colors[variant]};
  border-radius: 100px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// Grid de conteúdo para layout de duas colunas
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

// Seção de conteúdo encapsulada em card
export const ContentSection = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

// Estatísticas para dashboard e resumos
export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Statistic = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const StatisticValue = styled(Typography)`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`; 
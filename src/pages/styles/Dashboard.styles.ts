import styled from 'styled-components';
import { animated } from 'react-spring';
import { Typography } from '../../components/atoms/Typography';

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;

export const DashboardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const AnimatedStatValue = styled(animated(Typography))`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

export const StatLabel = styled(Typography)`
  color: ${({ theme }) => theme.colors.lightText};
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ChartsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const ChartTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

export const ChartContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 300px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

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

export const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background-color: ${({ theme }) => theme.colors.dangerLighter};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

export const ErrorMessage = styled(Typography)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.danger};
`;

// Cores para os gráficos no estilo Apple
export const COLORS = [
  '#34C759', '#5AC8FA', '#007AFF', '#AF52DE', '#FF2D55', 
  '#FF9500', '#FFCC00', '#248A3D', '#0071E3', '#FF3B30',
  '#63DD83', '#8AD9FC', '#5AA9FF', '#C77DFF', '#FF6482'
];

// Novos componentes de estilo no estilo Apple
export const StatCard = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all ${({ theme }) => theme.transitions.medium};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

export const StatCardIcon = styled.div<{ color?: 'primary' | 'secondary' | 'tertiary' | 'info' }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-right: ${({ theme }) => theme.spacing.md};
  font-size: 24px;
  
  background-color: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.colors.primaryLighter;
      case 'secondary':
        return theme.colors.secondaryLighter;
      case 'tertiary':
        return theme.colors.tertiaryLighter;
      case 'info':
        return theme.colors.infoLighter;
      default:
        return theme.colors.primaryLighter;
    }
  }};
  
  color: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'tertiary':
        return theme.colors.tertiary;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.primary;
    }
  }};
`;

export const StatCardContent = styled.div`
  flex: 1;
`;

export const StatCardValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: 0.25rem;
`;

export const StatCardLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.25rem;
`;

export const SmallChartContainer = styled.div`
  height: 200px;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const KPIChange = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const KPIChangePositive = styled(KPIChange)`
  color: ${({ theme }) => theme.colors.success};
`;

export const KPIChangeNegative = styled(KPIChange)`
  color: ${({ theme }) => theme.colors.danger};
`;

export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ProgressLabel = styled(Typography)`
  width: 120px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: 0;
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressValue = styled.div`
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

export const MiniChartContainer = styled.div`
  height: 40px;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm};
`; 
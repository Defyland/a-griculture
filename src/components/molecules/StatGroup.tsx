import React from 'react';
import styled from 'styled-components';
import { StatCard } from './StatCard';
import { Card } from '../atoms';

interface StatItem {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'info' | 'warning';
  suffix?: string;
  prefix?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

interface StatGroupProps {
  stats: StatItem[];
  title?: string;
  columns?: number;
  className?: string;
  withCard?: boolean;
}

const Container = styled.div`
  width: 100%;
`;

const ContentWrapper = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

interface GridProps {
  $columns?: number;
}

const StatGrid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 4}, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SimpleGrid = styled(StatGrid)`
  margin: 0;
`;

export const StatGroup: React.FC<StatGroupProps> = ({
  stats,
  title,
  columns = 4,
  className,
  withCard = true
}) => {
  if (!stats || stats.length === 0) {
    return null;
  }

  const renderStats = () => (
    <StatGrid $columns={columns}>
      {stats.map((stat, index) => (
        <StatCard
          key={`stat-${index}-${stat.title}`}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          suffix={stat.suffix}
          prefix={stat.prefix}
          description={stat.description}
          trend={stat.trend}
          onClick={stat.onClick}
          responsive={true}
        />
      ))}
    </StatGrid>
  );

  if (!withCard) {
    return (
      <Container className={className}>
        {title && <Title>{title}</Title>}
        <SimpleGrid $columns={columns}>
          {stats.map((stat, index) => (
            <StatCard
              key={`stat-${index}-${stat.title}`}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              suffix={stat.suffix}
              prefix={stat.prefix}
              description={stat.description}
              trend={stat.trend}
              onClick={stat.onClick}
              responsive={true}
            />
          ))}
        </SimpleGrid>
      </Container>
    );
  }

  return (
    <Container className={className}>
      <ContentWrapper>
        {title && <Title>{title}</Title>}
        {renderStats()}
      </ContentWrapper>
    </Container>
  );
};

export default StatGroup; 
import React from 'react';
import styled from 'styled-components';

interface StatCardProps {
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
  className?: string;
  responsive?: boolean;
}

interface ColorProps {
  $color: string;
  theme: {
    colors: Record<string, string>;
  };
}

const getColor = ({ $color, theme }: ColorProps) => {
  switch ($color) {
    case 'primary':
      return theme.colors.primary;
    case 'secondary':
      return theme.colors.secondary;
    case 'tertiary':
      return theme.colors.tertiary;
    case 'success':
      return theme.colors.success;
    case 'info':
      return theme.colors.info;
    case 'warning':
      return theme.colors.warning;
    default:
      return theme.colors.primary;
  }
};

interface CardProps {
  $color: string;
  $hasClick: boolean;
}

const Card = styled.div<CardProps>`
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border-top: 4px solid ${({ $color, theme }) => getColor({ $color, theme })};
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: ${({ $hasClick }) => ($hasClick ? 'pointer' : 'default')};
  min-height: 165px;
  
  &:hover {
    transform: ${({ $hasClick }) => ($hasClick ? 'translateY(-5px)' : 'translateY(-3px)')};
    box-shadow: ${({ $hasClick }) => ($hasClick ? '0 8px 24px rgba(0, 0, 0, 0.12)' : '0 6px 22px rgba(0, 0, 0, 0.08)')};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top, rgba(249, 249, 249, 0.8), transparent);
    z-index: 1;
    pointer-events: none;
  }
`;

const IconWrapper = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 14px;
  background-color: ${({ $color, theme }) => `${getColor({ $color, theme })}15`};
  color: ${({ $color, theme }) => getColor({ $color, theme })};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 1.6rem;
  box-shadow: 0 4px 8px ${({ $color, theme }) => `${getColor({ $color, theme })}20`};
`;

const Title = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const Value = styled.div<{ $color: string }>`
  font-size: 2.4rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: linear-gradient(45deg, ${({ $color, theme }) => getColor({ $color, theme })}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const Suffix = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Prefix = styled(Suffix)``;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.md};
  line-height: 1.5;
`;

const TrendContainer = styled.div<{ $isPositive: boolean }>`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $isPositive, theme }) => 
    $isPositive ? theme.colors.success : theme.colors.danger};
  padding: 4px 10px;
  border-radius: 100px;
  background-color: ${({ $isPositive, theme }) => 
    $isPositive ? `${theme.colors.success}10` : `${theme.colors.danger}10`};
  align-self: flex-start;
`;

const TrendValue = styled.span`
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const TrendIcon = styled.span`
  font-size: 1rem;
`;

const CardBackground = styled.div<{ $color: string }>`
  position: absolute;
  top: -25px;
  right: -25px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: ${({ $color, theme }) => `${getColor({ $color, theme })}08`};
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const ResponsiveContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${Card} {
      padding: ${({ theme }) => theme.spacing.md};
    }
    
    ${IconWrapper} {
      width: 40px;
      height: 40px;
      font-size: 1.25rem;
    }
    
    ${Value} {
      font-size: 1.75rem;
    }
  }
`;

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  suffix,
  prefix,
  description,
  trend,
  onClick,
  className,
  responsive = true
}) => {
  const cardContent = (
    <Card $color={color} $hasClick={!!onClick} onClick={onClick} className={className}>
      <CardBackground $color={color} />
      <Content>
        {icon && <IconWrapper $color={color}>{icon}</IconWrapper>}
        <Title>{title}</Title>
        <ValueContainer>
          {prefix && <Prefix>{prefix}</Prefix>}
          <Value $color={color}>{typeof value === 'number' ? value.toLocaleString() : value}</Value>
          {suffix && <Suffix>{suffix}</Suffix>}
        </ValueContainer>
        {description && <Description>{description}</Description>}
        {trend && (
          <TrendContainer $isPositive={trend.isPositive}>
            <TrendIcon>{trend.isPositive ? '↑' : '↓'}</TrendIcon>
            <TrendValue>{trend.value}%</TrendValue>
          </TrendContainer>
        )}
      </Content>
    </Card>
  );

  return responsive ? <ResponsiveContainer>{cardContent}</ResponsiveContainer> : cardContent;
};

export default StatCard; 
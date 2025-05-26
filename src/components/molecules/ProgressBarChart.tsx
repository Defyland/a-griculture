import React from 'react';
import styled from 'styled-components';

interface ProgressBarChartProps {
  data: {
    name: string;
    value: number;
    color: string;
    percentage?: number;
  }[];
  title?: string;
  height?: number;
  showValues?: boolean;
  showLabels?: boolean;
  stackedLabels?: boolean;
}

const Container = styled.div`
  width: 100%;
  margin: 0.75rem 0;
`;

const Title = styled.h4`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
`;

interface BarContainerProps {
  $height: number;
}

const BarContainer = styled.div<BarContainerProps>`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundDarker};
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.12);
  height: ${({ $height }) => `${$height}px`};
  position: relative;
  display: flex;
`;

interface BarProps {
  width: number;
  color: string;
  index: number;
}

const Bar = styled.div<BarProps>`
  height: 100%;
  background: ${({ color }) => color};
  width: ${({ width }) => `${width}%`};
  transition: width 1.5s ease-in-out, background 0.3s ease;
  position: relative;
  
  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.5);
  }
  
  &:hover {
    filter: brightness(1.15);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20%;
    background: linear-gradient(rgba(255, 255, 255, 0.5), transparent);
  }
`;

const LabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  gap: 0.25rem;
`;

interface LabelProps {
  color: string;
}

const Label = styled.div<LabelProps>`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  
  &:last-child {
    margin-right: 0;
  }
`;

const ColorIndicator = styled.div<LabelProps>`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: ${({ color }) => color};
  margin-right: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
`;

const StackedLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
`;

const StackedLabel = styled.div<LabelProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  span:first-child {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: 1rem;
    color: ${({ color }) => color};
  }
  
  span:last-child {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 2px;
  }
`;

export const ProgressBarChart: React.FC<ProgressBarChartProps> = ({
  data,
  title,
  height = 30,
  showValues = true,
  showLabels = true,
  stackedLabels = false
}) => {
  if (!data || data.length === 0) return null;
  
  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate positions for labels
  let accumulatedPercentage = 0;
  const dataWithPosition = data.map(item => {
    const percentage = (item.value / total) * 100;
    const positionPercentage = accumulatedPercentage + percentage / 2;
    accumulatedPercentage += percentage;
    
    return {
      ...item,
      percentage: item.percentage || percentage,
      position: positionPercentage
    };
  });

  return (
    <Container>
      {title && <Title>{title}</Title>}
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <BarContainer $height={height}>
          {dataWithPosition.map((item, index) => (
            <Bar
              key={`bar-${item.name}-${index}`}
              width={item.percentage}
              color={item.color}
              index={index}
            />
          ))}
        </BarContainer>
      
        {showLabels && !stackedLabels && (
          <LabelsContainer>
            {data.map((item, index) => (
              <Label key={`label-${item.name}-${index}`} color={item.color}>
                <ColorIndicator color={item.color} />
                {item.name}
                {showValues && <span style={{ marginLeft: '5px', opacity: 0.7 }}>
                  ({item.value.toLocaleString()})
                </span>}
              </Label>
            ))}
          </LabelsContainer>
        )}
        
        {stackedLabels && (
          <StackedLabelContainer>
            {dataWithPosition.map((item, index) => (
              <StackedLabel 
                key={`stacked-${item.name}-${index}`}
                color={item.color}
              >
                <span>{item.value.toLocaleString()}</span>
                <span>{item.name} ({item.percentage.toFixed(1)}%)</span>
              </StackedLabel>
            ))}
          </StackedLabelContainer>
        )}
      </div>
    </Container>
  );
};

export default ProgressBarChart; 
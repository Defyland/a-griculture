import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip, Legend } from 'recharts';

interface PieProgressChartProps {
  data: {
    name: string;
    value: number;
    color?: string;
  }[];
  title?: string;
  height?: number;
  colors?: string[];
  showLabels?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  showTooltip?: boolean;
  centerLabel?: string;
}

const Container = styled.div`
  width: 100%;
  margin: 1.5rem 0;
  position: relative;
`;

const Title = styled.h4`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    border-radius: 4px;
  }
`;

const ChartContainer = styled.div<{ $height: number }>`
  height: ${({ $height }) => `${$height}px`};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 1rem;
`;

interface LegendItemProps {
  color: string;
}

const LegendItem = styled.div<LegendItemProps>`
  display: flex;
  align-items: center;
  margin: 0.5rem 1rem;
  padding: 5px 10px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundDarker};
  }
`;

const LegendColor = styled.div<LegendItemProps>`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: ${({ color }) => color};
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
`;

const LegendText = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  
  span:first-child {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
  
  span:last-child {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 2px;
  }
`;

const NoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;

const CustomTooltip = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  border: none;
  padding: 12px 16px;
  font-size: 0.95rem;

  .tooltip-label {
    font-weight: bold;
    margin-bottom: 6px;
    color: #333;
  }
  
  .tooltip-value {
    display: flex;
    align-items: center;
  }
  
  .tooltip-color {
    width: 12px;
    height: 12px;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  .tooltip-percent {
    margin-left: 8px;
    font-size: 0.85rem;
    opacity: 0.85;
    font-weight: 500;
  }
`;

const defaultColors = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', '#3F51B5', '#009688'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  const total = payload[0].payload.total;
  const percentage = ((data.value / total) * 100).toFixed(1);

  return (
    <CustomTooltip>
      <div className="tooltip-label">{data.name}</div>
      <div className="tooltip-value">
        <div className="tooltip-color" style={{ backgroundColor: data.fill }}></div>
        {data.value.toLocaleString()}
        <span className="tooltip-percent">({percentage}%)</span>
      </div>
    </CustomTooltip>
  );
};

export const PieProgressChart: React.FC<PieProgressChartProps> = ({
  data,
  title,
  height = 250,
  colors = defaultColors,
  showLabels = false,
  showLegend = true,
  innerRadius = 60,
  outerRadius = 80,
  showTooltip = true,
  centerLabel
}) => {
  if (!data || data.length === 0) {
    return (
      <Container>
        {title && <Title>{title}</Title>}
        <ChartContainer $height={height}>
          <NoData>Sem dados para exibir</NoData>
        </ChartContainer>
      </Container>
    );
  }
  
  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Prepare data with colors
  const preparedData = data.map((item, index) => ({
    ...item,
    fill: item.color || colors[index % colors.length],
    total
  }));

  return (
    <Container>
      {title && <Title>{title}</Title>}
      
      <ChartContainer $height={height}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 30, bottom: 30, left: 10 }}>
            <Pie
              data={preparedData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              paddingAngle={3}
              stroke="none"
              label={(entry) => `${entry.name.length > 8 ? entry.name.substring(0, 6) + '...' : entry.name}`}
              labelLine={{ stroke: '#cccccc', strokeWidth: 0.5, opacity: 0.8, strokeDasharray: '2 2' }}
            >
              {preparedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill}
                  style={{
                    filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.1))'
                  }}
                />
              ))}
              {centerLabel && (
                <Label
                  position="center"
                  value={centerLabel}
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    fill: '#333'
                  }}
                />
              )}
            </Pie>
            {showTooltip && <Tooltip content={renderCustomTooltip} />}
            {showLabels && (
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '15px' }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      {showLegend && !showLabels && (
        <LegendContainer>
          {preparedData.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <LegendItem key={`legend-${index}`} color={item.fill}>
                <LegendColor color={item.fill} />
                <LegendText>
                  <span>{item.name}</span>
                  <span>{percentage}%</span>
                </LegendText>
              </LegendItem>
            );
          })}
        </LegendContainer>
      )}
    </Container>
  );
};

export default PieProgressChart; 
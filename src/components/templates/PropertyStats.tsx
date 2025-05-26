import React from 'react';
import styled from 'styled-components';
import { FaChartBar, FaMapMarkedAlt, FaLeaf, FaCalendarAlt } from 'react-icons/fa';
import type { Propriedade } from '../../types';
import { ProgressBarChart, PieProgressChart, StatCard } from '../molecules';

interface PropertyStatsProps {
  propriedades: Propriedade[];
  title?: string;
  className?: string;
}

const Container = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const GraphsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const GraphCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.md};
`;

const PropertyStats: React.FC<PropertyStatsProps> = ({ propriedades, title = "Estatísticas", className }) => {
  if (!propriedades || propriedades.length === 0) {
    return null;
  }
  
  // Calcular estatísticas
  const totalArea = propriedades.reduce((acc, p) => acc + p.areaTotal, 0);
  const totalAgricultavel = propriedades.reduce((acc, p) => acc + p.areaAgricultavel, 0);
  const totalVegetacao = propriedades.reduce((acc, p) => acc + p.areaVegetacao, 0);
  const totalSafras = propriedades.reduce((acc, p) => acc + (p.safras?.length || 0), 0);
  
  // Dados para gráfico de área
  const areaData = [
    {
      name: 'Agricultável',
      value: totalAgricultavel,
      color: '#4CAF50',
      percentage: (totalAgricultavel / totalArea) * 100
    },
    {
      name: 'Vegetação',
      value: totalVegetacao,
      color: '#2196F3',
      percentage: (totalVegetacao / totalArea) * 100
    }
  ];
  
  // Dados para gráfico de culturas
  const culturas: Record<string, number> = {};
  propriedades.forEach(propriedade => {
    if (propriedade.safras) {
      propriedade.safras.forEach(safra => {
        if (safra.culturas) {
          safra.culturas.forEach(cultura => {
            const nomeCultura = typeof cultura === 'string' ? cultura : cultura.nome;
            culturas[nomeCultura] = (culturas[nomeCultura] || 0) + 1;
          });
        }
      });
    }
  });
  
  const culturaData = Object.entries(culturas)
    .map(([nome, valor]) => ({ name: nome, value: valor }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Limitar para as 5 principais culturas

  return (
    <Container className={className}>
      <Title>{title}</Title>
      
      <StatsGrid>
        <StatCard
          title="Propriedades"
          value={propriedades.length}
          icon={<FaMapMarkedAlt />}
          color="primary"
        />
        <StatCard
          title="Hectares"
          value={totalArea}
          suffix="ha"
          icon={<FaChartBar />}
          color="secondary"
        />
        <StatCard
          title="Safras"
          value={totalSafras}
          icon={<FaCalendarAlt />}
          color="tertiary"
        />
        <StatCard
          title="Área Preservada"
          value={totalVegetacao}
          suffix="ha"
          icon={<FaLeaf />}
          color="success"
          description={`${((totalVegetacao / totalArea) * 100).toFixed(1)}% da área total`}
        />
      </StatsGrid>
      
      <SectionDivider />
      
      <GraphsContainer>
        <GraphCard>
          <ProgressBarChart
            title="Uso da Terra"
            data={areaData}
            height={40}
            stackedLabels={true}
          />
        </GraphCard>
        
        {culturaData.length > 0 && (
          <GraphCard>
            <PieProgressChart
              title="Culturas por Safra"
              data={culturaData}
              height={220}
            />
          </GraphCard>
        )}
      </GraphsContainer>
    </Container>
  );
};

export default PropertyStats; 
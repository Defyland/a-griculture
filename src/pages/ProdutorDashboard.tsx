import React, { useState } from 'react';
import styled from 'styled-components';
import { PageLayout } from '../components/templates/PageLayout';
import { PropertyStats } from '../components';
import { 
  ProgressBarChart, 
  PieProgressChart, 
  CardWithTitle, 
  FilterSearchBar,
  StatCard
} from '../components/molecules';
import { Button, Typography } from '../components/atoms';
import { 
  FaMapMarkerAlt, 
  FaLeaf, 
  FaCalendarAlt, 
  FaUsers, 
  FaWarehouse, 
  FaTractor, 
  FaSeedling 
} from 'react-icons/fa';

const DemoDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState('todas');
  
  // Dados de exemplo
  const propriedade = {
    id: '1',
    nome: 'Rancho Verde',
    cidade: 'Goiânia',
    estado: 'GO',
    areaTotal: 3000,
    areaAgricultavel: 2200,
    areaVegetacao: 800,
    produtorId: '1',
    safras: [
      {
        id: '1',
        nome: 'Safra 2023',
        culturas: [
          { nome: 'Trigo' },
          { nome: 'Soja' }
        ]
      }
    ]
  };
  
  // Estatísticas gerais
  const overviewStats = [
    {
      title: 'Propriedades',
      value: 5,
      icon: <FaWarehouse />,
      color: 'primary' as const
    },
    {
      title: 'Área Total',
      value: 8500,
      suffix: 'ha',
      icon: <FaMapMarkerAlt />,
      color: 'secondary' as const
    },
    {
      title: 'Colaboradores',
      value: 32,
      icon: <FaUsers />,
      color: 'tertiary' as const
    },
    {
      title: 'Safras Ativas',
      value: 8,
      icon: <FaCalendarAlt />,
      color: 'info' as const
    }
  ];
  
  // Estatísticas de produção
  const productionStats = [
    {
      title: 'Área Plantada',
      value: 5800,
      suffix: 'ha',
      icon: <FaTractor />,
      color: 'primary' as const,
      description: '75% da área agricultável'
    },
    {
      title: 'Área Preservada',
      value: 2700,
      suffix: 'ha',
      icon: <FaLeaf />,
      color: 'success' as const,
      description: '31% da área total'
    },
    {
      title: 'Culturas',
      value: 6,
      icon: <FaSeedling />,
      color: 'tertiary' as const
    }
  ];
  
  // Dados para gráfico de uso da terra
  const usoTerraData = [
    {
      name: 'Agricultável',
      value: 5800,
      color: '#4CAF50',
      percentage: 68.2
    },
    {
      name: 'Vegetação',
      value: 2700,
      color: '#2196F3',
      percentage: 31.8
    }
  ];
  
  // Dados para gráfico de culturas
  const culturaData = [
    { name: 'Soja', value: 2500 },
    { name: 'Milho', value: 1800 },
    { name: 'Trigo', value: 900 },
    { name: 'Algodão', value: 600 }
  ];
  
  // Filtros disponíveis
  const filters = [
    { id: 'todas', label: 'Todas propriedades' },
    { id: 'rancho-verde', label: 'Rancho Verde' },
    { id: 'fazenda-sol', label: 'Fazenda Sol Nascente' },
    { id: 'sitio-flores', label: 'Sítio das Flores' }
  ];
  
  return (
    <PageLayout>
      <Container>
        <Header>
          <HeaderContent>
            <Typography variant="h2" noMargin>
              Dashboard
            </Typography>
            <Typography color="secondary">
              Visão geral da Agropecuária Brasil LTDA
            </Typography>
          </HeaderContent>
          <FilterContainer>
            <FilterSearchBar
              options={filters}
              value={selectedFilter}
              onChange={(value) => setSelectedFilter(value)}
              placeholder="Filtrar por propriedade"
            />
          </FilterContainer>
        </Header>
        
        <StatsRow>
          {overviewStats.map((stat, index) => (
            <StatCard
              key={`overview-${index}`}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              suffix={stat.suffix}
            />
          ))}
        </StatsRow>
        
        <DashboardGrid>
          <MainColumn>
            <CardWithTitle title="Uso da Terra">
              <ProgressBarChart
                data={usoTerraData}
                height={40}
                stackedLabels={true}
              />
            </CardWithTitle>
            
            <PropertyStats 
              propriedades={[propriedade]}
              title="Análise por Propriedade"
            />
          </MainColumn>
          
          <MainColumn>
            <ChartsRow>
              <CardWithTitle title="Produção">
                {productionStats.map((stat, index) => (
                  <StatCard
                    key={`production-${index}`}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    suffix={stat.suffix}
                    description={stat.description}
                  />
                ))}
              </CardWithTitle>
              
              <CardWithTitle title="Culturas Plantadas">
                <PieProgressChart
                  data={culturaData}
                  height={220}
                  centerLabel="Culturas"
                />
              </CardWithTitle>
            </ChartsRow>
            
            <QuickLinkCard>
              <QuickLinkTitle>Ações Rápidas</QuickLinkTitle>
              <QuickLinks>
                <Button variant="outlined" fullWidth>
                  Nova Propriedade
                </Button>
                <Button variant="outlined" fullWidth>
                  Adicionar Safra
                </Button>
                <Button variant="outlined" fullWidth>
                  Relatórios
                </Button>
              </QuickLinks>
            </QuickLinkCard>
          </MainColumn>
        </DashboardGrid>
      </Container>
    </PageLayout>
  );
};

// Estilos
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderContent = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const FilterContainer = styled.div`
  width: 300px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const QuickLinkCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const QuickLinkTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export default DemoDashboard; 
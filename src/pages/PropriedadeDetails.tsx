import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PageLayout, 
  Typography, 
  Button, 
  Spinner,
  ContextHeader,
  PropertyStats
} from '../components';
import type { Propriedade, Produtor, Safra } from '../types';
import { propriedadesAPI, produtoresAPI, safrasAPI } from '../services/api';
import type { BreadcrumbItem } from './types/PropriedadeDetails.types';
import {
  LoadingContainer,
  ErrorContainer,
  Container as ImportedContainer,
  ContentGrid as ImportedContentGrid,
  ContentSection as ImportedContentSection,
  SectionTitle as ImportedSectionTitle,
  SafraInfo,
  CulturasContainer,
  CulturaTag,
  ActionButtons as ImportedActionButtons
} from './styles/PropriedadeDetails.styles';
import { FaChartBar, FaLeaf, FaFlag, FaClock } from 'react-icons/fa';
import styled from 'styled-components';
import { ProgressBarChart } from '../components/molecules';
import { Badge } from '../components/atoms';

const PropriedadeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);
  const [produtor, setProdutor] = useState<Produtor | null>(null);
  const [safras, setSafras] = useState<Safra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('ID da propriedade não fornecido');
        setLoading(false);
        return;
      }
      
      try {
        // Buscar dados da propriedade
        const propriedadeData = await propriedadesAPI.getById(id);
        
        if (!propriedadeData) {
          setError('Propriedade não encontrada');
          setLoading(false);
          return;
        }
        
        setPropriedade(propriedadeData);
        
        // Buscar safras associadas à propriedade
        const safrasData = await safrasAPI.getByPropriedade(id);
        setSafras(safrasData);
        
        // Buscar dados do produtor
        if (propriedadeData.produtorId) {
          const produtorData = await produtoresAPI.getById(propriedadeData.produtorId);
          setProdutor(produtorData || null);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados. Tente novamente mais tarde.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const formatArea = (area: number) => {
    return area.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  };
  
  // Preparar os breadcrumbs
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/' },
      { label: 'Propriedades', path: '/propriedades' }
    ];
    
    if (propriedade) {
      if (produtor) {
        items.push({
          label: produtor.nome,
          path: `/produtores/${produtor.id}/propriedades`
        });
      }
      
      items.push({
        label: propriedade.nome,
        path: `/propriedades/${propriedade.id}`,
        isActive: true
      });
    }
    
    return items;
  };

  // Botões de ação
  const getActionButtons = () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button 
        variant="outlined" 
        onClick={() => navigate(`/propriedades/editar/${id}`)}
        rounded
        icon="✏️"
      >
        Editar
      </Button>
      <Button 
        variant="primary" 
        onClick={() => navigate(`/propriedades/${id}/safras`)}
        rounded
        icon="🌱"
      >
        Ver Safras
      </Button>
    </div>
  );
  
  // Informações contextuais
  const getContextualInfo = () => {
    if (!propriedade) return null;
    
    return (
      <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {produtor && (
          <div 
            style={{ 
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 8px',
              backgroundColor: '#E1F5FE',
              color: '#0288D1',
              borderRadius: '100px',
              fontSize: '0.85rem',
              fontWeight: 500,
              transition: 'all 0.2s',
            }} 
            onClick={() => navigate(`/produtores/${produtor.id}`)}
          >
            👨‍🌾 {produtor.nome}
          </div>
        )}
        <span style={{ 
          fontSize: '0.85rem', 
          color: '#86868B', 
          display: 'flex', 
          alignItems: 'center',
          marginLeft: produtor ? '0.5rem' : '0'
        }}>
          {propriedade.cidade}/{propriedade.estado} • {formatArea(propriedade.areaTotal)} hectares
        </span>
      </div>
    );
  };
  
  const obterCulturasPorSafra = () => {
    if (!propriedade || !propriedade.safras) return [];
    
    const culturas: Record<string, number> = {};
    
    propriedade.safras.forEach(safra => {
      if (safra.culturas) {
        safra.culturas.forEach(cultura => {
          const nomeCultura = typeof cultura === 'string' ? cultura : cultura.nome;
          culturas[nomeCultura] = (culturas[nomeCultura] || 0) + 1;
        });
      }
    });
    
    return Object.entries(culturas)
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  };
  
  if (loading) {
    return (
      <PageLayout>
        <ImportedContainer>
          <LoadingContainer>
            <Spinner size="large" />
          </LoadingContainer>
        </ImportedContainer>
      </PageLayout>
    );
  }
  
  if (error || !propriedade) {
    return (
      <PageLayout>
        <ImportedContainer>
          <ErrorContainer>
            <Typography variant="h3">
              {error || 'Propriedade não encontrada'}
            </Typography>
            <Button 
              variant="primary" 
              onClick={() => navigate('/propriedades')} 
              style={{ marginTop: '1rem' }}
            >
              Voltar para Propriedades
            </Button>
          </ErrorContainer>
        </ImportedContainer>
      </PageLayout>
    );
  }
  
  // Calcular área não utilizada
  const areaNaoUtilizada = propriedade.areaTotal - propriedade.areaAgricultavel - propriedade.areaVegetacao;
  const percentAgricultavel = (propriedade.areaAgricultavel / propriedade.areaTotal) * 100;
  const percentVegetacao = (propriedade.areaVegetacao / propriedade.areaTotal) * 100;
  const percentNaoUtilizada = (areaNaoUtilizada / propriedade.areaTotal) * 100;
  
  // Dados para o gráfico de uso da terra
  const usoTerraData = [
    {
      name: 'Agricultável',
      value: propriedade.areaAgricultavel,
      color: '#4CAF50',
      percentage: percentAgricultavel
    },
    {
      name: 'Vegetação',
      value: propriedade.areaVegetacao,
      color: '#2196F3',
      percentage: percentVegetacao
    }
  ];
  
  return (
    <PageLayout>
      <PageContainer>
        <ContextHeader
          title={propriedade.nome}
          breadcrumbs={getBreadcrumbs()}
          actions={getActionButtons()}
          subtitle={getContextualInfo()}
        />
        
        <ImportedContentGrid>
          <MainContent>
            <ImportedContentSection>
              <ImportedSectionTitle>Informações Gerais</ImportedSectionTitle>
              
              <InformationCards>
                <InfoCard>
                  <InfoIcon $color="primary">
                    <FaChartBar />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Área Total</InfoLabel>
                    <InfoValue>{formatArea(propriedade.areaTotal)} hectares</InfoValue>
                  </InfoContent>
                </InfoCard>
                
                <InfoCard>
                  <InfoIcon $color="secondary">
                    <FaFlag />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Área Agricultável</InfoLabel>
                    <InfoValue>{formatArea(propriedade.areaAgricultavel)} hectares ({percentAgricultavel.toFixed(1)}%)</InfoValue>
                  </InfoContent>
                </InfoCard>
                
                <InfoCard>
                  <InfoIcon $color="success">
                    <FaLeaf />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Vegetação</InfoLabel>
                    <InfoValue>{formatArea(propriedade.areaVegetacao)} hectares ({percentVegetacao.toFixed(1)}%)</InfoValue>
                  </InfoContent>
                </InfoCard>
                
                <InfoCard>
                  <InfoIcon $color="tertiary">
                    <FaClock />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Safras</InfoLabel>
                    <InfoValue>{propriedade.safras?.length || 0}</InfoValue>
                  </InfoContent>
                </InfoCard>
              </InformationCards>
              
              <ChartContainer>
                <ProgressBarChart
                  title="Uso da Terra"
                  data={usoTerraData}
                  height={40}
                  stackedLabels={true}
                />
              </ChartContainer>
            </ImportedContentSection>
            
            <PropertyStats 
              propriedades={[propriedade]}
              title="Análise Detalhada"
            />
            
          </MainContent>
          
          <Sidebar>
            <ImportedContentSection>
              <ImportedSectionTitle>Ações</ImportedSectionTitle>
              
              <ImportedActionButtons>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => navigate(`/propriedades/${id}/safras/novo`)}
                >
                  Nova Safra
                </Button>
                
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => {}}
                >
                  Relatório
                </Button>
                
                <Button 
                  variant="text" 
                  fullWidth
                  onClick={() => {}}
                >
                  Imprimir
                </Button>
              </ImportedActionButtons>
            </ImportedContentSection>
            
            <ImportedContentSection>
              <ImportedSectionTitle>Safras</ImportedSectionTitle>
              
              {propriedade.safras && propriedade.safras.length > 0 ? (
                propriedade.safras.map((safra) => (
                  <SafraCard key={safra.id}>
                    <SafraHeader>
                      <Typography variant="h6">{safra.nome}</Typography>
                      <Badge variant="primary" size="small">
                        {safra.culturas?.length || 0} culturas
                      </Badge>
                    </SafraHeader>
                    
                    <SafraInfo>
                      <div>Período: {safra.ano}</div>
                      <div>Área Plantada: {formatArea(safra.areaHectares || 0)} hectares</div>
                    </SafraInfo>
                    
                    {safra.culturas && safra.culturas.length > 0 && (
                      <CulturasContainer>
                        {safra.culturas.map((cultura, index) => (
                          <CulturaTag key={cultura.id || index} index={index}>
                            {cultura.nome}
                          </CulturaTag>
                        ))}
                      </CulturasContainer>
                    )}
                  </SafraCard>
                ))
              ) : (
                <EmptyState>
                  <Typography>Nenhuma safra cadastrada</Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate(`/propriedades/${id}/safras/novo`)}
                    style={{ marginTop: '8px' }}
                  >
                    Adicionar Safra
                  </Button>
                </EmptyState>
              )}
            </ImportedContentSection>
          </Sidebar>
        </ImportedContentGrid>
      </PageContainer>
    </PageLayout>
  );
};

// Estilos
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ContentSection = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

const LocationTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: 100px;
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const InformationCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const InfoCard = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(to bottom, #ffffff, #f9f9f9);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

interface ColorProps {
  $color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'info' | 'warning';
}

const InfoIcon = styled.div<ColorProps>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  color: ${({ theme, $color }) => theme.colors[$color]};
  background-color: ${({ theme, $color }) => `${theme.colors[$color]}15`};
  font-size: 1.25rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InfoValue = styled.div`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const ChartContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing.md};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SafraCard = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SafraHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CulturasList = styled.div`
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const CulturaItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 0.875rem;
`;

const CulturaIcon = styled.span`
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default PropriedadeDetails; 
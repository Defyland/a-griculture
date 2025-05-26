import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spinner, Typography, Badge } from '../components/atoms';
import { PageLayout } from '../components/templates/PageLayout';
import { ActionMenu } from '../components/molecules';
import { ContextHeader } from '../components/templates';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { 
  Container,
  ContentSection,
  SectionTitle,
  LoadingContainer,
  InfoLabel,
  InfoValue,
  PropriedadeItem,
  PropriedadeHeader,
  PropriedadeInfo,
  InfoRow,
  StatsSection,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  GraphContainer,
  GraphTitle,
  ContentGrid,
  PropriedadeInfoItem,
  PropriedadeInfoLabel,
  PropriedadeInfoValue,
  LocationTag,
  DocumentoTag,
  EmptyState,
  ErrorContainer,
  ActionButtons
} from './styles/ProdutorDetails.styles';
import { fetchProdutorById } from '../store/slices/produtoresSlice';
import type { AppDispatch, RootState } from '../store';
import type { Produtor, Propriedade } from '../types';
import type { BreadcrumbItem } from './types/ProdutorDetails.types';

// Função auxiliar para obter culturas por safra
const obterCulturasPorSafra = (produtor: Produtor) => {
  if (!produtor?.propriedades) return [];
  
  const culturas: Record<string, number> = {};
  
  produtor.propriedades.forEach(prop => {
    if (prop.safras) {
      prop.safras.forEach(safra => {
        if (safra.culturas) {
          safra.culturas.forEach(cultura => {
            const nomeCultura = typeof cultura === 'string' ? cultura : cultura.nome;
            culturas[nomeCultura] = (culturas[nomeCultura] || 0) + 1;
          });
        }
      });
    }
  });
  
  return Object.entries(culturas)
    .map(([nome, quantidade]) => ({ nome, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade);
};

// Componente principal
const ProdutorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentProdutor: produtor, status, error } = useSelector((state: RootState) => state.produtores);
  const loading = status === 'loading';
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProdutorById(id));
    }
  }, [dispatch, id]);
  
  // Preparar os breadcrumbs
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/' },
      { label: 'Produtores', path: '/produtores' }
    ];
    
    if (produtor) {
      items.push({
        label: produtor.nome,
        path: `/produtores/${produtor.id}`,
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
        onClick={() => navigate(`/produtores/editar/${id}`, {
          state: { from: `/produtores/${id}` }
        })}
        rounded
        icon="✏️"
      >
        Editar
      </Button>
      <Button 
        variant="primary" 
        onClick={handleAddPropriedade}
        rounded
        icon="➕"
      >
        Adicionar Propriedade
      </Button>
    </div>
  );
  
  const handleAddPropriedade = () => {
    if (!id) return;
    navigate(`/produtores/${id}/propriedades/novo`, {
      state: { from: `/produtores/${id}` }
    });
  };
  
  // Navegação para propriedades
  const handleViewPropriedade = (propriedadeId: string) => {
    navigate(`/propriedades/${propriedadeId}`);
  };
  
  const handleEditPropriedade = (propriedadeId: string) => {
    navigate(`/propriedades/editar/${propriedadeId}`);
  };
  
  const handlePrintDocument = () => {
    window.print();
  };
  
  // Renderizar lista de propriedades
  const renderPropriedadesList = (propriedades: Propriedade[]) => {
    if (!propriedades || propriedades.length === 0) {
      return (
        <EmptyState>
          <Typography variant="h4">
            Nenhuma propriedade cadastrada
          </Typography>
          <Typography>
            Este produtor ainda não possui propriedades vinculadas.
          </Typography>
          <div style={{ marginTop: '1rem' }}>
            <Button 
              variant="primary" 
              onClick={handleAddPropriedade}
            >
              Adicionar Propriedade
            </Button>
          </div>
        </EmptyState>
      );
    }
    
    return (
      <>
        {propriedades.map(propriedade => (
          <PropriedadeItem 
            key={propriedade.id}
            onClick={() => handleViewPropriedade(propriedade.id)}
          >
            <PropriedadeHeader>
              <div>
                <Typography variant="h5" noMargin>
                  {propriedade.nome}
                </Typography>
                <LocationTag>
                  📍 {propriedade.cidade}, {propriedade.estado}
                </LocationTag>
              </div>
              
              <ActionMenu
                options={[
                  {
                    label: 'Ver detalhes',
                    icon: '👁️',
                    onClick: () => handleViewPropriedade(propriedade.id)
                  },
                  {
                    label: 'Editar',
                    icon: '✏️',
                    onClick: () => handleEditPropriedade(propriedade.id)
                  },
                  {
                    label: 'Ver safras',
                    icon: '🌱',
                    onClick: () => navigate(`/propriedades/${propriedade.id}/safras`)
                  }
                ]}
                title={`Ações - ${propriedade.nome}`}
              />
            </PropriedadeHeader>
            
            <PropriedadeInfo>
              <PropriedadeInfoItem>
                <PropriedadeInfoLabel>Área Total</PropriedadeInfoLabel>
                <PropriedadeInfoValue>
                  {propriedade.areaTotal.toLocaleString()} ha
                </PropriedadeInfoValue>
              </PropriedadeInfoItem>
              
              <PropriedadeInfoItem>
                <PropriedadeInfoLabel>Área Agricultável</PropriedadeInfoLabel>
                <PropriedadeInfoValue>
                  {propriedade.areaAgricultavel.toLocaleString()} ha
                </PropriedadeInfoValue>
              </PropriedadeInfoItem>
              
              <PropriedadeInfoItem>
                <PropriedadeInfoLabel>Vegetação</PropriedadeInfoLabel>
                <PropriedadeInfoValue>
                  {propriedade.areaVegetacao.toLocaleString()} ha
                </PropriedadeInfoValue>
              </PropriedadeInfoItem>
              
              <PropriedadeInfoItem>
                <PropriedadeInfoLabel>Safras</PropriedadeInfoLabel>
                <PropriedadeInfoValue>
                  <Badge variant="primary" size="small">
                    {propriedade.safras?.length || 0}
                  </Badge>
                </PropriedadeInfoValue>
              </PropriedadeInfoItem>
            </PropriedadeInfo>
          </PropriedadeItem>
        ))}
      </>
    );
  };
  
  // Calcular estatísticas
  const getTotalArea = (propriedades: Propriedade[]) => {
    return propriedades.reduce((acc, p) => acc + p.areaTotal, 0);
  };
  
  const getTotalSafras = (propriedades: Propriedade[]) => {
    return propriedades.reduce((acc, p) => acc + (p.safras?.length || 0), 0);
  };
  
  // Renderizar estatísticas
  const renderStatistics = (produtor: Produtor) => {
    if (!produtor.propriedades || produtor.propriedades.length === 0) {
      return null;
    }
    
    const totalArea = getTotalArea(produtor.propriedades);
    const totalSafras = getTotalSafras(produtor.propriedades);
    
    return (
      <StatsSection>
        <SectionTitle>Estatísticas</SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatValue>{produtor.propriedades.length}</StatValue>
            <StatLabel>Propriedades</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{totalArea.toLocaleString('pt-BR')}</StatValue>
            <StatLabel>Hectares</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{totalSafras}</StatValue>
            <StatLabel>Safras</StatLabel>
          </StatCard>
        </StatsGrid>
        
        {produtor.propriedades.length > 0 && (
          <GraphContainer>
            <GraphTitle>Distribuição de Áreas</GraphTitle>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={produtor.propriedades.map(prop => ({
                  nome: prop.nome.length > 15 ? prop.nome.substring(0, 12) + '...' : prop.nome,
                  "Área Agricultável": prop.areaAgricultavel,
                  "Área de Vegetação": prop.areaVegetacao
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <XAxis 
                  dataKey="nome" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={0}
                />
                <YAxis 
                  tickFormatter={(value) => `${value} ha`}
                  fontSize={12}
                />
                <Tooltip 
                  formatter={(value) => [`${value} ha`, '']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    border: 'none',
                    padding: '10px 14px',
                    fontSize: '0.9rem'
                  }}
                  labelStyle={{
                    fontWeight: 'bold',
                    marginBottom: '6px'
                  }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  wrapperStyle={{
                    paddingBottom: '10px'
                  }}
                />
                <Bar 
                  dataKey="Área Agricultável" 
                  fill="#4CAF50" 
                  radius={[4, 4, 0, 0]}
                  stackId="a"
                />
                <Bar 
                  dataKey="Área de Vegetação" 
                  fill="#2196F3" 
                  radius={[4, 4, 0, 0]}
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </GraphContainer>
        )}
        
        {totalSafras > 0 && (
          <GraphContainer>
            <GraphTitle>Culturas por Safra</GraphTitle>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={obterCulturasPorSafra(produtor).map((cultura, index) => ({
                    name: cultura.nome,
                    value: cultura.quantidade,
                    fill: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0'][index % 5]
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {obterCulturasPorSafra(produtor).map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0'][index % 5]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} plantio(s)`, name]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    border: 'none',
                    padding: '10px 14px',
                    fontSize: '0.9rem'
                  }}
                  labelStyle={{
                    fontWeight: 'bold',
                    marginBottom: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </GraphContainer>
        )}
      </StatsSection>
    );
  };
  
  if (loading) {
    return (
      <PageLayout>
        <Container>
          <LoadingContainer>
            <Spinner size="large" />
          </LoadingContainer>
        </Container>
      </PageLayout>
    );
  }
  
  if (error || !produtor) {
    return (
      <PageLayout>
        <Container>
          <ErrorContainer>
            <Typography variant="h3">
              {error || 'Produtor não encontrado'}
            </Typography>
            <Button 
              variant="primary" 
              onClick={() => navigate('/produtores')} 
              style={{ marginTop: '1rem' }}
            >
              Voltar para Produtores
            </Button>
          </ErrorContainer>
        </Container>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <Container>
        <ContextHeader
          title={produtor.nome}
          breadcrumbs={getBreadcrumbs()}
          actions={getActionButtons()}
          subtitle={
            <div style={{ marginTop: '0.5rem' }}>
              <DocumentoTag>
                {produtor.tipoDocumento}: {produtor.documentoCpfCnpj}
              </DocumentoTag>
            </div>
          }
        />
        
        <ContentGrid>
          <div>
            <ContentSection>
              <SectionTitle>
                <Typography variant="h4">
                  Propriedades
                </Typography>
                <Button 
                  variant="text" 
                  size="small"
                  onClick={handleAddPropriedade}
                >
                  + Adicionar Propriedade
                </Button>
              </SectionTitle>
              
              {renderPropriedadesList(produtor.propriedades || [])}
            </ContentSection>
          </div>
          
          <div>
            <ContentSection>
              <SectionTitle>
                <Typography variant="h4">
                  Informações do Produtor
                </Typography>
              </SectionTitle>
              
              <InfoRow>
                <InfoLabel>Nome:</InfoLabel>
                <InfoValue>{produtor.nome}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Documento:</InfoLabel>
                <InfoValue>
                  {produtor.documentoCpfCnpj}
                  <Typography variant="body2" color="secondary">
                    {produtor.tipoDocumento}
                  </Typography>
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Propriedades:</InfoLabel>
                <InfoValue>
                  <Badge variant="primary">
                    {produtor.propriedades?.length || 0}
                  </Badge>
                </InfoValue>
              </InfoRow>
              
              <ActionButtons>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/produtores/editar/${produtor.id}`)}
                >
                  Editar Produtor
                </Button>
                <Button
                  variant="text"
                  onClick={handlePrintDocument}
                >
                  Imprimir
                </Button>
              </ActionButtons>
            </ContentSection>
            
            {renderStatistics(produtor)}
          </div>
        </ContentGrid>
      </Container>
    </PageLayout>
  );
};

export default ProdutorDetails; 
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PageLayout, 
  Typography, 
  Button, 
  Spinner,
  ContextHeader
} from '../components';
import type { Safra, Propriedade, Produtor } from '../types';
import { safrasAPI, propriedadesAPI, produtoresAPI } from '../services/api';
import type { BreadcrumbItem } from './types/SafraDetails.types';
import {
  Container,
  ContentGrid,
  ContentSection,
  SectionTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  CulturasContainer,
  CulturaTag,
  StatusTag,
  PropriedadeTag,
  ProdutorTag,
  LoadingContainer,
  EmptyStateContainer,
  StatusHistory,
  StatusStep,
  StatusStepDot,
  StatusStepContent,
  StatusStepTitle,
  StatusStepDate
} from './styles/SafraDetails.styles';

const SafraDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  const [safra, setSafra] = useState<Safra | null>(null);
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);
  const [produtor, setProdutor] = useState<Produtor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('ID da safra não fornecido');
        setLoading(false);
        return;
      }
      
      try {
        // Buscar dados da safra
        const safraData = await safrasAPI.getById(id);
        
        if (!safraData) {
          setError('Safra não encontrada');
          setLoading(false);
          return;
        }
        
        setSafra(safraData);
        
        // Buscar dados da propriedade
        if (safraData.propriedadeId) {
          const propriedadeData = await propriedadesAPI.getById(safraData.propriedadeId);
          setPropriedade(propriedadeData || null);
          
          // Buscar dados do produtor
          if (propriedadeData && propriedadeData.produtorId) {
            const produtorData = await produtoresAPI.getById(propriedadeData.produtorId);
            setProdutor(produtorData || null);
          }
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
  
  const formatArea = (area?: number) => {
    if (!area) return '0 ha';
    return `${area.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ha`;
  };
  
  // Preparar os breadcrumbs
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/' },
      { label: 'Safras', path: '/safras' }
    ];
    
    if (propriedade) {
      items.push({
        label: 'Propriedades',
        path: '/propriedades'
      });
      
      if (produtor) {
        items.push({
          label: produtor.nome,
          path: `/produtores/${produtor.id}/propriedades`
        });
      }
      
      items.push({
        label: propriedade.nome,
        path: `/propriedades/${propriedade.id}`,
      });
    }
    
    if (safra) {
      items.push({
        label: safra.nome || `Safra ${safra.ano}`,
        path: `/safras/${safra.id}`,
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
        onClick={() => navigate(`/propriedades/${safra?.propriedadeId}/safras/editar/${safra?.id}`)}
        rounded
        icon="✏️"
      >
        Editar
      </Button>
      <Button 
        variant="primary" 
        onClick={() => navigate(`/propriedades/${safra?.propriedadeId}/safras`)}
        rounded
        icon="🌱"
      >
        Ver Todas Safras
      </Button>
    </div>
  );
  
  // Informações contextuais
  const getContextualInfo = () => {
    if (!safra || !propriedade) return null;
    
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
        <StatusTag status={
          safra.status === 'ATIVA' ? 'ativa' : 
          safra.status === 'CONCLUIDA' ? 'concluida' : 'planejada'
        }>
          {safra.status === 'ATIVA' ? '🟢 Ativa' : 
           safra.status === 'CONCLUIDA' ? '🔵 Concluída' : '🟠 Planejada'}
        </StatusTag>
        
        {propriedade && (
          <PropriedadeTag onClick={() => navigate(`/propriedades/${propriedade.id}`)}>
            🏡 {propriedade.nome}
          </PropriedadeTag>
        )}
        
        {produtor && (
          <ProdutorTag onClick={() => navigate(`/produtores/${produtor.id}`)}>
            👨‍🌾 {produtor.nome}
          </ProdutorTag>
        )}
      </div>
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
  
  if (error || !safra) {
    return (
      <PageLayout>
        <Container>
          <EmptyStateContainer>
            <Typography variant="h3">
              {error || 'Safra não encontrada'}
            </Typography>
            <Button 
              variant="primary" 
              onClick={() => navigate('/safras')} 
              style={{ marginTop: '1rem' }}
            >
              Voltar para Safras
            </Button>
          </EmptyStateContainer>
        </Container>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <Container>
        <ContextHeader
          title={safra.nome || `Safra ${safra.ano}`}
          breadcrumbs={getBreadcrumbs()}
          actions={getActionButtons()}
          subtitle={getContextualInfo()}
        />
        
        <ContentGrid>
          <div>
            <ContentSection>
              <SectionTitle>
                <Typography variant="h4">Informações Gerais</Typography>
              </SectionTitle>
              
              <div>
                <InfoRow>
                  <InfoLabel>Nome:</InfoLabel>
                  <InfoValue>{safra.nome || `Safra ${safra.ano}`}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Ano:</InfoLabel>
                  <InfoValue>{safra.ano}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Status:</InfoLabel>
                  <InfoValue>
                    <StatusTag status={
                      safra.status === 'ATIVA' ? 'ativa' : 
                      safra.status === 'CONCLUIDA' ? 'concluida' : 'planejada'
                    }>
                      {safra.status === 'ATIVA' ? '🟢 Ativa' : 
                       safra.status === 'CONCLUIDA' ? '🔵 Concluída' : '🟠 Planejada'}
                    </StatusTag>
                  </InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Propriedade:</InfoLabel>
                  <InfoValue>
                    {propriedade ? (
                      <PropriedadeTag onClick={() => navigate(`/propriedades/${propriedade.id}`)}>
                        {propriedade.nome}
                      </PropriedadeTag>
                    ) : 'Não definida'}
                  </InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Produtor:</InfoLabel>
                  <InfoValue>
                    {produtor ? (
                      <ProdutorTag onClick={() => navigate(`/produtores/${produtor.id}`)}>
                        {produtor.nome}
                      </ProdutorTag>
                    ) : 'Não definido'}
                  </InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Área Plantada:</InfoLabel>
                  <InfoValue>{formatArea(safra.areaPlantada)}</InfoValue>
                </InfoRow>
                
                {safra.culturas && safra.culturas.length > 0 && (
                  <InfoRow>
                    <InfoLabel>Culturas:</InfoLabel>
                    <InfoValue>
                      <CulturasContainer>
                        {safra.culturas.map((cultura, index) => (
                          <CulturaTag key={index} index={index}>
                            {typeof cultura === 'string' ? cultura : cultura.nome}
                          </CulturaTag>
                        ))}
                      </CulturasContainer>
                    </InfoValue>
                  </InfoRow>
                )}
              </div>
            </ContentSection>
            
            <ContentSection>
              <SectionTitle>
                <Typography variant="h4">Histórico de Status</Typography>
              </SectionTitle>
              
              <StatusHistory>
                <StatusStep>
                  <StatusStepDot active={true} />
                  <StatusStepContent>
                    <StatusStepTitle>Safra Planejada</StatusStepTitle>
                    <StatusStepDate>01/01/{safra.ano}</StatusStepDate>
                  </StatusStepContent>
                </StatusStep>
                
                <StatusStep>
                  <StatusStepDot active={safra.status === 'ATIVA' || safra.status === 'CONCLUIDA'} />
                  <StatusStepContent>
                    <StatusStepTitle>Safra Ativa</StatusStepTitle>
                    <StatusStepDate>
                      {safra.status === 'ATIVA' || safra.status === 'CONCLUIDA'
                        ? `15/02/${safra.ano}`
                        : 'Pendente'}
                    </StatusStepDate>
                  </StatusStepContent>
                </StatusStep>
                
                <StatusStep>
                  <StatusStepDot active={safra.status === 'CONCLUIDA'} />
                  <StatusStepContent>
                    <StatusStepTitle>Safra Concluída</StatusStepTitle>
                    <StatusStepDate>
                      {safra.status === 'CONCLUIDA'
                        ? `30/11/${safra.ano}`
                        : 'Pendente'}
                    </StatusStepDate>
                  </StatusStepContent>
                </StatusStep>
              </StatusHistory>
            </ContentSection>
          </div>
          
          <div>
            <ContentSection>
              <SectionTitle>
                <Typography variant="h4">Ações</Typography>
              </SectionTitle>
              
              <Button 
                variant="outlined" 
                fullWidth 
                style={{ marginBottom: '0.5rem' }}
                onClick={() => navigate(`/propriedades/${safra.propriedadeId}/safras/editar/${safra.id}`)}
              >
                Editar Safra
              </Button>
              
              <Button 
                variant="text" 
                fullWidth
                onClick={() => navigate(`/propriedades/${safra.propriedadeId}/safras`)}
              >
                Ver Todas as Safras
              </Button>
            </ContentSection>
          </div>
        </ContentGrid>
      </Container>
    </PageLayout>
  );
};

export default SafraDetails; 
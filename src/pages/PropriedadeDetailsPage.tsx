import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PageLayout, 
  Typography, 
  Button, 
  Spinner,
  ContextHeader
} from '../components';
import type { Propriedade, Produtor, Safra } from '../types';
import { propriedadesAPI, produtoresAPI, safrasAPI } from '../services/api';
import type { BreadcrumbItem } from './types/PropriedadeDetailsPage.types';
import {
  Container,
  ContentGrid,
  ContentSection,
  SectionTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  ProgressBar,
  ProgressFill,
  ProgressContainer,
  ProgressInfo,
  SafraItem,
  SafraHeader,
  SafraInfo,
  StatusTag,
  CulturasContainer,
  CulturaTag,
  ActionButtons,
  LoadingContainer,
  ErrorContainer,
  ProdutorTag,
  ContextualInfoContainer,
  ContextualText,
  ActionButtonsContainer,
  NoSafrasContainer,
  LegendContainer,
  LegendItem
} from './styles/PropriedadeDetailsPage.styles';

// Interface estendida para uso no componente
interface SafraExtended extends Omit<Safra, 'status'> {
  descricao?: string;
  anoInicio?: number;
  anoFim?: number;
  areaPlantada?: number;
  status: 'ATIVA' | 'CONCLUIDA' | 'PLANEJADA';
}

const PropriedadeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);
  const [produtor, setProdutor] = useState<Produtor | null>(null);
  const [safras, setSafras] = useState<SafraExtended[]>([]);
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
        // Converter para o tipo SafraExtended
        setSafras(safrasData.map(safra => ({
          ...safra,
          status: (safra.status as 'ativa' | 'concluida' | 'planejada') === 'ativa' ? 'ATIVA' : 
                 (safra.status as 'ativa' | 'concluida' | 'planejada') === 'concluida' ? 'CONCLUIDA' : 'PLANEJADA'
        })) as SafraExtended[]);
        
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
    <ActionButtonsContainer>
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
    </ActionButtonsContainer>
  );
  
  // Informações contextuais
  const getContextualInfo = (): ReactNode => {
    if (!propriedade) return undefined;
    
    return (
      <ContextualInfoContainer>
        {produtor && (
          <ProdutorTag onClick={() => navigate(`/produtores/${produtor.id}`)}>
            👨‍🌾 {produtor.nome}
          </ProdutorTag>
        )}
        <ContextualText hasProdutorTag={!!produtor}>
          {propriedade.cidade}/{propriedade.estado} • {formatArea(propriedade.areaTotal)} hectares
        </ContextualText>
      </ContextualInfoContainer>
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
  
  if (error || !propriedade) {
    return (
      <PageLayout>
        <Container>
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
        </Container>
      </PageLayout>
    );
  }
  
  // Calcular área não utilizada
  const areaNaoUtilizada = propriedade.areaTotal - propriedade.areaAgricultavel - propriedade.areaVegetacao;
  const percentAgricultavel = (propriedade.areaAgricultavel / propriedade.areaTotal) * 100;
  const percentVegetacao = (propriedade.areaVegetacao / propriedade.areaTotal) * 100;
  const percentNaoUtilizada = (areaNaoUtilizada / propriedade.areaTotal) * 100;
  
  return (
    <PageLayout>
      <Container>
        <ContextHeader
          title={propriedade.nome}
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
                  <InfoValue>{propriedade.nome}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Produtor:</InfoLabel>
                  <InfoValue>
                    {produtor ? (
                      <span 
                        style={{ cursor: 'pointer', color: '#007aff' }}
                        onClick={() => navigate(`/produtores/${produtor.id}`)}
                      >
                        {produtor.nome}
                      </span>
                    ) : 'Não definido'}
                  </InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Localização:</InfoLabel>
                  <InfoValue>{propriedade.cidade}, {propriedade.estado}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Área Total:</InfoLabel>
                  <InfoValue>{formatArea(propriedade.areaTotal)} hectares</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Área Agricultável:</InfoLabel>
                  <InfoValue>{formatArea(propriedade.areaAgricultavel)} hectares ({percentAgricultavel.toFixed(1)}%)</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Vegetação:</InfoLabel>
                  <InfoValue>{formatArea(propriedade.areaVegetacao)} hectares ({percentVegetacao.toFixed(1)}%)</InfoValue>
                </InfoRow>
                
                {areaNaoUtilizada > 0 && (
                  <InfoRow>
                    <InfoLabel>Área Não Utilizada:</InfoLabel>
                    <InfoValue>{formatArea(areaNaoUtilizada)} hectares ({percentNaoUtilizada.toFixed(1)}%)</InfoValue>
                  </InfoRow>
                )}
              </div>
              
              <ProgressContainer>
                <ProgressInfo>
                  <span>Uso da Terra</span>
                </ProgressInfo>
                <ProgressBar>
                  <ProgressFill width={percentAgricultavel} color="success" />
                  <ProgressFill width={percentVegetacao} color="primary" style={{ marginLeft: `${percentAgricultavel}%` }} />
                  {areaNaoUtilizada > 0 && (
                    <ProgressFill width={percentNaoUtilizada} color="lightText" style={{ marginLeft: `${percentAgricultavel + percentVegetacao}%` }} />
                  )}
                </ProgressBar>
                <LegendContainer>
                  <LegendItem color="agricultavel">■ Agricultável</LegendItem>
                  <LegendItem color="vegetacao">■ Vegetação</LegendItem>
                  {areaNaoUtilizada > 0 && <LegendItem color="nao-utilizada">■ Não utilizada</LegendItem>}
                </LegendContainer>
              </ProgressContainer>
            </ContentSection>
            
            <ContentSection>
              <SectionTitle>
                <Typography variant="h4">Safras</Typography>
                <Button 
                  variant="text" 
                  size="small"
                  onClick={() => navigate(`/propriedades/${id}/safras/novo`)}
                >
                  + Adicionar Safra
                </Button>
              </SectionTitle>
              
              {safras.length === 0 ? (
                <NoSafrasContainer>
                  <Typography>Nenhuma safra cadastrada para esta propriedade.</Typography>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate(`/propriedades/${id}/safras/novo`)}
                    style={{ marginTop: '1rem' }}
                  >
                    Cadastrar Primeira Safra
                  </Button>
                </NoSafrasContainer>
              ) : (
                <>
                  {safras.slice(0, 3).map((safra) => (
                    <SafraItem 
                      key={safra.id}
                      onClick={() => navigate(`/safras/${safra.id}`)}
                    >
                      <SafraHeader>
                        <Typography variant="h5" noMargin>{safra.descricao || safra.nome || `Safra ${safra.anoInicio || safra.ano}/${safra.anoFim || (safra.ano ? safra.ano + 1 : '')}`}</Typography>
                        <StatusTag status={
                          safra.status === 'ATIVA' ? 'ativa' : 
                          safra.status === 'CONCLUIDA' ? 'concluida' : 'planejada'
                        }>
                          {safra.status === 'ATIVA' ? '🟢 Ativa' : 
                           safra.status === 'CONCLUIDA' ? '🔵 Concluída' : '🟠 Planejada'}
                        </StatusTag>
                      </SafraHeader>
                      
                      <SafraInfo>
                        <div>Período: {safra.anoInicio || safra.ano} - {safra.anoFim || (safra.ano ? safra.ano + 1 : '')}</div>
                        <div>Área Plantada: {formatArea(safra.areaPlantada || safra.areaHectares || 0)} hectares</div>
                      </SafraInfo>
                      
                      {safra.culturas && safra.culturas.length > 0 && (
                        <CulturasContainer>
                          {safra.culturas.map((cultura, index) => (
                            <CulturaTag key={typeof cultura === 'string' ? cultura : cultura.id || index} index={index}>
                              {typeof cultura === 'string' ? cultura : cultura.nome}
                            </CulturaTag>
                          ))}
                        </CulturasContainer>
                      )}
                    </SafraItem>
                  ))}
                  
                  {safras.length > 3 && (
                    <ActionButtons>
                      <Button 
                        variant="text" 
                        onClick={() => navigate(`/propriedades/${id}/safras`)}
                        size="small"
                      >
                        Ver todas as safras ({safras.length})
                      </Button>
                    </ActionButtons>
                  )}
                </>
              )}
            </ContentSection>
          </div>
          
          <div>
            <ContentSection>
              <SectionTitle>
                <Typography variant="h4">Ações</Typography>
              </SectionTitle>
              
              <Button 
                variant="primary" 
                fullWidth 
                style={{ marginBottom: '0.5rem' }}
                onClick={() => navigate(`/propriedades/${id}/safras/novo`)}
              >
                Cadastrar Nova Safra
              </Button>
              
              <Button 
                variant="outlined" 
                fullWidth 
                style={{ marginBottom: '0.5rem' }}
                onClick={() => navigate(`/propriedades/editar/${id}`)}
              >
                Editar Propriedade
              </Button>
              
              <Button 
                variant="text" 
                fullWidth
                onClick={() => navigate(`/propriedades/${id}/safras`)}
              >
                Gerenciar Safras
              </Button>
            </ContentSection>
          </div>
        </ContentGrid>
      </Container>
    </PageLayout>
  );
};

export default PropriedadeDetailsPage; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PageLayout, 
  Typography, 
  Button, 
  Spinner
} from '../components';
import type { Propriedade } from '../types';
import { propriedadesAPI } from '../services/api';
import {
  Header,
  CardGrid,
  StyledCard,
  PropriedadeInfo,
  LocationTag,
  AreaInfo,
  SafrasCount,
  ActionButtons,
  EmptyStateContainer,
  LoadingContainer
} from './styles/SelecionarPropriedade.styles';

const SelecionarPropriedade: React.FC = () => {
  const navigate = useNavigate();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPropriedade, setSelectedPropriedade] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropriedades = async () => {
      setLoading(true);
      try {
        const data = await propriedadesAPI.getAll();
        setPropriedades(data);
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
        setError('Erro ao carregar propriedades. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPropriedades();
  }, []);

  const handlePropriedadeSelect = (propriedadeId: string) => {
    setSelectedPropriedade(propriedadeId);
  };

  const handleContinuar = () => {
    if (selectedPropriedade) {
      navigate(`/propriedades/${selectedPropriedade}/safras/novo`);
    }
  };

  const handleCancel = () => {
    navigate('/safras');
  };

  const handleNovaPropriedadeClick = () => {
    navigate('/propriedades/selecionar-produtor');
  };

  if (loading) {
    return (
      <PageLayout>
        <LoadingContainer>
          <Spinner size="large" />
        </LoadingContainer>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <EmptyStateContainer>
          <Typography variant="h4" color="danger">Erro ao carregar dados</Typography>
          <Typography>{error}</Typography>
          <Button variant="primary" onClick={() => window.location.reload()} style={{ marginTop: '1rem' }}>
            Tentar novamente
          </Button>
        </EmptyStateContainer>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Header>
        <Typography variant="h2">Selecione uma Propriedade para a Nova Safra</Typography>
        <Button variant="primary" onClick={handleNovaPropriedadeClick}>
          Cadastrar Nova Propriedade
        </Button>
      </Header>

      {propriedades.length === 0 ? (
        <EmptyStateContainer>
          <Typography variant="h4">Nenhuma propriedade cadastrada</Typography>
          <Typography>
            É necessário cadastrar uma propriedade antes de criar uma safra
          </Typography>
          <Button variant="primary" onClick={handleNovaPropriedadeClick} style={{ marginTop: '1rem' }}>
            Cadastrar Nova Propriedade
          </Button>
        </EmptyStateContainer>
      ) : (
        <>
          <Typography>
            Selecione uma propriedade rural para associar à nova safra:
          </Typography>
          
          <div style={{ margin: '1.5rem 0' }}>
            <CardGrid>
              {propriedades.map((propriedade) => (
                <StyledCard 
                  key={propriedade.id} 
                  selected={selectedPropriedade === propriedade.id}
                  onClick={() => handlePropriedadeSelect(propriedade.id)}
                >
                  <PropriedadeInfo>
                    <Typography variant="h4" noMargin>{propriedade.nome}</Typography>
                    <LocationTag>
                      {propriedade.cidade}/{propriedade.estado}
                    </LocationTag>
                    <AreaInfo>
                      Área Total: {propriedade.areaTotal.toLocaleString('pt-BR')} hectares
                    </AreaInfo>
                    <AreaInfo>
                      Área Agricultável: {propriedade.areaAgricultavel.toLocaleString('pt-BR')} hectares
                    </AreaInfo>
                    <SafrasCount>
                      {propriedade.safras.length} safra(s) cadastrada(s)
                    </SafrasCount>
                  </PropriedadeInfo>
                </StyledCard>
              ))}
            </CardGrid>
          </div>

          <ActionButtons>
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleContinuar}
              disabled={!selectedPropriedade}
            >
              Continuar
            </Button>
          </ActionButtons>
        </>
      )}
    </PageLayout>
  );
};

export default SelecionarPropriedade; 
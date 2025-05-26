import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PageLayout, 
  Typography, 
  Button, 
  Spinner
} from '../components';
import type { Produtor } from '../types';
import { produtoresAPI } from '../services/api';
import {
  Header,
  CardGrid,
  StyledCard,
  ProdutorInfo,
  DocumentoTag,
  PropriedadesCount,
  ActionButtons,
  EmptyStateContainer,
  LoadingContainer
} from './styles/SelecionarProdutor.styles';

const SelecionarProdutor: React.FC = () => {
  const navigate = useNavigate();
  const [produtores, setProdutores] = useState<Produtor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProdutor, setSelectedProdutor] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutores = async () => {
      setLoading(true);
      try {
        const data = await produtoresAPI.getAll();
        setProdutores(data);
      } catch (error) {
        console.error('Erro ao carregar produtores:', error);
        setError('Erro ao carregar produtores. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProdutores();
  }, []);

  const handleProdutorSelect = (produtorId: string) => {
    setSelectedProdutor(produtorId);
  };

  const handleContinuar = () => {
    if (selectedProdutor) {
      navigate(`/produtores/${selectedProdutor}/propriedades/novo`);
    }
  };

  const handleCancel = () => {
    navigate('/propriedades');
  };

  const handleNovoProdutorClick = () => {
    navigate('/produtores/novo', {
      state: { from: '/propriedades/selecionar-produtor' }
    });
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
        <Typography variant="h2">Selecione um Produtor para a Nova Propriedade</Typography>
        <Button variant="primary" onClick={handleNovoProdutorClick}>
          Cadastrar Novo Produtor
        </Button>
      </Header>

      {produtores.length === 0 ? (
        <EmptyStateContainer>
          <Typography variant="h4">Nenhum produtor cadastrado</Typography>
          <Typography>
            É necessário cadastrar um produtor antes de criar uma propriedade
          </Typography>
          <Button variant="primary" onClick={handleNovoProdutorClick} style={{ marginTop: '1rem' }}>
            Cadastrar Novo Produtor
          </Button>
        </EmptyStateContainer>
      ) : (
        <>
          <Typography>
            Selecione um produtor rural para associar à nova propriedade:
          </Typography>
          
          <div style={{ margin: '1.5rem 0' }}>
            <CardGrid>
              {produtores.map((produtor) => (
                <StyledCard 
                  key={produtor.id} 
                  selected={selectedProdutor === produtor.id}
                  onClick={() => handleProdutorSelect(produtor.id)}
                >
                  <ProdutorInfo>
                    <Typography variant="h4" noMargin>{produtor.nome}</Typography>
                    <DocumentoTag>
                      {produtor.tipoDocumento}: {produtor.documentoCpfCnpj}
                    </DocumentoTag>
                    <PropriedadesCount>
                      {produtor.propriedades.length} propriedade(s) cadastrada(s)
                    </PropriedadesCount>
                  </ProdutorInfo>
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
              disabled={!selectedProdutor}
            >
              Continuar
            </Button>
          </ActionButtons>
        </>
      )}
    </PageLayout>
  );
};

export default SelecionarProdutor; 
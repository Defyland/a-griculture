import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  PageLayout, 
  Typography, 
  Button, 
  Spinner, 
  Modal,
  ModalFooterActions,
  ActionMenu,
  FilterSearchBar,
  DataTable
} from '../components';
import { fetchPropriedades, deletePropriedade } from '../store/slices/propriedadesSlice';
import type { AppDispatch, RootState } from '../store';
import type { Propriedade } from '../types';
import { useSorting, useFilter, usePagination } from '../hooks';
import type { PropertyTableRow } from './types/PropriadadesList.types';
import {
  Header,
  EmptyStateContainer,
  LoadingContainer,
  CardGrid,
  PropertyCard,
  PropertyHeader,
  PropertyName,
  LocationTag,
  AreaInfo,
  AreaItem,
  AreaLabel,
  AreaValue,
  CardActions,
  PaginationContainer,
  PageButton
} from './styles/PropriadadesList.styles';

// Componente principal
const PropriedadesList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { items: propriedades, status, error } = useSelector((state: RootState) => state.propriedades);
  const loading = status === 'loading';
  
  const [propriedadeToDelete, setPropriedadeToDelete] = useState<Propriedade | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Estado para busca e visualização
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  
  // Hooks para ordenação, filtragem e paginação
  const { sortField, sortDirection, sortedData, handleSort } = useSorting(
    propriedades, 
    'nome', 
    'asc'
  );
  
  const { filteredData } = useFilter(
    sortedData,
    {
      initialFilterTerm: searchTerm,
      searchFields: ['nome', 'cidade', 'estado']
    }
  );
  
  const { 
    paginatedData, 
    currentPage, 
    pageSize, 
    totalPages, 
    goToPage, 
    nextPage, 
    previousPage, 
    setPageSize 
  } = usePagination(filteredData, { initialPageSize: 10 });
  
  useEffect(() => {
    dispatch(fetchPropriedades());
  }, [dispatch]);
  
  const handleAddPropriedade = () => {
    navigate('/propriedades/novo');
  };
  
  const handleEditPropriedade = (id: string) => {
    navigate(`/propriedades/editar/${id}`);
  };
  
  const handleDeleteClick = (propriedade: Propriedade) => {
    setPropriedadeToDelete(propriedade);
    setDeleteModalOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!propriedadeToDelete) return;
    
    setIsDeleting(true);
    try {
      await dispatch(deletePropriedade(propriedadeToDelete.id)).unwrap();
      setDeleteModalOpen(false);
    } catch (err) {
      console.error('Erro ao excluir propriedade:', err);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleViewPropriedade = (id: string) => {
    navigate(`/propriedades/${id}`);
  };
  
  const handleAddSafra = (propriedadeId: string) => {
    navigate(`/propriedades/${propriedadeId}/safras/novo`);
  };
  
  const renderContent = () => {
    if (loading && propriedades.length === 0) {
      return (
        <LoadingContainer>
          <Spinner size="large" />
        </LoadingContainer>
      );
    }
    
    if (status === 'failed') {
      return (
        <EmptyStateContainer>
          <Typography variant="h4" color="danger">
            Erro ao carregar dados
          </Typography>
          <Typography>
            {error || 'Ocorreu um erro ao carregar as propriedades.'}
          </Typography>
          <Button 
            variant="primary" 
            onClick={() => dispatch(fetchPropriedades())}
            style={{ marginTop: '1rem' }}
          >
            Tentar novamente
          </Button>
        </EmptyStateContainer>
      );
    }
    
    if (propriedades.length === 0) {
      return (
        <EmptyStateContainer>
          <Typography variant="h4">
            Nenhuma propriedade cadastrada
          </Typography>
          <Typography>
            Cadastre a primeira propriedade para começar a gerenciar suas safras
          </Typography>
          <Button 
            variant="primary" 
            onClick={handleAddPropriedade}
            style={{ marginTop: '1rem' }}
          >
            Cadastrar Propriedade
          </Button>
        </EmptyStateContainer>
      );
    }
    
    if (viewMode === 'grid') {
      return (
        <CardGrid>
          {paginatedData.map((propriedade) => (
            <PropertyCard key={propriedade.id}>
              <PropertyHeader>
                <div>
                  <PropertyName 
                    variant="h5"
                    onClick={() => handleViewPropriedade(propriedade.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {propriedade.nome}
                  </PropertyName>
                  <LocationTag>
                    {propriedade.cidade}, {propriedade.estado}
                  </LocationTag>
                </div>
                <ActionMenu
                  actions={[
                    {
                      label: 'Editar',
                      icon: '✏️',
                      onClick: () => handleEditPropriedade(propriedade.id)
                    },
                    {
                      label: 'Excluir',
                      icon: '🗑️',
                      onClick: () => handleDeleteClick(propriedade),
                      isDanger: true
                    }
                  ]}
                />
              </PropertyHeader>
              
              <AreaInfo>
                <AreaItem>
                  <AreaLabel>Área total</AreaLabel>
                  <AreaValue>
                    {propriedade.areaTotal?.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 1, 
                      maximumFractionDigits: 1 
                    })} hectares
                  </AreaValue>
                </AreaItem>
                <AreaItem>
                  <AreaLabel>Área agricultável</AreaLabel>
                  <AreaValue>
                    {propriedade.areaAgricultavel?.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 1, 
                      maximumFractionDigits: 1 
                    })} hectares
                  </AreaValue>
                </AreaItem>
              </AreaInfo>
              
              <CardActions>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleViewPropriedade(propriedade.id)}
                >
                  Ver detalhes
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => handleAddSafra(propriedade.id)}
                >
                  Nova safra
                </Button>
              </CardActions>
            </PropertyCard>
          ))}
        </CardGrid>
      );
    }
    
    // Modo tabela
    return (
      <DataTable<PropertyTableRow>
        columns={[
          { key: 'nome', header: 'Nome', sortable: true },
          { key: 'localizacao', header: 'Localização', sortable: true },
          { key: 'areaTotal', header: 'Área Total (ha)', sortable: true },
          { key: 'acoes', header: 'Ações', align: 'right' }
        ]}
        data={paginatedData.map((propriedade) => ({
          id: propriedade.id,
          nome: (
            <span 
              style={{ cursor: 'pointer', fontWeight: 500 }}
              onClick={() => handleViewPropriedade(propriedade.id)}
            >
              {propriedade.nome}
            </span>
          ),
          localizacao: `${propriedade.cidade}, ${propriedade.estado}`,
          areaTotal: propriedade.areaTotal?.toLocaleString('pt-BR', { 
            minimumFractionDigits: 1, 
            maximumFractionDigits: 1 
          }),
          acoes: (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button
                variant="icon"
                onClick={() => handleViewPropriedade(propriedade.id)}
                title="Ver detalhes"
              >
                👁️
              </Button>
              <Button
                variant="icon"
                onClick={() => handleEditPropriedade(propriedade.id)}
                title="Editar"
              >
                ✏️
              </Button>
              <Button
                variant="icon"
                onClick={() => handleDeleteClick(propriedade)}
                title="Excluir"
              >
                🗑️
              </Button>
            </div>
          )
        }))}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        isLoading={loading}
      />
    );
  };
  
  // Renderizar paginação
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <PaginationContainer>
        <PageButton
          variant="text"
          disabled={currentPage === 1}
          onClick={previousPage}
        >
          &lt;
        </PageButton>
        
        {Array.from({ length: totalPages }).map((_, index) => (
          <PageButton
            key={index}
            $active={currentPage === index + 1}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
        
        <PageButton
          variant="text"
          disabled={currentPage === totalPages}
          onClick={nextPage}
        >
          &gt;
        </PageButton>
      </PaginationContainer>
    );
  };
  
  return (
    <PageLayout>
      <Header>
        <div>
          <Typography variant="h2">Propriedades</Typography>
          <Typography variant="body1" color="secondary">
            Visualize e gerencie suas propriedades rurais
          </Typography>
        </div>
        <Button variant="primary" onClick={handleAddPropriedade} icon="🏡">
          Nova Propriedade
        </Button>
      </Header>
      
      <FilterSearchBar
        searchPlaceholder="Pesquisar propriedades..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewOptions={[
          { id: 'grid', label: 'Cards', icon: '🗂️' },
          { id: 'table', label: 'Tabela', icon: '📋' }
        ]}
        currentView={viewMode}
        onViewChange={(view: string) => setViewMode(view as 'grid' | 'table')}
        sortOptions={[
          { field: 'nome', label: 'Nome' },
          { field: 'estado', label: 'Estado' },
          { field: 'areaTotal', label: 'Área' }
        ]}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSort}
      />
      
      {renderContent()}
      {renderPagination()}
      
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Excluir Propriedade"
      >
        <Typography>
          Tem certeza que deseja excluir a propriedade <strong>{propriedadeToDelete?.nome}</strong>?
        </Typography>
        <Typography variant="body2" color="danger" style={{ marginTop: '0.5rem' }}>
          Esta ação não poderá ser desfeita. Todas as safras associadas a esta propriedade também serão excluídas.
        </Typography>
        <ModalFooterActions>
          <Button
            variant="text"
            onClick={() => setDeleteModalOpen(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            isLoading={isDeleting}
          >
            Excluir
          </Button>
        </ModalFooterActions>
      </Modal>
    </PageLayout>
  );
};

export default PropriedadesList; 
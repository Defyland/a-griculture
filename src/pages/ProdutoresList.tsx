import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Spinner } from '../components/atoms';
import { PageLayout } from '../components/templates/PageLayout';
import { 
  DataTable,
  Modal,
  ModalFooterActions,
  EntityCard,
  PageHeader,
  SearchBar,
  ActionMenu
} from '../components/molecules';
import { EntityCardGrid } from '../components/atoms';
import { fetchProdutores, deleteProdutor } from '../store/slices/produtoresSlice';
import type { AppDispatch, RootState } from '../store';
import type { Produtor } from '../types';
import {
  EmptyStateContainer,
  LoadingContainer,
  PropertyDetail,
  DetailLabel,
  DetailValue,
  ErrorText
} from './styles/ProdutoresList.styles';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Interface para os dados da tabela que implementa Record<string, ReactNode>
interface ProdutorTableData extends Record<string, ReactNode> {
  id: string;
  nome: ReactNode;
  documento: string;
  acoes: ReactNode;
}

const ProdutoresList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { items: produtores, status, error } = useSelector((state: RootState) => state.produtores);
  const loading = status === 'loading';
  
  const [produtorToDelete, setProdutorToDelete] = useState<Produtor | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Estado para busca e ordenação
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoDocumentoFiltro, setTipoDocumentoFiltro] = useState('');
  const [sortField, setSortField] = useState('nome');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Adicionar estado para controlar o modo de exibição
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  
  useEffect(() => {
    dispatch(fetchProdutores());
  }, [dispatch]);
  
  const handleAddProdutor = () => {
    navigate('/produtores/novo');
  };
  
  const handleEditProdutor = (id: string) => {
    navigate(`/produtores/editar/${id}`);
  };
  
  const handleDeleteClick = (produtor: Produtor) => {
    setProdutorToDelete(produtor);
    setDeleteModalOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!produtorToDelete) return;
    
    setIsDeleting(true);
    try {
      await dispatch(deleteProdutor(produtorToDelete.id)).unwrap();
      setDeleteModalOpen(false);
    } catch (err) {
      console.error('Erro ao excluir produtor:', err);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleViewProdutor = (id: string) => {
    navigate(`/produtores/${id}`);
  };
  
  const handleViewPropriedades = (id: string) => {
    navigate(`/produtores/${id}/propriedades`);
  };
  
  const handleAddPropriedade = (produtorId: string) => {
    navigate(`/produtores/${produtorId}/propriedades/novo`);
  };
  
  // Função para alternar a direção do ordenamento
  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filtrar e ordenar produtores
  const filteredAndSortedProdutores = produtores
    .filter(produtor => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        produtor.nome.toLowerCase().includes(searchLower) ||
        produtor.documentoCpfCnpj.includes(searchTerm)
      );
    })
    .filter(produtor => {
      // Filtre par type de document
      if (!tipoDocumentoFiltro) return true;
      return produtor.tipoDocumento === tipoDocumentoFiltro;
    })
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      
      if (sortField === 'nome') {
        return a.nome.localeCompare(b.nome) * modifier;
      } else if (sortField === 'documento') {
        return a.documentoCpfCnpj.localeCompare(b.documentoCpfCnpj) * modifier;
      }
      
      return 0;
    });
  
  const renderContent = () => {
    if (loading && produtores.length === 0) {
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
            {error || 'Ocorreu um erro ao carregar os produtores.'}
          </Typography>
          <Button 
            variant="primary" 
            onClick={() => dispatch(fetchProdutores())}
            style={{ marginTop: '1rem' }}
          >
            Tentar novamente
          </Button>
        </EmptyStateContainer>
      );
    }
    
    if (produtores.length === 0) {
      return (
        <EmptyStateContainer>
          <Typography variant="h4">
            Nenhum produtor cadastrado
          </Typography>
          <Typography>
            Cadastre o primeiro produtor para começar a gerenciar propriedades e safras
          </Typography>
          <Button 
            variant="primary" 
            onClick={handleAddProdutor}
            style={{ marginTop: '1rem' }}
          >
            Cadastrar Produtor
          </Button>
        </EmptyStateContainer>
      );
    }

    if (filteredAndSortedProdutores.length === 0) {
      return (
        <EmptyStateContainer>
          <Typography variant="h4">
            Nenhum produtor encontrado
          </Typography>
          <Typography>
            Tente ajustar os termos da pesquisa
          </Typography>
          <Button
            variant="text"
            onClick={() => setSearchTerm('')}
            style={{ marginTop: '1rem' }}
          >
            Limpar filtros
          </Button>
        </EmptyStateContainer>
      );
    }
    
    if (viewMode === 'grid') {
      return (
        <EntityCardGrid>
          {filteredAndSortedProdutores.map(produtor => (
            <EntityCard
              key={produtor.id}
              id={produtor.id}
              title={produtor.nome}
              onClick={() => handleViewProdutor(produtor.id)}
              actions={{
                menuOptions: [
                  { 
                    label: 'Ver detalhes', 
                    onClick: () => handleViewProdutor(produtor.id)
                  },
                  { 
                    label: 'Ver propriedades', 
                    onClick: () => handleViewPropriedades(produtor.id)
                  },
                  { 
                    label: 'Adicionar propriedade', 
                    onClick: () => handleAddPropriedade(produtor.id)
                  },
                  { 
                    label: 'Editar', 
                    onClick: () => handleEditProdutor(produtor.id)
                  },
                  { 
                    label: 'Excluir', 
                    onClick: () => handleDeleteClick(produtor),
                    isDanger: true
                  }
                ]
              }}
              mainContent={
                <>
                  <PropertyDetail>
                    <DetailLabel>Documento:</DetailLabel>
                    <DetailValue>
                      {produtor.tipoDocumento === 'CPF' ? 'CPF: ' : 'CNPJ: '}
                      {produtor.documentoCpfCnpj}
                    </DetailValue>
                  </PropertyDetail>
                  
                  <PropertyDetail>
                    <DetailLabel>Propriedades:</DetailLabel>
                    <DetailValue>
                      {produtor.propriedades?.length || 0} propriedade(s)
                    </DetailValue>
                  </PropertyDetail>
                </>
              }
              chartContent={
                produtor.propriedades && produtor.propriedades.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <linearGradient id="propriedadesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#2E7D32" stopOpacity={1}/>
                        </linearGradient>
                        <filter id="shadow">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      <Pie
                        data={[
                          { 
                            name: 'Propriedades', 
                            value: produtor.propriedades.length,
                            fill: 'url(#propriedadesGradient)' 
                          },
                          { 
                            name: 'Vazio', 
                            value: Math.max(1, Math.min(5, 5 - produtor.propriedades.length)),
                            fill: '#f0f0f0' 
                          }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={38}
                        outerRadius={65}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                        filter="url(#shadow)"
                      >
                        <Cell fill="url(#propriedadesGradient)" strokeWidth={0} />
                        <Cell fill="#f0f0f0" strokeWidth={0} opacity={0.7} />
                      </Pie>
                      <text
                        x="50%"
                        y="45%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#333333"
                        fontSize={24}
                        fontWeight="bold"
                      >
                        {produtor.propriedades.length}
                      </text>
                      <text
                        x="50%"
                        y="65%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#666666"
                        fontSize={12}
                      >
                        {produtor.propriedades.length === 1 ? 'propriedade' : 'propriedades'}
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                ) : null
              }
            />
          ))}
        </EntityCardGrid>
      );
    }
    
    // Modo tabela
    return (
      <DataTable<ProdutorTableData>
        columns={[
          { key: 'nome', header: 'Nome', sortable: true },
          { key: 'documento', header: 'Documento', sortable: true },
          { key: 'acoes', header: 'Ações' }
        ]}
        data={filteredAndSortedProdutores.map(produtor => ({
          id: produtor.id,
          nome: (
            <span 
              style={{ cursor: 'pointer', fontWeight: 500 }}
              onClick={() => handleViewProdutor(produtor.id)}
            >
              {produtor.nome}
            </span>
          ),
          documento: `${produtor.tipoDocumento}: ${produtor.documentoCpfCnpj}`,
          acoes: (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ActionMenu
                options={[
                  { 
                    label: 'Ver detalhes', 
                    icon: '👁️',
                    onClick: () => handleViewProdutor(produtor.id)
                  },
                  { 
                    label: 'Ver propriedades', 
                    icon: '🏡',
                    onClick: () => handleViewPropriedades(produtor.id)
                  },
                  { 
                    label: 'Adicionar propriedade', 
                    icon: '➕',
                    onClick: () => handleAddPropriedade(produtor.id)
                  },
                  { 
                    label: 'Editar', 
                    icon: '✏️',
                    onClick: () => handleEditProdutor(produtor.id)
                  },
                  { 
                    label: 'Excluir', 
                    icon: '🗑️',
                    onClick: () => handleDeleteClick(produtor),
                    isDanger: true
                  }
                ]}
                title={`Ações - ${produtor.nome}`}
              />
            </div>
          )
        }))}
        keyExtractor={(item) => item.id}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSortChange}
      />
    );
  };
  
  return (
    <PageLayout>
      <PageHeader 
        title="Produtores"
        subtitle="Visualize e gerencie os produtores rurais"
        actionButton={{
          label: "Novo Produtor",
          onClick: handleAddProdutor,
          icon: "👨‍🌾"
        }}
        refreshButton={{
          onClick: () => dispatch(fetchProdutores())
        }}
      />
      
      <SearchBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Pesquisar produtores..."
        onClearSearch={() => setSearchTerm('')}
        viewOptions={[
          {
            icon: '🗂️',
            label: 'Cards',
            isActive: viewMode === 'grid',
            onClick: () => setViewMode('grid')
          },
          {
            icon: '📋',
            label: 'Tabela',
            isActive: viewMode === 'table',
            onClick: () => setViewMode('table')
          }
        ]}
        filters={[
          {
            label: 'Tipo de Documento',
            options: [
              { value: '', label: 'Todos os tipos' },
              { value: 'CPF', label: 'CPF' },
              { value: 'CNPJ', label: 'CNPJ' }
            ],
            value: tipoDocumentoFiltro,
            onChange: (value) => setTipoDocumentoFiltro(value)
          }
        ]}
      />
      
      {renderContent()}
      
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Excluir Produtor"
      >
        <Typography>
          Tem certeza que deseja excluir o produtor <strong>{produtorToDelete?.nome}</strong>?
        </Typography>
        <ErrorText>
          Esta ação não poderá ser desfeita. Todas as propriedades e safras associadas a este produtor também serão excluídas.
        </ErrorText>
        <ModalFooterActions
          onCancel={() => setDeleteModalOpen(false)}
          cancelText="Cancelar"
          confirmText="Excluir"
          onConfirm={handleDeleteConfirm}
          isConfirmLoading={isDeleting}
          isConfirmDisabled={isDeleting}
        />
      </Modal>
    </PageLayout>
  );
};

export default ProdutoresList; 
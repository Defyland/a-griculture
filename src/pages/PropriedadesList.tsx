import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Button, Spinner, EntityCardGrid } from '../components/atoms';
import { PageLayout } from '../components/templates/PageLayout';
import { 
  EntityCard,
  PageHeader, 
  SearchBar,
  ActionMenu,
  DataTable,
  ConfirmDeleteModal
} from '../components/molecules';
import type { Produtor, Propriedade } from '../types';
import { produtoresAPI, propriedadesAPI } from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  PropertyDetail,
  DetailLabel,
  DetailValue,
  PropriedadeTag,
  AreaBadge,
  EmptyStateContainer,
  LoadingContainer,
} from './styles/PropriedadesList.styles';
import type { 
  ViewMode, 
  SortField, 
  SortDirection 
} from './types/PropriedadesList.types';
import { deletePropriedade } from '../store/slices/propriedadesSlice';
import type { AppDispatch } from '../store';

const PropriedadesList: React.FC = () => {
  const { produtorId } = useParams<{ produtorId?: string }>();
  const navigate = useNavigate();
  
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [produtor, setProdutor] = useState<Produtor | null>(null);
  const [produtores, setProdutores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propriedadeToDelete, setPropriedadeToDelete] = useState<Propriedade | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Estado para controlar o modo de exibição
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  // Estados para pesquisa e ordenação
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('nome');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filtroEstado, setFiltroEstado] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async (showRefreshing = false) => {
    if (showRefreshing) {
      // Pode ser implementado um indicador de atualização no futuro
    } else {
      setLoading(true);
    }
    
    try {
      if (produtorId) {
        // Buscar dados específicos do produtor
        const produtorData = await produtoresAPI.getById(produtorId);
        setProdutor(produtorData || null);
        
        // Buscar propriedades do produtor
        const props = await propriedadesAPI.getByProdutor(produtorId);
        setPropriedades(props);
      } else {
        // Buscar todas as propriedades
        const todasPropriedades = await propriedadesAPI.getAll();
        setPropriedades(todasPropriedades);
        
        // Buscar nomes de todos os produtores para exibir
        const todosProdutores = await produtoresAPI.getAll();
        const produtoresMap: Record<string, string> = {};
        todosProdutores.forEach(p => {
          produtoresMap[p.id] = p.nome;
        });
        setProdutores(produtoresMap);
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produtorId]);

  const handleRefresh = () => {
    fetchData(true);
  };

  const handleAddPropriedade = () => {
    if (produtorId) {
      navigate(`/produtores/${produtorId}/propriedades/novo`);
    } else {
      // Redirecionar para a tela de seleção de produtor
      navigate('/propriedades/selecionar-produtor');
    }
  };

  const handleEditPropriedade = (id: string) => {
    const currentPath = produtorId ? `/produtores/${produtorId}/propriedades` : '/propriedades';
    
    if (produtorId) {
      navigate(`/produtores/${produtorId}/propriedades/editar/${id}`, {
        state: { from: currentPath }
      });
    } else {
      // Se não estamos visualizando por produtor, precisamos obter o produtorId da propriedade
      const propriedade = propriedades.find(p => p.id === id);
      if (propriedade && propriedade.produtorId) {
        navigate(`/produtores/${propriedade.produtorId}/propriedades/editar/${id}`, {
          state: { from: currentPath }
        });
      } else {
        navigate(`/propriedades/editar/${id}`, {
          state: { from: currentPath }
        });
      }
    }
  };
  
  const handleVerSafras = (propriedadeId: string) => {
    navigate(`/propriedades/${propriedadeId}/safras`);
  };

  const handleDeleteClick = (propriedade: Propriedade) => {
    setPropriedadeToDelete(propriedade);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propriedadeToDelete) return;
    
    setIsDeleting(true);
    try {
      await dispatch(deletePropriedade({ 
        id: propriedadeToDelete.id, 
        produtorId: propriedadeToDelete.produtorId 
      })).unwrap();
      
      // Atualizar a lista de propriedades removendo a propriedade excluída
      setPropriedades(prev => prev.filter(p => p.id !== propriedadeToDelete.id));
      setDeleteModalOpen(false);
      setPropriedadeToDelete(null);
    } catch (err) {
      console.error('Erro ao excluir propriedade:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatArea = (area: number) => {
    return `${area.toLocaleString('pt-BR')} ha`;
  };

  const handleVerDetalhes = (id: string) => {
    navigate(`/propriedades/${id}`);
  };

  // Função para filtrar e ordenar propriedades
  const filteredAndSortedPropriedades = propriedades
    .filter(propriedade => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        propriedade.nome.toLowerCase().includes(searchLower) ||
        propriedade.cidade.toLowerCase().includes(searchLower) ||
        propriedade.estado.toLowerCase().includes(searchLower) ||
        (produtores[propriedade.produtorId] && produtores[propriedade.produtorId].toLowerCase().includes(searchLower))
      );
    })
    .filter(propriedade => {
      // Filtro por estado
      if (!filtroEstado) return true;
      return propriedade.estado === filtroEstado;
    })
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      
      if (sortField === 'nome') {
        return a.nome.localeCompare(b.nome) * modifier;
      } else { // areaTotal
        return (a.areaTotal - b.areaTotal) * modifier;
      }
    });
    
  // Função para alternar a direção do ordenamento
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Obter lista única de estados para o filtro
  const estadosDisponiveis = Array.from(new Set(propriedades.map(p => p.estado))).sort();

  return (
    <PageLayout>
      <PageHeader 
        title={produtor ? `Propriedades de ${produtor.nome}` : 'Propriedades'}
        subtitle={produtor 
          ? `Gerenciamento de propriedades rurais de ${produtor.nome}`
          : 'Gerenciamento de todas as propriedades rurais cadastradas'
        }
        actionButton={{
          label: 'Nova Propriedade',
          onClick: handleAddPropriedade,
          icon: '➕'
        }}
        refreshButton={{
          onClick: handleRefresh
        }}
      />

      {loading && propriedades.length === 0 ? (
        <LoadingContainer>
          <Spinner size="large" />
        </LoadingContainer>
      ) : error ? (
        <EmptyStateContainer>
          <Typography variant="h4" color="danger">
            Erro ao carregar dados
          </Typography>
          <Typography>
            {error}
          </Typography>
          <Button 
            variant="primary" 
            onClick={handleRefresh}
            style={{ marginTop: '1rem' }}
          >
            Tentar novamente
          </Button>
        </EmptyStateContainer>
      ) : propriedades.length === 0 ? (
        <EmptyStateContainer>
          <Typography variant="h4">
            Nenhuma propriedade encontrada
          </Typography>
          <Typography>
            {produtorId 
              ? `Cadastre a primeira propriedade para ${produtor?.nome}` 
              : 'Cadastre a primeira propriedade'}
          </Typography>
          <Button 
            variant="primary" 
            onClick={handleAddPropriedade}
            style={{ marginTop: '1rem' }}
          >
            Cadastrar Propriedade
          </Button>
        </EmptyStateContainer>
      ) : (
        <>
          <SearchBar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Pesquisar propriedades..."
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
                label: 'Estado',
                options: [
                  ...estadosDisponiveis.map(estado => ({ value: estado, label: estado }))
                ],
                value: filtroEstado,
                onChange: (value) => setFiltroEstado(value)
              }
            ]}
          />
          
          {filteredAndSortedPropriedades.length === 0 ? (
            <EmptyStateContainer>
              <Typography variant="h4">
                Nenhuma propriedade encontrada
              </Typography>
              <Typography>
                Tente ajustar os termos da sua pesquisa
              </Typography>
              <Button 
                variant="text" 
                onClick={() => {
                  setSearchTerm('');
                  setFiltroEstado('');
                }}
                style={{ marginTop: '1rem' }}
              >
                Limpar filtros
              </Button>
            </EmptyStateContainer>
          ) : viewMode === 'grid' ? (
            <EntityCardGrid>
              {filteredAndSortedPropriedades.map(propriedade => (
                <EntityCard
                  key={propriedade.id}
                  id={propriedade.id}
                  title={propriedade.nome}
                  onClick={() => handleVerDetalhes(propriedade.id)}
                  actions={{
                    menuOptions: [
                      {
                        label: 'Ver detalhes',
                        icon: '👁️',
                        onClick: () => handleVerDetalhes(propriedade.id)
                      },
                      {
                        label: 'Editar',
                        icon: '✏️',
                        onClick: () => handleEditPropriedade(propriedade.id)
                      },
                      {
                        label: 'Ver safras',
                        icon: '🌱',
                        onClick: () => handleVerSafras(propriedade.id)
                      },
                      {
                        label: 'Excluir',
                        icon: '🗑️',
                        onClick: () => handleDeleteClick(propriedade),
                        isDanger: true
                      }
                    ]
                  }}
                  mainContent={
                    <>
                      <PropertyDetail>
                        <DetailLabel>Localização:</DetailLabel>
                        <DetailValue>{propriedade.cidade}/{propriedade.estado}</DetailValue>
                      </PropertyDetail>
                      
                      {!produtorId && propriedade.produtorId && (
                        <PropertyDetail>
                          <DetailLabel>Produtor:</DetailLabel>
                          <DetailValue>
                            <PropriedadeTag 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/produtores/${propriedade.produtorId}/propriedades`);
                              }}
                            >
                              {produtores[propriedade.produtorId] || 'Desconhecido'}
                            </PropriedadeTag>
                          </DetailValue>
                        </PropertyDetail>
                      )}
                      
                      <PropertyDetail>
                        <DetailLabel>Área Total:</DetailLabel>
                        <DetailValue>
                          <AreaBadge variant="total">
                            {formatArea(propriedade.areaTotal)}
                          </AreaBadge>
                        </DetailValue>
                      </PropertyDetail>
                    </>
                  }
                  chartContent={
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { 
                            name: 'Agricultável', 
                            value: propriedade.areaAgricultavel, 
                            percentage: Math.round((propriedade.areaAgricultavel / propriedade.areaTotal) * 100),
                            fill: '#4CAF50' 
                          },
                          { 
                            name: 'Vegetação', 
                            value: propriedade.areaVegetacao, 
                            percentage: Math.round((propriedade.areaVegetacao / propriedade.areaTotal) * 100),
                            fill: '#2196F3' 
                          }
                        ]}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                      >
                        <XAxis 
                          type="number" 
                          tickFormatter={(value) => `${value} ha`} 
                          axisLine={false}
                          tickLine={false}
                          stroke="#999"
                          fontSize={11}
                          domain={[0, 'dataMax']}
                        />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          width={95}
                          axisLine={false}
                          tickLine={false}
                          stroke="#666"
                          fontSize={12}
                          tickMargin={8}
                        />
                        <Tooltip 
                          formatter={(value, _, props) => {
                            const item = props.payload;
                            return [`${value} ha (${item.percentage}%)`, 'Área'];
                          }}
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            border: 'none',
                            padding: '8px 12px'
                          }}
                          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        />
                        <Bar dataKey="value" barSize={24} radius={[0, 4, 4, 0]}>
                          {[
                            { name: 'Agricultável', fill: '#4CAF50' },
                            { name: 'Vegetação', fill: '#2196F3' }
                          ].map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.fill} 
                              stroke="white"
                              strokeWidth={1}
                            />
                          ))}
                        </Bar>
                        <text
                          x="50%"
                          y="15"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#666"
                          fontSize={11}
                          fontWeight="bold"
                        >
                          Área Total: {propriedade.areaTotal} ha
                        </text>
                      </BarChart>
                    </ResponsiveContainer>
                  }
                />
              ))}
            </EntityCardGrid>
          ) : (
            <DataTable
              data={filteredAndSortedPropriedades}
              keyExtractor={(propriedade) => propriedade.id}
              onRowClick={(propriedade) => handleVerDetalhes(propriedade.id)}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={(field: string) => toggleSort(field as SortField)}
              columns={[
                {
                  key: 'nome',
                  header: 'Nome',
                  sortable: true,
                  render: (propriedade: Propriedade) => (
                    <div 
                      style={{ 
                        cursor: 'pointer',
                        fontWeight: 500, 
                        color: '#0066CC'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerDetalhes(propriedade.id);
                      }}
                    >
                      {propriedade.nome}
                    </div>
                  )
                },
                {
                  key: 'localizacao',
                  header: 'Localização',
                  render: (propriedade: Propriedade) => (
                    `${propriedade.cidade}/${propriedade.estado}`
                  )
                },
                ...(produtorId ? [] : [
                  {
                    key: 'produtor',
                    header: 'Produtor',
                    render: (propriedade: Propriedade) => (
                      propriedade.produtorId && (
                        <PropriedadeTag onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/produtores/${propriedade.produtorId}/propriedades`);
                        }}>
                          {produtores[propriedade.produtorId] || 'Desconhecido'}
                        </PropriedadeTag>
                      )
                    )
                  }
                ]),
                {
                  key: 'areaTotal',
                  header: 'Área Total (ha)',
                  sortable: true,
                  render: (propriedade: Propriedade) => (
                    <AreaBadge variant="total">
                      {formatArea(propriedade.areaTotal)}
                    </AreaBadge>
                  )
                },
                {
                  key: 'areaAgricultavel',
                  header: 'Área Agricultável (ha)',
                  render: (propriedade: Propriedade) => (
                    <AreaBadge variant="agricultavel">
                      {formatArea(propriedade.areaAgricultavel)}
                    </AreaBadge>
                  )
                },
                {
                  key: 'areaVegetacao',
                  header: 'Área de Vegetação (ha)',
                  render: (propriedade: Propriedade) => (
                    <AreaBadge variant="vegetacao">
                      {formatArea(propriedade.areaVegetacao)}
                    </AreaBadge>
                  )
                },
                {
                  key: 'acoes',
                  header: 'Ações',
                  render: (propriedade: Propriedade) => (
                    <div onClick={(e) => e.stopPropagation()}>
                      <ActionMenu
                        id={propriedade.id}
                        options={[
                          {
                            label: 'Ver detalhes',
                            icon: '👁️',
                            onClick: () => handleVerDetalhes(propriedade.id)
                          },
                          {
                            label: 'Editar',
                            icon: '✏️',
                            onClick: () => handleEditPropriedade(propriedade.id)
                          },
                          {
                            label: 'Ver safras',
                            icon: '🌱',
                            onClick: () => handleVerSafras(propriedade.id)
                          },
                          {
                            label: 'Excluir',
                            icon: '🗑️',
                            onClick: () => handleDeleteClick(propriedade),
                            isDanger: true
                          }
                        ]}
                        title={`Ações - ${propriedade.nome}`}
                      />
                    </div>
                  )
                }
              ]}
            />
          )}
        </>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        itemName={propriedadeToDelete?.nome || ''}
        itemType="esta propriedade"
        warningMessage="Esta ação não pode ser desfeita. Todos os dados associados a esta propriedade serão perdidos."
        details={
          propriedadeToDelete && (
            <div>
              <Typography variant="h6">
                {propriedadeToDelete.nome}
              </Typography>
              <Typography variant="body2">
                {propriedadeToDelete.cidade}/{propriedadeToDelete.estado} • {formatArea(propriedadeToDelete.areaTotal)}
              </Typography>
            </div>
          )
        }
        isLoading={isDeleting}
        isDisabled={isDeleting}
      />
    </PageLayout>
  );
};

export default PropriedadesList; 
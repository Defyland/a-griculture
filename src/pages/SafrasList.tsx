import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Button,
  Badge,
  EntityCardGrid,
  StatusDisplay,
  DetailLabel,
  StyledLink
} from '../components/atoms';
import { PageLayout } from '../components/templates/PageLayout';
import { 
  Modal,
  ActionMenu,
  DataTable,
  EntityCard,
  PageHeader,
  SearchBar
} from '../components/molecules';
import { useSafras } from '../hooks';
import { normalizeStatus, getStatusDisplayText } from '../utils/statusUtils';
import {
  Container,
  ContentContainer,
  EmptyState,
  EmptyStateIcon,
  LoadingContainer,
  LoadingDot,
  CulturasContainer,
  CulturaTag,
  ModalContent,
  ModalTitle,
  PropertyDetail,
  DetailValue
} from './styles/SafrasList.styles';
import type { SafraCompleta } from './types/SafraList.types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = [
  '#4CAF50', // Verde primário
  '#2196F3', // Azul 
  '#FFC107', // Amarelo
  '#FF5722', // Laranja
  '#9C27B0', // Roxo
  '#3F51B5', // Índigo
  '#00BCD4', // Ciano
  '#E91E63'  // Rosa
];

const SafrasList: React.FC = () => {
  const { propriedadeId } = useParams<{ propriedadeId?: string }>();
  const navigate = useNavigate();
  const [showCulturasModal, setShowCulturasModal] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Adicionar estado para controlar o modo de visualização
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Adicionar estados para ordenação
  const [sortField, setSortField] = useState<'nome' | 'ano'>('ano');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Define se estamos visualizando por propriedade ou geral
  const isViewingByProperty = !!propriedadeId;

  // Usando nosso hook personalizado
  const { 
    safras, 
    loading, 
    selectedSafra,
    propriedade,
    fetchData,
    handleViewCulturas,
    handleAddSafra,
    handleEditSafra,
    handleDeleteClick,
    handleNavigateToPropriedade
  } = useSafras(navigate, { propriedadeId, filtroStatus });

  // Função para alternar a direção do ordenamento (agora diretamente na tabela)
  const toggleSort = (field: 'nome' | 'ano') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedSafras = safras
    .filter(safra => filtroStatus === 'todos' || normalizeStatus(safra.status) === filtroStatus)
    .filter(safra => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        safra.nome.toLowerCase().includes(searchLower) ||
        String(safra.ano).includes(searchLower) ||
        (safra.propriedade?.nome.toLowerCase().includes(searchLower) || false)
      );
    })
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      
      if (sortField === 'nome') {
        return a.nome.localeCompare(b.nome) * modifier;
      } else { // ano
        return (a.ano - b.ano) * modifier;
      }
    });

  // Função para abrir o modal ao visualizar culturas
  const openCulturasModal = (safra: SafraCompleta) => {
    handleViewCulturas(safra);
    setShowCulturasModal(true);
  };

  return (
    <PageLayout>
      <Container>
        <PageHeader 
          title={propriedade ? `Safras de ${propriedade.nome}` : 'Safras'}
          subtitle={isViewingByProperty 
            ? 'Gerenciamento de safras desta propriedade'
            : 'Visualização consolidada de todas as safras'
          }
          actionButton={{
            label: isViewingByProperty ? 'Nova Safra' : 'Adicionar Safra',
            onClick: handleAddSafra,
            icon: '➕'
          }}
          refreshButton={{
            onClick: fetchData
          }}
        />

        <SearchBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Pesquisar safras..."
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
              label: 'Status',
              options: [
                { value: 'todos', label: 'Todos os Status' },
                { value: 'ativa', label: 'Em andamento' },
                { value: 'concluida', label: 'Concluída' },
                { value: 'planejada', label: 'Planejada' }
              ],
              value: filtroStatus,
              onChange: (value) => setFiltroStatus(value)
            }
          ]}
        />

        <ContentContainer>
          {loading ? (
            <LoadingContainer>
              <LoadingDot />
              <LoadingDot />
              <LoadingDot />
            </LoadingContainer>
          ) : filteredAndSortedSafras.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>🌱</EmptyStateIcon>
              <Typography variant="h3">Nenhuma safra encontrada</Typography>
              <Typography variant="body1">
                <span style={{ color: '#86868B', display: 'block', marginTop: '0.5rem' }}>
                  {isViewingByProperty 
                    ? 'Esta propriedade ainda não tem safras cadastradas' 
                    : 'Não há safras que correspondam aos filtros selecionados'}
                </span>
              </Typography>
              <Button 
                variant="primary" 
                size="medium" 
                onClick={handleAddSafra} 
                style={{ marginTop: '1.5rem' }}
                rounded
              >
                {isViewingByProperty ? 'Adicionar Primeira Safra' : 'Adicionar Safra'}
              </Button>
            </EmptyState>
          ) : viewMode === 'grid' ? (
            <EntityCardGrid>
              {filteredAndSortedSafras.map((safra) => (
                <EntityCard
                  key={safra.id}
                  id={safra.id}
                  title={`${safra.nome} (${safra.ano})`}
                  onClick={() => navigate(`/propriedades/${safra.propriedadeId}/safras/${safra.id}`)}
                  actions={{
                    menuOptions: [
                      {
                        label: 'Ver detalhes',
                        icon: '👁️',
                        onClick: () => navigate(`/propriedades/${safra.propriedadeId}/safras/${safra.id}`)
                      },
                      {
                        label: 'Ver culturas',
                        icon: '🌱',
                        onClick: () => openCulturasModal(safra)
                      },
                      {
                        label: 'Editar',
                        icon: '✏️',
                        onClick: () => handleEditSafra(safra)
                      },
                      {
                        label: 'Excluir',
                        icon: '🗑️',
                        onClick: () => handleDeleteClick(safra),
                        isDanger: true
                      }
                    ]
                  }}
                  headerContent={
                    !isViewingByProperty && safra.propriedade ? (
                      <StyledLink
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigateToPropriedade(safra.propriedadeId);
                        }}
                      >
                        <Typography variant="caption" color="secondary">
                          {safra.propriedade.nome}
                        </Typography>
                      </StyledLink>
                    ) : undefined
                  }
                  mainContent={
                    <>
                      <PropertyDetail>
                        <DetailLabel>Status:</DetailLabel>
                        <DetailValue>
                          <StatusDisplay status={normalizeStatus(safra.status)}>
                            {getStatusDisplayText(normalizeStatus(safra.status))}
                          </StatusDisplay>
                        </DetailValue>
                      </PropertyDetail>
                      
                      <PropertyDetail>
                        <DetailLabel>Área:</DetailLabel>
                        <DetailValue>
                          <Typography variant="caption" noMargin>
                            {safra.areaHectares} ha
                          </Typography>
                        </DetailValue>
                      </PropertyDetail>
                      
                      <PropertyDetail>
                        <DetailLabel>Culturas:</DetailLabel>
                        <DetailValue>
                          <Badge variant="info" size="small">
                            {safra.culturas?.length || 0} culturas
                          </Badge>
                        </DetailValue>
                      </PropertyDetail>
                      
                      {safra.culturas && safra.culturas.length > 0 && (
                        <CulturasContainer style={{ marginTop: '0.5rem' }}>
                          {safra.culturas.slice(0, 3).map((cultura, index) => (
                            <CulturaTag key={index} index={index}>
                              {typeof cultura === 'string' ? cultura : cultura.nome}
                            </CulturaTag>
                          ))}
                          {safra.culturas.length > 3 && (
                            <Badge variant="secondary" size="small">
                              +{safra.culturas.length - 3}
                            </Badge>
                          )}
                        </CulturasContainer>
                      )}
                    </>
                  }
                  chartContent={
                    safra.culturas && safra.culturas.length > 0 ? (
                      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <defs>
                              {COLORS.map((color, index) => (
                                <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={color} stopOpacity={0.9}/>
                                  <stop offset="100%" stopColor={color} stopOpacity={0.6}/>
                                </linearGradient>
                              ))}
                              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
                              </filter>
                            </defs>
                            <Pie
                              data={safra.culturas.map((cultura, index) => ({
                                name: typeof cultura === 'string' ? cultura : cultura.nome,
                                value: 1,
                                fillKey: index
                              }))}
                              cx="50%"
                              cy="50%"
                              innerRadius={35}
                              outerRadius={60}
                              cornerRadius={3}
                              paddingAngle={3}
                              dataKey="value"
                              startAngle={90}
                              endAngle={-270}
                              filter="url(#shadow)"
                            >
                              {safra.culturas.map((_, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={`url(#colorGradient-${index % COLORS.length})`}
                                  stroke="white"
                                  strokeWidth={2}
                                />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(_, name) => [name, 'Cultura']}
                              contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                border: 'none',
                                padding: '8px 12px'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          pointerEvents: 'none'
                        }}>
                          <div style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#333'
                          }}>
                            {safra.culturas.length}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '4px'
                          }}>
                            {safra.culturas.length === 1 ? 'cultura' : 'culturas'}
                          </div>
                        </div>
                        
                        {safra.culturas.length > 0 && (
                          <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: 0,
                            width: '100%',
                            textAlign: 'center',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '4px',
                            padding: '0 10px'
                          }}>
                            {safra.culturas.slice(0, 3).map((cultura, index) => (
                              <div key={index} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255,255,255,0.7)',
                                borderRadius: '4px',
                                padding: '2px 6px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#444',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                              }}>
                                <div style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: COLORS[index % COLORS.length],
                                  marginRight: '4px'
                                }}></div>
                                {typeof cultura === 'string' ? cultura : cultura.nome}
                              </div>
                            ))}
                            {safra.culturas.length > 3 && (
                              <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(240,240,240,0.7)',
                                borderRadius: '4px',
                                padding: '2px 6px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#666'
                              }}>
                                +{safra.culturas.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ 
                        display: 'flex', 
                        height: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: '#999',
                        flexDirection: 'column'
                      }}>
                        <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌱</div>
                        <div style={{ fontSize: '14px' }}>Sem culturas</div>
                      </div>
                    )
                  }
                />
              ))}
            </EntityCardGrid>
          ) : (
            <DataTable
              data={filteredAndSortedSafras}
              keyExtractor={(safra) => safra.id}
              onRowClick={(safra: SafraCompleta) => navigate(`/propriedades/${safra.propriedadeId}/safras/${safra.id}`)}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={(field: string) => toggleSort(field as 'nome' | 'ano')}
              columns={[
                {
                  key: 'ano',
                  header: 'Ano',
                  sortable: true,
                  render: (safra: SafraCompleta) => safra.ano
                },
                {
                  key: 'nome',
                  header: 'Safra',
                  sortable: true,
                  render: (safra: SafraCompleta) => (
                    <div 
                      style={{ 
                        cursor: 'pointer',
                        fontWeight: 500, 
                        color: '#0066CC', 
                        textDecoration: 'underline' 
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/propriedades/${safra.propriedadeId}/safras/${safra.id}`);
                      }}
                    >
                      {safra.nome}
                    </div>
                  )
                },
                ...(!isViewingByProperty ? [
                  {
                    key: 'propriedade',
                    header: 'Propriedade',
                    render: (safra: SafraCompleta) => (
                      safra.propriedade && (
                        <span 
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigateToPropriedade(safra.propriedadeId);
                          }}
                        >
                          {safra.propriedade.nome}
                        </span>
                      )
                    )
                  }
                ] : []),
                {
                  key: 'status',
                  header: 'Status',
                  render: (safra: SafraCompleta) => (
                    <StatusDisplay status={normalizeStatus(safra.status)}>
                      {getStatusDisplayText(normalizeStatus(safra.status))}
                    </StatusDisplay>
                  )
                },
                {
                  key: 'area',
                  header: 'Área (ha)',
                  render: (safra: SafraCompleta) => safra.areaHectares
                },
                {
                  key: 'culturas',
                  header: 'Culturas',
                  render: (safra: SafraCompleta) => (
                    <div 
                      style={{ cursor: 'pointer' }} 
                      onClick={(e) => {
                        e.stopPropagation();
                        openCulturasModal(safra);
                      }}
                    >
                      <Badge variant="info" size="small">
                        {safra.culturas?.length || 0} culturas
                      </Badge>
                    </div>
                  )
                },
                {
                  key: 'acoes',
                  header: 'Ações',
                  render: (safra: SafraCompleta) => (
                    <div onClick={(e) => e.stopPropagation()}>
                      <ActionMenu
                        options={[
                          {
                            label: 'Ver detalhes',
                            icon: '👁️',
                            onClick: () => navigate(`/propriedades/${safra.propriedadeId}/safras/${safra.id}`)
                          },
                          {
                            label: 'Ver culturas',
                            icon: '🌱',
                            onClick: () => openCulturasModal(safra)
                          },
                          {
                            label: 'Editar',
                            icon: '✏️',
                            onClick: () => handleEditSafra(safra)
                          },
                          {
                            label: 'Excluir',
                            icon: '🗑️',
                            onClick: () => handleDeleteClick(safra),
                            isDanger: true
                          }
                        ]}
                        title={`Ações - ${safra.nome}`}
                      />
                    </div>
                  )
                }
              ]}
            />
          )}
        </ContentContainer>

        <Modal
          isOpen={showCulturasModal}
          onClose={() => setShowCulturasModal(false)}
          title="Culturas da Safra"
        >
          <ModalContent>
            {selectedSafra && (
              <>
                <ModalTitle>Culturas da safra: {selectedSafra.nome}</ModalTitle>
                <CulturasContainer>
                  {selectedSafra.culturas && selectedSafra.culturas.length > 0 ? (
                    selectedSafra.culturas.map((cultura, index) => (
                      <CulturaTag key={index} index={index}>
                        {typeof cultura === 'string' ? cultura : cultura.nome}
                      </CulturaTag>
                    ))
                  ) : (
                    <Typography variant="body2">Nenhuma cultura cadastrada para esta safra</Typography>
                  )}
                </CulturasContainer>
              </>
            )}
          </ModalContent>
        </Modal>
      </Container>
    </PageLayout>
  );
};

export default SafrasList; 
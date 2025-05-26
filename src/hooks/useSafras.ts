import { useState, useEffect } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { safrasAPI, propriedadesAPI, produtoresAPI } from '../services/api';
import type { Safra, Propriedade } from '../types';
import type { SafraCompleta } from '../pages/types/SafraList.types';

interface UseSafrasOptions {
  propriedadeId?: string;
  filtroStatus?: string;
}

interface UseSafrasResult {
  safras: SafraCompleta[];
  loading: boolean;
  error: string | null;
  propriedade: Propriedade | null;
  fetchData: () => Promise<void>;
  handleViewCulturas: (safra: Safra) => void;
  handleAddSafra: () => void;
  handleEditSafra: (safra: Safra) => void;
  handleDeleteClick: (safra: Safra) => void;
  handleNavigateToPropriedade: (propId: string) => void;
  setSelectedSafra: React.Dispatch<React.SetStateAction<Safra | null>>;
  selectedSafra: Safra | null;
}

export const useSafras = (
  navigate: NavigateFunction, 
  options: UseSafrasOptions = {}
): UseSafrasResult => {
  const { propriedadeId, filtroStatus = 'todos' } = options;

  const [safras, setSafras] = useState<SafraCompleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSafra, setSelectedSafra] = useState<Safra | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let safrasData: SafraCompleta[] = [];
      
      // Se temos um ID de propriedade, buscamos safras específicas desta propriedade
      if (propriedadeId) {
        const safrasDaPropriedade = await safrasAPI.getByPropriedade(propriedadeId);
        
        // Filtrar por status se necessário
        safrasData = filtroStatus === 'todos' 
          ? safrasDaPropriedade 
          : safrasDaPropriedade.filter(safra => {
              // Mapeamento simplificado de status
              const status = safra.status?.toLowerCase() || '';
              return filtroStatus === status;
            });
        
        // Buscar detalhes da propriedade
        const propData = await propriedadesAPI.getById(propriedadeId);
        
        if (propData) {
          setPropriedade(propData);
        }
      } else {
        // Buscar todas as safras
        const todasSafras = await safrasAPI.getAll();
        
        // Filtrar por status se necessário
        const safrasFiltradas = filtroStatus === 'todos' 
          ? todasSafras 
          : todasSafras.filter(safra => {
              // Mapeamento simplificado de status
              const status = safra.status?.toLowerCase() || '';
              return filtroStatus === status;
            });
        
        // Buscar detalhes de propriedades e produtores
        const todasPropriedades = await propriedadesAPI.getAll();
        const todosProdutores = await produtoresAPI.getAll();
        
        // Mapear as safras com detalhes completos
        safrasData = safrasFiltradas.map(safra => {
          const propriedade = todasPropriedades.find(p => p.id === safra.propriedadeId);
          let produtor = null;
          
          if (propriedade && propriedade.produtorId) {
            produtor = todosProdutores.find(p => p.id === propriedade.produtorId);
          }
          
          return {
            ...safra,
            propriedade,
            produtor
          };
        });
      }
      
      setSafras(safrasData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar safras:", error);
      setError("Erro ao carregar dados de safras");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propriedadeId, filtroStatus]);

  const handleViewCulturas = (safra: Safra) => {
    setSelectedSafra(safra);
  };

  const handleAddSafra = () => {
    if (propriedadeId) {
      navigate(`/propriedades/${propriedadeId}/safras/novo`);
    } else {
      // Se não estamos vendo por propriedade, redirecionar para o seletor de propriedades
      navigate('/safras/selecionar-propriedade');
    }
  };

  const handleNavigateToPropriedade = (propId: string) => {
    navigate(`/propriedades/${propId}/safras`);
  };

  const handleEditSafra = (safra: Safra) => {
    navigate(`/propriedades/${safra.propriedadeId}/safras/editar/${safra.id}`);
  };

  const handleDeleteClick = (safra: Safra) => {
    console.log('Excluir safra:', safra.id);
    // Implementação da exclusão seria feita aqui
  };

  return {
    safras,
    loading,
    error,
    propriedade,
    fetchData,
    handleViewCulturas,
    handleAddSafra,
    handleEditSafra,
    handleDeleteClick,
    handleNavigateToPropriedade,
    setSelectedSafra,
    selectedSafra
  };
}; 
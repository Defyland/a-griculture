import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { NavigateFunction } from 'react-router-dom';
import { safrasAPI, propriedadesAPI, produtoresAPI } from '../services/api';
import { deleteSafra } from '../store/slices/safrasSlice';
import type { AppDispatch } from '../store';
import type { Safra, Propriedade } from '../types';
import type { SafraCompleta } from '../pages/types/SafraList.types';

interface UseSafrasOptions {
  propriedadeId?: string;
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
  handleDeleteConfirm: () => Promise<void>;
  handleNavigateToPropriedade: (propId: string) => void;
  setSelectedSafra: React.Dispatch<React.SetStateAction<Safra | null>>;
  selectedSafra: Safra | null;
  // Estados para o modal de exclusão
  deleteModalOpen: boolean;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  safraToDelete: Safra | null;
  setSafraToDelete: React.Dispatch<React.SetStateAction<Safra | null>>;
  isDeleting: boolean;
}

export const useSafras = (
  navigate: NavigateFunction, 
  options: UseSafrasOptions = {}
): UseSafrasResult => {
  const { propriedadeId } = options;
  const dispatch = useDispatch<AppDispatch>();

  const [safras, setSafras] = useState<SafraCompleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSafra, setSelectedSafra] = useState<Safra | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);
  
  // Estados para o modal de exclusão
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [safraToDelete, setSafraToDelete] = useState<Safra | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let safrasData: SafraCompleta[] = [];
      
      // Se temos um ID de propriedade, buscamos safras específicas desta propriedade
      if (propriedadeId) {
        const safrasDaPropriedade = await safrasAPI.getByPropriedade(propriedadeId);
        safrasData = safrasDaPropriedade;
        
        // Buscar detalhes da propriedade
        const propData = await propriedadesAPI.getById(propriedadeId);
        
        if (propData) {
          setPropriedade(propData);
        }
      } else {
        // Buscar todas as safras
        const todasSafras = await safrasAPI.getAll();
        
        // Buscar detalhes de propriedades e produtores
        const todasPropriedades = await propriedadesAPI.getAll();
        const todosProdutores = await produtoresAPI.getAll();
        
        // Mapear as safras com detalhes completos
        safrasData = todasSafras.map(safra => {
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
  }, [propriedadeId]);

  const handleViewCulturas = (safra: Safra) => {
    setSelectedSafra(safra);
  };

  const handleAddSafra = () => {
    if (propriedadeId) {
      const currentPath = `/propriedades/${propriedadeId}/safras`;
      navigate(`/propriedades/${propriedadeId}/safras/novo`, {
        state: { from: currentPath }
      });
    } else {
      // Se não estamos vendo por propriedade, redirecionar para o seletor de propriedades
      navigate('/safras/selecionar-propriedade');
    }
  };

  const handleNavigateToPropriedade = (propId: string) => {
    navigate(`/propriedades/${propId}/safras`);
  };

  const handleEditSafra = (safra: Safra) => {
    const currentPath = propriedadeId ? `/propriedades/${propriedadeId}/safras` : '/safras';
    navigate(`/propriedades/${safra.propriedadeId}/safras/editar/${safra.id}`, {
      state: { from: currentPath }
    });
  };

  const handleDeleteClick = (safra: Safra) => {
    setSafraToDelete(safra);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!safraToDelete) return;
    
    setIsDeleting(true);
    try {
      await dispatch(deleteSafra({ 
        id: safraToDelete.id, 
        propriedadeId: safraToDelete.propriedadeId 
      })).unwrap();
      
      // Fechar modal e limpar estado primeiro
      setDeleteModalOpen(false);
      setSafraToDelete(null);
      
      // Recarregar os dados para garantir consistência
      await fetchData();
    } catch (err) {
      console.error('Erro ao excluir safra:', err);
    } finally {
      setIsDeleting(false);
    }
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
    handleDeleteConfirm,
    handleNavigateToPropriedade,
    setSelectedSafra,
    selectedSafra,
    deleteModalOpen,
    setDeleteModalOpen,
    safraToDelete,
    setSafraToDelete,
    isDeleting
  };
}; 
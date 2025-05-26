import { useState, useEffect } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { propriedadesAPI, produtoresAPI } from '../services/api';
import type { Propriedade, Produtor } from '../types';

interface UsePropriedadesOptions {
  produtorId?: string;
}

interface UsePropriedadesResult {
  propriedades: Propriedade[];
  loading: boolean;
  error: string | null;
  produtor: Produtor | null;
  produtores: Record<string, string>;
  fetchData: (showRefreshing?: boolean) => Promise<void>;
  handleAddPropriedade: () => void;
  handleEditPropriedade: (id: string) => void;
  handleVerSafras: (propriedadeId: string) => void;
  handleVerDetalhes: (id: string) => void;
  handleDeleteClick: (propriedade: Propriedade) => void;
  propriedadeToDelete: Propriedade | null;
  setPropriedadeToDelete: React.Dispatch<React.SetStateAction<Propriedade | null>>;
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteConfirm: () => Promise<void>;
}

export const usePropriedades = (
  navigate: NavigateFunction,
  options: UsePropriedadesOptions = {}
): UsePropriedadesResult => {
  const { produtorId } = options;

  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [produtor, setProdutor] = useState<Produtor | null>(null);
  const [produtores, setProdutores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [propriedadeToDelete, setPropriedadeToDelete] = useState<Propriedade | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async (showRefreshing = false) => {
    if (!showRefreshing) {
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

  const handleAddPropriedade = () => {
    if (produtorId) {
      navigate(`/produtores/${produtorId}/propriedades/novo`);
    } else {
      // Redirecionar para a tela de seleção de produtor
      navigate('/propriedades/selecionar-produtor');
    }
  };

  const handleEditPropriedade = (id: string) => {
    if (produtorId) {
      navigate(`/produtores/${produtorId}/propriedades/editar/${id}`);
    } else {
      // Se não estamos visualizando por produtor, precisamos obter o produtorId da propriedade
      const propriedade = propriedades.find(p => p.id === id);
      if (propriedade && propriedade.produtorId) {
        navigate(`/produtores/${propriedade.produtorId}/propriedades/editar/${id}`);
      } else {
        navigate(`/propriedades/editar/${id}`);
      }
    }
  };
  
  const handleVerSafras = (propriedadeId: string) => {
    navigate(`/propriedades/${propriedadeId}/safras`);
  };

  const handleVerDetalhes = (id: string) => {
    navigate(`/propriedades/${id}`);
  };

  const handleDeleteClick = (propriedade: Propriedade) => {
    setPropriedadeToDelete(propriedade);
  };

  const handleDeleteConfirm = async () => {
    if (!propriedadeToDelete) return;
    
    setIsDeleting(true);
    try {
      await propriedadesAPI.delete(propriedadeToDelete.id, propriedadeToDelete.produtorId);
      
      // Atualizar estado localmente para remover propriedade excluída
      setPropriedades(propriedades.filter(p => p.id !== propriedadeToDelete.id));
      
    } catch (err) {
      console.error('Erro ao excluir propriedade:', err);
    } finally {
      setIsDeleting(false);
      setPropriedadeToDelete(null);
    }
  };

  return {
    propriedades,
    loading,
    error,
    produtor,
    produtores,
    fetchData,
    handleAddPropriedade,
    handleEditPropriedade,
    handleVerSafras,
    handleVerDetalhes,
    handleDeleteClick,
    propriedadeToDelete,
    setPropriedadeToDelete,
    isDeleting,
    setIsDeleting,
    handleDeleteConfirm
  };
}; 
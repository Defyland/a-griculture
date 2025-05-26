import { useState, useMemo, useCallback } from 'react';

interface PaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
}

interface PaginationHookResult<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  pageSizeOptions: number[];
  startIndex: number;
  endIndex: number;
}

/**
 * Hook personalizado para gerenciar paginação de dados
 * @param data Array de dados para paginar
 * @param options Opções de configuração
 * @returns Um objeto com estado e funções para manipular a paginação
 */
export function usePagination<T>(
  data: T[],
  options: PaginationOptions = {}
): PaginationHookResult<T> {
  const {
    initialPage = 1,
    initialPageSize = 10,
    pageSizeOptions = [5, 10, 20, 50, 100]
  } = options;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  // Calcula o número total de páginas
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(data.length / pageSize));
  }, [data.length, pageSize]);
  
  // Garante que a página atual seja válida quando os dados mudam
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);
  
  // Navegação entre páginas
  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);
  
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);
  
  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);
  
  // Altera o tamanho da página
  const changePageSize = useCallback((size: number) => {
    // Calculando a posição do primeiro item na página atual
    const currentFirstItemIndex = (currentPage - 1) * pageSize;
    
    // Configurando o novo tamanho de página
    setPageSize(size);
    
    // Calculando a nova página com base na posição do primeiro item
    const newPage = Math.floor(currentFirstItemIndex / size) + 1;
    setCurrentPage(newPage);
  }, [currentPage, pageSize]);
  
  // Calcula os índices iniciais e finais dos itens exibidos
  const startIndex = useMemo(() => {
    return (currentPage - 1) * pageSize;
  }, [currentPage, pageSize]);
  
  const endIndex = useMemo(() => {
    return Math.min(startIndex + pageSize - 1, data.length - 1);
  }, [startIndex, pageSize, data.length]);
  
  // Pagina os dados
  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex + 1);
  }, [data, startIndex, endIndex]);
  
  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems: data.length,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    setPageSize: changePageSize,
    pageSizeOptions,
    startIndex,
    endIndex
  };
} 
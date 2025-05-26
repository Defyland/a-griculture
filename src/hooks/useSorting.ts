import { useState, useCallback } from 'react';

export type SortDirection = 'asc' | 'desc';

interface SortingHookResult<T> {
  sortField: string;
  sortDirection: SortDirection;
  sortedData: T[];
  handleSort: (field: string) => void;
  setSortConfig: (field: string, direction: SortDirection) => void;
}

/**
 * Hook personalizado para gerenciar a ordenação de dados
 * @param data Array de dados para ordenar
 * @param initialSortField Campo para ordenação inicial
 * @param initialSortDirection Direção de ordenação inicial
 * @returns Um objeto com estado e funções para manipular a ordenação
 */
export function useSorting<T extends Record<string, unknown>>(
  data: T[],
  initialSortField: string = '',
  initialSortDirection: SortDirection = 'asc'
): SortingHookResult<T> {
  const [sortField, setSortField] = useState<string>(initialSortField);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);

  // Função para configurar o campo e direção de ordenação
  const setSortConfig = useCallback((field: string, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  }, []);

  // Função para alternar o campo de ordenação ou a direção
  const handleSort = useCallback((field: string) => {
    if (sortField === field) {
      // Se o campo for o mesmo, inverte a direção
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Se for um novo campo, define o campo e usa ordenação ascendente como padrão
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField, sortDirection]);

  // Ordena os dados com base no campo e direção atuais
  const sortedData = useCallback(() => {
    if (!sortField) return [...data];
    
    return [...data].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      // Determina o tipo de dados para ordenação apropriada
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      // Ordenação para números
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      
      // Ordenação para datas
      if (valueA instanceof Date && valueB instanceof Date) {
        return sortDirection === 'asc' 
          ? valueA.getTime() - valueB.getTime() 
          : valueB.getTime() - valueA.getTime();
      }
      
      // Ordenação genérica com comparação segura
      // Converte para string para garantir que a comparação funcione
      const strA = String(valueA);
      const strB = String(valueB);
      
      return sortDirection === 'asc' 
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
  }, [data, sortField, sortDirection]);

  return {
    sortField,
    sortDirection,
    sortedData: sortedData(),
    handleSort,
    setSortConfig
  };
} 
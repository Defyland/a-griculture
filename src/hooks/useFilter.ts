import { useState, useMemo, useCallback } from 'react';

interface FilterCondition<T> {
  field: keyof T;
  value: unknown;
  operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
}

interface FilterHookOptions<T> {
  initialFilterTerm?: string;
  searchFields?: Array<keyof T>;
  exactMatchFields?: Array<keyof T>;
}

interface FilterHookResult<T> {
  filterTerm: string;
  setFilterTerm: (term: string) => void;
  filteredData: T[];
  addFilterCondition: (condition: FilterCondition<T>) => void;
  removeFilterCondition: (field: keyof T) => void;
  clearAllFilters: () => void;
}

/**
 * Hook personalizado para gerenciar filtros de dados
 * @param data Array de dados a serem filtrados
 * @param options Opções de configuração
 * @returns Um objeto com estado e funções para manipular os filtros
 */
export function useFilter<T extends Record<string, unknown>>(
  data: T[],
  options: FilterHookOptions<T> = {}
): FilterHookResult<T> {
  const { initialFilterTerm = '', searchFields = [], exactMatchFields = [] } = options;
  
  const [filterTerm, setFilterTerm] = useState<string>(initialFilterTerm);
  const [filterConditions, setFilterConditions] = useState<FilterCondition<T>[]>([]);
  
  // Adiciona uma condição de filtro
  const addFilterCondition = useCallback((condition: FilterCondition<T>) => {
    setFilterConditions(prev => {
      // Remove condição existente com o mesmo campo para não duplicar
      const withoutSameField = prev.filter(c => c.field !== condition.field);
      return [...withoutSameField, condition];
    });
  }, []);
  
  // Remove uma condição de filtro pelo nome do campo
  const removeFilterCondition = useCallback((field: keyof T) => {
    setFilterConditions(prev => prev.filter(condition => condition.field !== field));
  }, []);
  
  // Limpa todos os filtros
  const clearAllFilters = useCallback(() => {
    setFilterTerm('');
    setFilterConditions([]);
  }, []);
  
  // Função que aplica os filtros aos dados
  const filteredData = useMemo(() => {
    // Filtrar primeiro pelas condições específicas
    let result = [...data];
    
    // Aplica cada condição de filtro
    if (filterConditions.length > 0) {
      result = result.filter(item => {
        return filterConditions.every(condition => {
          const fieldValue = item[condition.field];
          const filterValue = condition.value;
          const operator = condition.operator || 'equals';
          
          if (fieldValue === undefined || fieldValue === null) {
            return false;
          }
          
          switch (operator) {
            case 'equals':
              return fieldValue === filterValue;
            case 'contains': {
              if (typeof fieldValue === 'string' && typeof filterValue === 'string') {
                return fieldValue.toLowerCase().includes(filterValue.toLowerCase());
              }
              return false;
            }
            case 'startsWith': {
              if (typeof fieldValue === 'string' && typeof filterValue === 'string') {
                return fieldValue.toLowerCase().startsWith(filterValue.toLowerCase());
              }
              return false;
            }
            case 'endsWith': {
              if (typeof fieldValue === 'string' && typeof filterValue === 'string') {
                return fieldValue.toLowerCase().endsWith(filterValue.toLowerCase());
              }
              return false;
            }
            case 'gt': {
              if (typeof fieldValue === 'number' && typeof filterValue === 'number') {
                return fieldValue > filterValue;
              }
              return false;
            }
            case 'lt': {
              if (typeof fieldValue === 'number' && typeof filterValue === 'number') {
                return fieldValue < filterValue;
              }
              return false;
            }
            case 'gte': {
              if (typeof fieldValue === 'number' && typeof filterValue === 'number') {
                return fieldValue >= filterValue;
              }
              return false;
            }
            case 'lte': {
              if (typeof fieldValue === 'number' && typeof filterValue === 'number') {
                return fieldValue <= filterValue;
              }
              return false;
            }
            default:
              return false;
          }
        });
      });
    }
    
    // Aplica o termo de busca global se for fornecido
    if (filterTerm) {
      const lowercaseTerm = filterTerm.toLowerCase();
      
      result = result.filter(item => {
        // Verifica campos exatos primeiro
        for (const field of exactMatchFields) {
          const value = item[field];
          if (typeof value === 'string' && value.toLowerCase() === lowercaseTerm) {
            return true;
          }
        }
        
        // Verifica campos de busca parcial
        for (const field of searchFields) {
          const value = item[field];
          if (typeof value === 'string' && value.toLowerCase().includes(lowercaseTerm)) {
            return true;
          }
        }
        
        // Se não houver campos especificados, busca em todas as propriedades string
        if (searchFields.length === 0 && exactMatchFields.length === 0) {
          return Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(lowercaseTerm)
          );
        }
        
        return false;
      });
    }
    
    return result;
  }, [data, filterConditions, filterTerm, searchFields, exactMatchFields]);
  
  return {
    filterTerm,
    setFilterTerm,
    filteredData,
    addFilterCondition,
    removeFilterCondition,
    clearAllFilters
  };
} 
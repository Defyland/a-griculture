import { renderHook, act } from '@testing-library/react';
import { useFilter } from '../../hooks/useFilter';

describe('useFilter', () => {
  const mockData = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', age: 30, city: 'São Paulo' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', age: 25, city: 'Rio de Janeiro' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', age: 35, city: 'São Paulo' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', age: 28, city: 'Belo Horizonte' },
    { id: 5, name: 'Carlos Lima', email: 'carlos@email.com', age: 32, city: 'São Paulo' }
  ];

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useFilter(mockData));

    expect(result.current.filterTerm).toBe('');
    expect(result.current.filteredData).toEqual(mockData);
  });

  it('deve aceitar configurações iniciais', () => {
    const options = {
      initialFilterTerm: 'Silva',
      searchFields: ['name' as keyof typeof mockData[0]],
      exactMatchFields: ['email' as keyof typeof mockData[0]]
    };

    const { result } = renderHook(() => useFilter(mockData, options));

    expect(result.current.filterTerm).toBe('Silva');
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('João Silva');
  });

  it('deve filtrar por termo de busca global', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.setFilterTerm('Silva');
    });

    expect(result.current.filterTerm).toBe('Silva');
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('João Silva');
  });

  it('deve filtrar por campos específicos de busca', () => {
    const options = {
      searchFields: ['name' as keyof typeof mockData[0]]
    };

    const { result } = renderHook(() => useFilter(mockData, options));

    act(() => {
      result.current.setFilterTerm('Maria');
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Maria Santos');
  });

  it('deve filtrar por campos de correspondência exata', () => {
    const options = {
      exactMatchFields: ['city' as keyof typeof mockData[0]]
    };

    const { result } = renderHook(() => useFilter(mockData, options));

    act(() => {
      result.current.setFilterTerm('São Paulo');
    });

    expect(result.current.filteredData).toHaveLength(3);
    expect(result.current.filteredData.every(item => item.city === 'São Paulo')).toBe(true);
  });

  it('deve adicionar condições de filtro', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.addFilterCondition({
        field: 'city',
        value: 'São Paulo',
        operator: 'equals'
      });
    });

    expect(result.current.filteredData).toHaveLength(3);
    expect(result.current.filteredData.every(item => item.city === 'São Paulo')).toBe(true);
  });

  it('deve filtrar com operador contains', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.addFilterCondition({
        field: 'name',
        value: 'Silva',
        operator: 'contains'
      });
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('João Silva');
  });

  it('deve filtrar com operador startsWith', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.addFilterCondition({
        field: 'name',
        value: 'João',
        operator: 'startsWith'
      });
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('João Silva');
  });

  it('deve filtrar com operador endsWith', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.addFilterCondition({
        field: 'name',
        value: 'Santos',
        operator: 'endsWith'
      });
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Maria Santos');
  });

  it('deve filtrar com operadores numéricos', () => {
    const { result } = renderHook(() => useFilter(mockData));

    // Filtrar idade > 30 (Pedro: 35, Carlos: 32)
    act(() => {
      result.current.addFilterCondition({
        field: 'age',
        value: 30,
        operator: 'gt'
      });
    });

    expect(result.current.filteredData).toHaveLength(2);
    expect(result.current.filteredData.every(item => item.age > 30)).toBe(true);

    // Filtrar idade >= 30 (João: 30, Pedro: 35, Carlos: 32)
    act(() => {
      result.current.removeFilterCondition('age');
      result.current.addFilterCondition({
        field: 'age',
        value: 30,
        operator: 'gte'
      });
    });

    expect(result.current.filteredData).toHaveLength(3);
    expect(result.current.filteredData.every(item => item.age >= 30)).toBe(true);

    // Filtrar idade < 30 (Maria: 25, Ana: 28)
    act(() => {
      result.current.removeFilterCondition('age');
      result.current.addFilterCondition({
        field: 'age',
        value: 30,
        operator: 'lt'
      });
    });

    expect(result.current.filteredData).toHaveLength(2);
    expect(result.current.filteredData.every(item => item.age < 30)).toBe(true);

    // Filtrar idade <= 30 (João: 30, Maria: 25, Ana: 28)
    act(() => {
      result.current.removeFilterCondition('age');
      result.current.addFilterCondition({
        field: 'age',
        value: 30,
        operator: 'lte'
      });
    });

    expect(result.current.filteredData).toHaveLength(3);
    expect(result.current.filteredData.every(item => item.age <= 30)).toBe(true);
  });

  it('deve remover condições de filtro', () => {
    const { result } = renderHook(() => useFilter(mockData));

    // Adicionar filtro
    act(() => {
      result.current.addFilterCondition({
        field: 'city',
        value: 'São Paulo',
        operator: 'equals'
      });
    });

    expect(result.current.filteredData).toHaveLength(3);

    // Remover filtro
    act(() => {
      result.current.removeFilterCondition('city');
    });

    expect(result.current.filteredData).toEqual(mockData);
  });

  it('deve substituir condições existentes no mesmo campo', () => {
    const { result } = renderHook(() => useFilter(mockData));

    // Adicionar filtro para São Paulo
    act(() => {
      result.current.addFilterCondition({
        field: 'city',
        value: 'São Paulo',
        operator: 'equals'
      });
    });

    expect(result.current.filteredData).toHaveLength(3);

    // Substituir por filtro para Rio de Janeiro
    act(() => {
      result.current.addFilterCondition({
        field: 'city',
        value: 'Rio de Janeiro',
        operator: 'equals'
      });
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].city).toBe('Rio de Janeiro');
  });

  it('deve aplicar múltiplas condições de filtro', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.addFilterCondition({
        field: 'city',
        value: 'São Paulo',
        operator: 'equals'
      });
      result.current.addFilterCondition({
        field: 'age',
        value: 30,
        operator: 'gte'
      });
    });

    expect(result.current.filteredData).toHaveLength(3);
    expect(result.current.filteredData.every(item => 
      item.city === 'São Paulo' && item.age >= 30
    )).toBe(true);
  });

  it('deve combinar filtros de condição com termo de busca', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.addFilterCondition({
        field: 'city',
        value: 'São Paulo',
        operator: 'equals'
      });
      result.current.setFilterTerm('Silva');
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('João Silva');
  });

  it('deve limpar todos os filtros', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.addFilterCondition({
        field: 'city',
        value: 'São Paulo',
        operator: 'equals'
      });
      result.current.setFilterTerm('Silva');
    });

    expect(result.current.filteredData).toHaveLength(1);

    act(() => {
      result.current.clearAllFilters();
    });

    expect(result.current.filterTerm).toBe('');
    expect(result.current.filteredData).toEqual(mockData);
  });

  it('deve tratar campos nulos/undefined graciosamente', () => {
    const dataWithNulls = [
      { id: 1, name: 'João', city: null },
      { id: 2, name: null, city: 'São Paulo' },
      { id: 3, name: 'Maria', city: 'Rio de Janeiro' }
    ];

    const { result } = renderHook(() => useFilter(dataWithNulls));

    act(() => {
      result.current.addFilterCondition({
        field: 'city',
        value: 'São Paulo',
        operator: 'equals'
      });
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].city).toBe('São Paulo');
  });

  it('deve funcionar com busca case-insensitive', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.setFilterTerm('silva');
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('João Silva');

    act(() => {
      result.current.setFilterTerm('');
      result.current.addFilterCondition({
        field: 'name',
        value: 'silva',
        operator: 'contains'
      });
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('João Silva');
  });

  it('deve retornar dados vazios quando nenhum item corresponde', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.setFilterTerm('inexistente');
    });

    expect(result.current.filteredData).toEqual([]);
  });

  it('deve tratar operadores inválidos', () => {
    const { result } = renderHook(() => useFilter(mockData));

    act(() => {
      result.current.addFilterCondition({
        field: 'name',
        value: 'João',
        operator: 'invalid' as 'equals'
      });
    });

    expect(result.current.filteredData).toEqual([]);
  });
}); 
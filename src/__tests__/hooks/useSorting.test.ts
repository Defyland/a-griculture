import { renderHook, act } from '@testing-library/react';
import { useSorting } from '../../hooks/useSorting';

describe('useSorting', () => {
  const mockData = [
    { id: 3, name: 'Carlos Lima', age: 32, createdAt: new Date('2023-01-15') },
    { id: 1, name: 'Ana Oliveira', age: 28, createdAt: new Date('2023-03-10') },
    { id: 2, name: 'Bruno Silva', age: 35, createdAt: new Date('2023-02-20') },
    { id: 4, name: 'Diana Costa', age: 25, createdAt: new Date('2023-04-05') }
  ];

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useSorting(mockData));

    expect(result.current.sortField).toBe('');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.sortedData).toEqual(mockData);
  });

  it('deve aceitar configurações iniciais', () => {
    const { result } = renderHook(() => 
      useSorting(mockData, 'name', 'desc')
    );

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('desc');
    expect(result.current.sortedData[0].name).toBe('Diana Costa');
    expect(result.current.sortedData[3].name).toBe('Ana Oliveira');
  });

  it('deve ordenar strings em ordem ascendente', () => {
    const { result } = renderHook(() => useSorting(mockData));

    act(() => {
      result.current.setSortConfig('name', 'asc');
    });

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.sortedData[0].name).toBe('Ana Oliveira');
    expect(result.current.sortedData[1].name).toBe('Bruno Silva');
    expect(result.current.sortedData[2].name).toBe('Carlos Lima');
    expect(result.current.sortedData[3].name).toBe('Diana Costa');
  });

  it('deve ordenar strings em ordem descendente', () => {
    const { result } = renderHook(() => useSorting(mockData));

    act(() => {
      result.current.setSortConfig('name', 'desc');
    });

    expect(result.current.sortDirection).toBe('desc');
    expect(result.current.sortedData[0].name).toBe('Diana Costa');
    expect(result.current.sortedData[1].name).toBe('Carlos Lima');
    expect(result.current.sortedData[2].name).toBe('Bruno Silva');
    expect(result.current.sortedData[3].name).toBe('Ana Oliveira');
  });

  it('deve ordenar números em ordem ascendente', () => {
    const { result } = renderHook(() => useSorting(mockData));

    act(() => {
      result.current.setSortConfig('age', 'asc');
    });

    expect(result.current.sortedData[0].age).toBe(25);
    expect(result.current.sortedData[1].age).toBe(28);
    expect(result.current.sortedData[2].age).toBe(32);
    expect(result.current.sortedData[3].age).toBe(35);
  });

  it('deve ordenar números em ordem descendente', () => {
    const { result } = renderHook(() => useSorting(mockData));

    act(() => {
      result.current.setSortConfig('age', 'desc');
    });

    expect(result.current.sortedData[0].age).toBe(35);
    expect(result.current.sortedData[1].age).toBe(32);
    expect(result.current.sortedData[2].age).toBe(28);
    expect(result.current.sortedData[3].age).toBe(25);
  });

  it('deve ordenar datas em ordem ascendente', () => {
    const { result } = renderHook(() => useSorting(mockData));

    act(() => {
      result.current.setSortConfig('createdAt', 'asc');
    });

    expect(result.current.sortedData[0].createdAt.getTime()).toBe(new Date('2023-01-15').getTime());
    expect(result.current.sortedData[1].createdAt.getTime()).toBe(new Date('2023-02-20').getTime());
    expect(result.current.sortedData[2].createdAt.getTime()).toBe(new Date('2023-03-10').getTime());
    expect(result.current.sortedData[3].createdAt.getTime()).toBe(new Date('2023-04-05').getTime());
  });

  it('deve ordenar datas em ordem descendente', () => {
    const { result } = renderHook(() => useSorting(mockData));

    act(() => {
      result.current.setSortConfig('createdAt', 'desc');
    });

    expect(result.current.sortedData[0].createdAt.getTime()).toBe(new Date('2023-04-05').getTime());
    expect(result.current.sortedData[1].createdAt.getTime()).toBe(new Date('2023-03-10').getTime());
    expect(result.current.sortedData[2].createdAt.getTime()).toBe(new Date('2023-02-20').getTime());
    expect(result.current.sortedData[3].createdAt.getTime()).toBe(new Date('2023-01-15').getTime());
  });

  it('deve alternar direção ao chamar handleSort no mesmo campo', () => {
    const { result } = renderHook(() => useSorting(mockData));

    // Primeira chamada - define ascendente
    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.sortedData[0].name).toBe('Ana Oliveira');

    // Segunda chamada no mesmo campo - alterna para descendente
    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('desc');
    expect(result.current.sortedData[0].name).toBe('Diana Costa');

    // Terceira chamada no mesmo campo - volta para ascendente
    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.sortedData[0].name).toBe('Ana Oliveira');
  });

  it('deve resetar para ascendente ao mudar para novo campo', () => {
    const { result } = renderHook(() => useSorting(mockData));

    // Primeira chamada - define ascendente
    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortDirection).toBe('asc');

    // Segunda chamada no mesmo campo - alterna para descendente
    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortDirection).toBe('desc');

    // Mudar para outro campo - deve resetar para ascendente
    act(() => {
      result.current.handleSort('age');
    });

    expect(result.current.sortField).toBe('age');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.sortedData[0].age).toBe(25);
  });

  it('deve tratar valores mistos como strings', () => {
    const mixedData = [
      { id: 1, value: 'string' },
      { id: 2, value: 42 },
      { id: 3, value: 'another' },
      { id: 4, value: 10 }
    ];

    const { result } = renderHook(() => useSorting(mixedData));

    act(() => {
      result.current.setSortConfig('value', 'asc');
    });

    // Ordenação por string quando tipos são mistos
    const sortedValues = result.current.sortedData.map(item => String(item.value));
    expect(sortedValues).toEqual(['10', '42', 'another', 'string']);
  });

  it('deve manter ordem original quando campo de ordenação está vazio', () => {
    const { result } = renderHook(() => useSorting(mockData));

    expect(result.current.sortField).toBe('');
    expect(result.current.sortedData).toEqual(mockData);
  });

  it('deve atualizar dados ordenados quando dados de entrada mudam', () => {
    let data = mockData.slice(0, 2);
    const { result, rerender } = renderHook(
      ({ data }) => useSorting(data, 'name', 'asc'),
      { initialProps: { data } }
    );

    expect(result.current.sortedData).toHaveLength(2);
    expect(result.current.sortedData[0].name).toBe('Ana Oliveira');

    // Adicionar mais dados
    data = [...mockData];
    rerender({ data });

    expect(result.current.sortedData).toHaveLength(4);
    expect(result.current.sortedData[0].name).toBe('Ana Oliveira');
    expect(result.current.sortedData[3].name).toBe('Diana Costa');
  });

  it('deve funcionar com dados vazios', () => {
    const { result } = renderHook(() => useSorting([]));

    expect(result.current.sortedData).toEqual([]);

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortedData).toEqual([]);
  });

  it('deve manter a configuração de ordenação entre re-renders', () => {
    const { result } = renderHook(() => useSorting(mockData));

    act(() => {
      result.current.setSortConfig('age', 'desc');
    });

    expect(result.current.sortField).toBe('age');
    expect(result.current.sortDirection).toBe('desc');
    expect(result.current.sortedData[0].age).toBe(35);
  });

  it('deve tratar campos inexistentes graciosamente', () => {
    const { result } = renderHook(() => useSorting(mockData));

    act(() => {
      result.current.setSortConfig('nonExistentField', 'asc');
    });

    // Deve retornar os dados na ordem original quando o campo não existe
    expect(result.current.sortedData).toEqual(mockData);
  });

  it('deve funcionar com propriedades aninhadas como strings', () => {
    const nestedData = [
      { id: 1, details: { name: 'Carlos' } },
      { id: 2, details: { name: 'Ana' } },
      { id: 3, details: { name: 'Bruno' } }
    ];

    const { result } = renderHook(() => useSorting(nestedData));

    act(() => {
      result.current.setSortConfig('details', 'asc');
    });

    // Como o campo é um objeto, será convertido para string para comparação
    expect(result.current.sortedData).toBeDefined();
    expect(result.current.sortedData).toHaveLength(3);
  });
}); 
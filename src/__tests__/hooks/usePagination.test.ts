import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../../hooks/usePagination';

describe('usePagination', () => {
  const mockData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: i + 1
  }));

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => usePagination(mockData));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.totalItems).toBe(50);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(9);
    expect(result.current.paginatedData).toHaveLength(10);
    expect(result.current.pageSizeOptions).toEqual([5, 10, 20, 50, 100]);
  });

  it('deve aceitar configurações iniciais personalizadas', () => {
    const options = {
      initialPage: 2,
      initialPageSize: 20,
      pageSizeOptions: [10, 20, 30]
    };
    
    const { result } = renderHook(() => usePagination(mockData, options));

    expect(result.current.currentPage).toBe(2);
    expect(result.current.pageSize).toBe(20);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.pageSizeOptions).toEqual([10, 20, 30]);
    expect(result.current.startIndex).toBe(20);
    expect(result.current.endIndex).toBe(39);
  });

  it('deve navegar para uma página específica', () => {
    const { result } = renderHook(() => usePagination(mockData));

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.startIndex).toBe(20);
    expect(result.current.endIndex).toBe(29);
    expect(result.current.paginatedData[0]).toEqual({ id: 21, name: 'Item 21', value: 21 });
  });

  it('deve limitar a navegação a páginas válidas', () => {
    const { result } = renderHook(() => usePagination(mockData));

    // Tentar ir para página inválida (muito alta)
    act(() => {
      result.current.goToPage(10);
    });
    expect(result.current.currentPage).toBe(5); // Última página válida

    // Tentar ir para página inválida (muito baixa)
    act(() => {
      result.current.goToPage(-1);
    });
    expect(result.current.currentPage).toBe(1); // Primeira página válida
  });

  it('deve navegar para próxima página', () => {
    const { result } = renderHook(() => usePagination(mockData));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);

    // Ir para última página
    act(() => {
      result.current.goToPage(5);
    });

    // Tentar avançar além da última página
    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(5); // Deve permanecer na última página
  });

  it('deve navegar para página anterior', () => {
    const { result } = renderHook(() => usePagination(mockData, { initialPage: 3 }));

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(2);

    // Ir para primeira página
    act(() => {
      result.current.goToPage(1);
    });

    // Tentar retroceder além da primeira página
    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(1); // Deve permanecer na primeira página
  });

  it('deve alterar o tamanho da página e ajustar a página atual', () => {
    const { result } = renderHook(() => usePagination(mockData, { initialPage: 3 }));

    // Página 3 com 10 itens por página = itens 21-30
    expect(result.current.currentPage).toBe(3);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.startIndex).toBe(20);

    act(() => {
      result.current.setPageSize(20);
    });

    // Com 20 itens por página, os itens 21-30 agora estão na página 2
    expect(result.current.pageSize).toBe(20);
    expect(result.current.currentPage).toBe(2);
    expect(result.current.totalPages).toBe(3);
  });

  it('deve recalcular páginas quando os dados mudam', () => {
    let data = mockData.slice(0, 25); // 25 itens
    const { result, rerender } = renderHook(
      ({ data }) => usePagination(data),
      { initialProps: { data } }
    );

    expect(result.current.totalPages).toBe(3);
    expect(result.current.totalItems).toBe(25);

    // Mudança nos dados - menos itens
    data = mockData.slice(0, 15); // 15 itens
    rerender({ data });

    expect(result.current.totalPages).toBe(2);
    expect(result.current.totalItems).toBe(15);
  });

  it('deve ajustar página atual quando ela se torna inválida após mudança de dados', () => {
    let data = mockData; // 50 itens, 5 páginas
    const { result, rerender } = renderHook(
      ({ data }) => usePagination(data),
      { initialProps: { data } }
    );

    // Ir para última página
    act(() => {
      result.current.goToPage(5);
    });
    expect(result.current.currentPage).toBe(5);

    // Reduzir dados para que só existam 2 páginas
    data = mockData.slice(0, 15); // 15 itens, 2 páginas
    rerender({ data });

    expect(result.current.totalPages).toBe(2);
    expect(result.current.currentPage).toBe(2); // Ajustado para última página válida
  });

  it('deve funcionar com dados vazios', () => {
    const { result } = renderHook(() => usePagination([]));

    expect(result.current.totalPages).toBe(1);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.paginatedData).toEqual([]);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(-1);
  });

  it('deve manter consistência dos índices em todas as páginas', () => {
    const { result } = renderHook(() => usePagination(mockData, { initialPageSize: 7 }));

    // Página 1: índices 0-6
    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(6);
    expect(result.current.paginatedData).toHaveLength(7);

    // Página 2: índices 7-13
    act(() => {
      result.current.nextPage();
    });
    expect(result.current.startIndex).toBe(7);
    expect(result.current.endIndex).toBe(13);
    expect(result.current.paginatedData).toHaveLength(7);

    // Última página: pode ter menos itens
    act(() => {
      result.current.goToPage(8); // 50 itens / 7 = ~7.14, então 8 páginas
    });
    expect(result.current.startIndex).toBe(49);
    expect(result.current.endIndex).toBe(49);
    expect(result.current.paginatedData).toHaveLength(1);
  });

  it('deve preservar a posição relativa ao mudar o tamanho da página', () => {
    const { result } = renderHook(() => usePagination(mockData));

    // Ir para página 4 (itens 31-40)
    act(() => {
      result.current.goToPage(4);
    });
    expect(result.current.startIndex).toBe(30);

    // Mudar para 20 itens por página
    act(() => {
      result.current.setPageSize(20);
    });

    // O item 31 (índice 30) agora deve estar na página 2 (itens 21-40)
    expect(result.current.currentPage).toBe(2);
    expect(result.current.startIndex).toBe(20);
    expect(result.current.endIndex).toBe(39);
  });
}); 
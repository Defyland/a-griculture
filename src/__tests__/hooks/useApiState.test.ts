import { renderHook, act } from '@testing-library/react';
import { jest } from '@jest/globals';
import { useApiState } from '../../hooks/useApiState';

describe('useApiState Hook', () => {
  test('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useApiState());
    
    expect(result.current[0]).toEqual({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  });

  test('deve inicializar com dados iniciais fornecidos', () => {
    const initialData = { id: 1, name: 'Teste' };
    const { result } = renderHook(() => useApiState(initialData));
    
    expect(result.current[0].data).toEqual(initialData);
  });

  test('deve atualizar o estado de dados', () => {
    const { result } = renderHook(() => useApiState<{ id: number; name: string }>());
    const [, actions] = result.current;
    
    const newData = { id: 1, name: 'Novo Nome' };
    
    act(() => {
      actions.setData(newData);
    });
    
    expect(result.current[0].data).toEqual(newData);
  });

  test('deve atualizar o estado de loading', () => {
    const { result } = renderHook(() => useApiState());
    const [, actions] = result.current;
    
    act(() => {
      actions.setLoading(true);
    });
    
    expect(result.current[0].loading).toBe(true);
    
    act(() => {
      actions.setLoading(false);
    });
    
    expect(result.current[0].loading).toBe(false);
  });

  test('deve atualizar o estado de error', () => {
    const { result } = renderHook(() => useApiState());
    const [, actions] = result.current;
    
    const errorMessage = 'Erro ao carregar dados';
    
    act(() => {
      actions.setError(errorMessage);
    });
    
    expect(result.current[0].error).toBe(errorMessage);
    expect(result.current[0].success).toBe(false); // erro deve limpar sucesso
  });

  test('deve atualizar o estado de success', () => {
    const { result } = renderHook(() => useApiState());
    const [, actions] = result.current;
    
    act(() => {
      actions.setSuccess(true);
    });
    
    expect(result.current[0].success).toBe(true);
    expect(result.current[0].error).toBe(null); // sucesso deve limpar erro
  });

  test('deve resetar o estado para o valor inicial', () => {
    const initialData = { id: 1, name: 'Inicial' };
    const { result } = renderHook(() => useApiState(initialData));
    const [, actions] = result.current;
    
    // Alterando o estado
    act(() => {
      actions.setData({ id: 2, name: 'Alterado' });
      actions.setLoading(true);
      actions.setError('Algum erro');
    });
    
    // Resetando
    act(() => {
      actions.reset();
    });
    
    // Verificando se voltou ao estado inicial
    expect(result.current[0]).toEqual({
      data: initialData,
      loading: false,
      error: null,
      success: false,
    });
  });

  test('deve gerenciar o estado ao executar uma chamada de API com sucesso', async () => {
    const { result } = renderHook(() => useApiState<string>());
    const [, actions] = result.current;
    
    const successData = 'Dados carregados com sucesso';
    const mockApiCall = jest.fn<() => Promise<string>>().mockResolvedValue(successData);
    const onSuccess = jest.fn();
    
    await act(async () => {
      await actions.executeApiCall(mockApiCall, onSuccess);
    });
    
    expect(result.current[0].loading).toBe(false);
    expect(result.current[0].success).toBe(true);
    expect(result.current[0].error).toBe(null);
    expect(onSuccess).toHaveBeenCalledWith(successData);
  });

  test('deve gerenciar o estado ao executar uma chamada de API com erro', async () => {
    const { result } = renderHook(() => useApiState());
    const [, actions] = result.current;
    
    const errorMessage = 'Erro na API';
    const mockApiCall = jest.fn<() => Promise<never>>().mockRejectedValue(new Error(errorMessage));
    const onError = jest.fn();
    
    await act(async () => {
      await actions.executeApiCall(mockApiCall, undefined, onError);
    });
    
    expect(result.current[0].loading).toBe(false);
    expect(result.current[0].success).toBe(false);
    expect(result.current[0].error).toBe(errorMessage);
    expect(onError).toHaveBeenCalled();
  });

  test('deve lidar com erros desconhecidos', async () => {
    const { result } = renderHook(() => useApiState());
    const [, actions] = result.current;
    
    // Simulando um erro que não é uma instância de Error
    const mockApiCall = jest.fn<() => Promise<never>>().mockRejectedValue('string error');
    
    await act(async () => {
      await actions.executeApiCall(mockApiCall);
    });
    
    expect(result.current[0].error).toBe('Ocorreu um erro inesperado');
  });
}); 
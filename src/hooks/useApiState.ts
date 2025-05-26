import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface ApiStateActions<T> {
  setData: (data: T) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  reset: () => void;
  executeApiCall: <R>(
    apiCall: () => Promise<R>,
    onSuccess?: (data: R) => void,
    onError?: (error: unknown) => void
  ) => Promise<R | null>;
}

/**
 * Hook personalizado para gerenciar estados comuns de chamadas de API
 * Controla loading, error, success e dados
 */
export function useApiState<T>(initialData: T | null = null): [ApiState<T>, ApiStateActions<T>] {
  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
    success: false,
  });

  const setData = useCallback((data: T) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error, success: false }));
  }, []);

  const setSuccess = useCallback((success: boolean) => {
    setState((prev) => ({ ...prev, success, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: null,
      success: false,
    });
  }, [initialData]);

  /**
   * Executa uma chamada de API com gerenciamento automático de estado
   * Define loading, error e success conforme o resultado
   */
  const executeApiCall = useCallback(
    async <R>(
      apiCall: () => Promise<R>,
      onSuccess?: (data: R) => void,
      onError?: (error: unknown) => void
    ): Promise<R | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall();
        setSuccess(true);
        setLoading(false);
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (error: unknown) {
        setLoading(false);
        
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Ocorreu um erro inesperado';
          
        setError(errorMessage);
        
        if (onError) {
          onError(error);
        }
        
        return null;
      }
    },
    [setLoading, setError, setSuccess]
  );

  const actions: ApiStateActions<T> = {
    setData,
    setLoading,
    setError,
    setSuccess,
    reset,
    executeApiCall,
  };

  return [state, actions];
} 
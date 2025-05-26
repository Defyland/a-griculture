import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseFormSubmitOptions {
  successMessage: string;
  redirectPath?: string;
  redirectDelay?: number;
}

interface UseFormSubmitReturn {
  loading: boolean;
  successMessage: string;
  handleSubmit: <T>(submitFn: () => Promise<T>) => Promise<T | undefined>;
  clearSuccessMessage: () => void;
}

/**
 * Hook personnalisé pour gérer la soumission de formulaires avec gestion d'état de chargement,
 * messages de succès et redirection.
 */
export const useFormSubmit = (options: UseFormSubmitOptions): UseFormSubmitReturn => {
  const { successMessage, redirectPath, redirectDelay = 1500 } = options;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async <T>(submitFn: () => Promise<T>): Promise<T | undefined> => {
    setLoading(true);
    try {
      console.log('useFormSubmit: Iniciando submissão do formulário');
      const result = await submitFn();
      console.log('useFormSubmit: Submissão bem-sucedida', result);
      
      setMessage(successMessage);
      
      if (redirectPath) {
        console.log(`useFormSubmit: Redirecionando para ${redirectPath} em ${redirectDelay}ms`);
        setTimeout(() => {
          navigate(redirectPath);
        }, redirectDelay);
      }
      
      return result;
    } catch (error) {
      console.error('useFormSubmit: Erro na submissão', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const clearSuccessMessage = () => {
    setMessage('');
  };

  return {
    loading,
    successMessage: message,
    handleSubmit,
    clearSuccessMessage,
  };
};

export default useFormSubmit; 
export interface PageLoaderProps {
  /**
   * Tipo de loader a ser exibido
   * - spinner: exibe um spinner padrão
   * - dots: exibe dots com animação pulsante
   */
  type?: 'spinner' | 'dots';
  
  /**
   * Tamanho do loader
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Altura mínima do container
   */
  minHeight?: string;
}

export interface LoadingContainerProps {
  minHeight?: string;
} 
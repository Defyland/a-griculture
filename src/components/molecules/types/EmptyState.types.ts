export interface EmptyStateProps {
  /**
   * Título do estado vazio
   */
  title: string;
  
  /**
   * Mensagem do estado vazio
   */
  message?: string;
  
  /**
   * Emoji ou ícone a ser exibido
   */
  icon?: string;
  
  /**
   * Texto do botão primário
   */
  buttonText?: string;
  
  /**
   * Função a ser executada ao clicar no botão primário
   */
  buttonAction?: () => void;
  
  /**
   * Texto do botão secundário
   */
  secondaryButtonText?: string;
  
  /**
   * Função a ser executada ao clicar no botão secundário
   */
  secondaryButtonAction?: () => void;
  
  /**
   * Determina se é um estado de erro
   */
  isError?: boolean;
}

export interface IconContainerProps {
  isError: boolean;
}

export interface ButtonContainerProps {
  isSecondary?: boolean;
} 
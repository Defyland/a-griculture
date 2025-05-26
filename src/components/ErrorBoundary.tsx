import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Typography, Button } from './atoms';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
`;

const ErrorCard = styled(Card)`
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.danger};
`;

const ErrorTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.danger};
`;

const ErrorMessage = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// Wrapper estilizado para o pré-formatado
const ErrorDetailsWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-align: left;
  overflow: auto;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: monospace;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    });
    
    // Você pode logar o erro em um serviço de reportamento de erros aqui
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Componente personalizado de fallback ou o fallback fornecido como prop
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <ErrorContainer>
          <ErrorCard>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorTitle variant="h3">Ops! Algo deu errado</ErrorTitle>
            <ErrorMessage>
              Encontramos um problema ao carregar esta página. Nossos desenvolvedores foram notificados.
            </ErrorMessage>
            
            {this.state.error && (
              <ErrorDetailsWrapper>
                <Typography variant="caption" noMargin>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </Typography>
              </ErrorDetailsWrapper>
            )}
            
            <ActionsContainer>
              <Button 
                variant="primary" 
                onClick={() => window.location.reload()}
              >
                Recarregar página
              </Button>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="outlined" 
                >
                  Voltar para o Dashboard
                </Button>
              </Link>
            </ActionsContainer>
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 
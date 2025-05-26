import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import ErrorBoundary from '../../components/ErrorBoundary';
import { theme } from '../../styles/theme';

// Componente que propositalmente lança um erro para testar o ErrorBoundary
const ErrorComponent = (): React.ReactElement => {
  throw new Error('Erro de teste');
  return <div>Este texto nunca será renderizado</div>;
};

// Mock do console.error para evitar logs durante os testes
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary Component', () => {
  test('renderiza children normalmente quando não há erro', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary>
            <div data-testid="child-component">Componente filho</div>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('child-component')).toBeInTheDocument();
  });

  test('renderiza o componente de fallback quando ocorre um erro', () => {
    // Suprimir console.error para este teste
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary>
            <ErrorComponent />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    // Verificar se o fallback foi renderizado
    expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
    expect(screen.getByText('Encontramos um problema ao carregar esta página. Nossos desenvolvedores foram notificados.')).toBeInTheDocument();
    
    // Verificar se os botões são renderizados
    expect(screen.getByText('Recarregar página')).toBeInTheDocument();
    expect(screen.getByText('Voltar para o Dashboard')).toBeInTheDocument();
  });

  test('renderiza o fallback customizado quando fornecido', () => {
    // Suprimir console.error para este teste
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const customFallback = <div data-testid="custom-fallback">Erro customizado</div>;
    
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary fallback={customFallback}>
            <ErrorComponent />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    // Verificar se o fallback customizado foi renderizado
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Erro customizado')).toBeInTheDocument();
  });
}); 
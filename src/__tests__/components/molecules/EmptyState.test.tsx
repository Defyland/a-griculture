import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('EmptyState', () => {
  it('deve renderizar título corretamente', () => {
    renderWithTheme(
      <EmptyState title="Nenhum item encontrado" />
    );
    
    expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument();
  });

  it('deve renderizar mensagem quando fornecida', () => {
    renderWithTheme(
      <EmptyState 
        title="Sem dados" 
        message="Não há dados para exibir no momento" 
      />
    );
    
    expect(screen.getByText('Sem dados')).toBeInTheDocument();
    expect(screen.getByText('Não há dados para exibir no momento')).toBeInTheDocument();
  });

  it('deve renderizar ícone quando fornecido', () => {
    renderWithTheme(
      <EmptyState 
        title="Sem dados" 
        icon="📄"
      />
    );
    
    expect(screen.getByText('📄')).toBeInTheDocument();
  });

  it('deve renderizar botão de ação quando fornecido', () => {
    const mockAction = jest.fn();
    
    renderWithTheme(
      <EmptyState 
        title="Sem dados" 
        buttonText="Adicionar item"
        buttonAction={mockAction}
      />
    );
    
    const button = screen.getByText('Adicionar item');
    expect(button).toBeInTheDocument();
  });

  it('deve chamar buttonAction quando botão é clicado', () => {
    const mockAction = jest.fn();
    
    renderWithTheme(
      <EmptyState 
        title="Sem dados" 
        buttonText="Adicionar"
        buttonAction={mockAction}
      />
    );
    
    const button = screen.getByText('Adicionar');
    fireEvent.click(button);
    
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
}); 
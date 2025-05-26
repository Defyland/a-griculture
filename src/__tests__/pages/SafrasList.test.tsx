import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import SafrasList from '../../pages/SafrasList';
import { theme } from '../../styles/theme';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ThemeProvider>
  );
};

describe('SafrasList', () => {
  it('deve renderizar a lista de safras', () => {
    renderWithProviders(<SafrasList />);
    
    expect(screen.getByRole('heading', { name: 'Safras' })).toBeInTheDocument();
  });

  it('deve renderizar controles da página', () => {
    renderWithProviders(<SafrasList />);
    
    // Verifica se tem input de pesquisa
    expect(screen.getByPlaceholderText(/pesquisar safras/i)).toBeInTheDocument();
    
    // Verifica se tem select de status
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('deve renderizar botão de adicionar', () => {
    renderWithProviders(<SafrasList />);
    
    const addButton = screen.getByRole('button', { name: /adicionar safra/i });
    expect(addButton).toBeInTheDocument();
  });
}); 
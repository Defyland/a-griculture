import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import SafraDetails from '../../pages/SafraDetails';
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

describe('SafraDetails', () => {
  it('deve renderizar mensagem quando ID não é fornecido', () => {
    renderWithProviders(<SafraDetails />);
    
    expect(screen.getByText('ID da safra não fornecido')).toBeInTheDocument();
  });

  it('deve renderizar página principal', () => {
    renderWithProviders(<SafraDetails />);
    
    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
  });

  it('deve renderizar botão de voltar', () => {
    renderWithProviders(<SafraDetails />);
    
    const backButton = screen.getByRole('button', { name: /voltar para safras/i });
    expect(backButton).toBeInTheDocument();
  });
}); 
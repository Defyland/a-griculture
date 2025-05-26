import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SelecionarProdutor from '../../pages/SelecionarProdutor';
import { theme } from '../../styles/theme';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('SelecionarProdutor', () => {
  it('deve renderizar página de seleção de produtor', () => {
    renderWithProviders(<SelecionarProdutor />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('deve renderizar navegação do header', () => {
    renderWithProviders(<SelecionarProdutor />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Produtores')).toBeInTheDocument();
  });

  it('deve renderizar estrutura da página', () => {
    renderWithProviders(<SelecionarProdutor />);
    
    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
  });
}); 
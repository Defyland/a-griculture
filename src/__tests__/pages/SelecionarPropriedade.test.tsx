import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SelecionarPropriedade from '../../pages/SelecionarPropriedade';
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

describe('SelecionarPropriedade', () => {
  it('deve renderizar página de seleção de propriedade', () => {
    renderWithProviders(<SelecionarPropriedade />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('deve renderizar navegação no cabeçalho', () => {
    renderWithProviders(<SelecionarPropriedade />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('deve renderizar estrutura da página', () => {
    renderWithProviders(<SelecionarPropriedade />);
    
    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
  });
}); 
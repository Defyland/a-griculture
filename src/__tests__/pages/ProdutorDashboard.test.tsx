import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ProdutorDashboard from '../../pages/ProdutorDashboard';
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

describe('ProdutorDashboard', () => {
  it('deve renderizar o dashboard do produtor', () => {
    renderWithProviders(<ProdutorDashboard />);
    
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('deve renderizar estatísticas', () => {
    renderWithProviders(<ProdutorDashboard />);
    
    const propriedadesElements = screen.getAllByText('Propriedades');
    expect(propriedadesElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText('Área Total')).toBeInTheDocument();
  });

  it('deve renderizar gráficos', () => {
    renderWithProviders(<ProdutorDashboard />);
    
    const usoTerraElements = screen.getAllByText('Uso da Terra');
    expect(usoTerraElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText('Culturas por Safra')).toBeInTheDocument();
  });
}); 
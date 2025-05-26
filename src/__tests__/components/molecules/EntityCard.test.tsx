import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { EntityCard } from '../../../components/molecules/EntityCard';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('EntityCard', () => {
  it('deve renderizar título', () => {
    renderWithTheme(
      <EntityCard 
        id="test-card" 
        title="Entidade Teste" 
        mainContent={<div>Conteúdo</div>}
      />
    );
    
    expect(screen.getByText('Entidade Teste')).toBeInTheDocument();
  });

  it('deve renderizar mainContent quando fornecido', () => {
    renderWithTheme(
      <EntityCard 
        id="test-card"
        title="Entidade"
        mainContent={<div data-testid="content">Conteúdo</div>}
      />
    );
    
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('deve aplicar className personalizado', () => {
    const { container } = renderWithTheme(
      <EntityCard 
        id="test-card" 
        title="Entidade" 
        className="custom-card"
        mainContent={<div>Conteúdo</div>}
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-card');
  });
}); 
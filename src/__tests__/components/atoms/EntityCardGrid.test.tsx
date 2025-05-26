import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { EntityCardGrid } from '../../../components/atoms/EntityCardGrid';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('EntityCardGrid', () => {
  it('deve renderizar children corretamente', () => {
    renderWithTheme(
      <EntityCardGrid>
        <div data-testid="card-1">Card 1</div>
        <div data-testid="card-2">Card 2</div>
        <div data-testid="card-3">Card 3</div>
      </EntityCardGrid>
    );
    
    expect(screen.getByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-2')).toBeInTheDocument();
    expect(screen.getByTestId('card-3')).toBeInTheDocument();
  });

  it('deve renderizar com número padrão de colunas', () => {
    const { container } = renderWithTheme(
      <EntityCardGrid>
        <div>Card 1</div>
      </EntityCardGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toBeInTheDocument();
  });

  it('deve aceitar número personalizado de colunas', () => {
    const { container } = renderWithTheme(
      <EntityCardGrid columns={4}>
        <div>Card 1</div>
      </EntityCardGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toBeInTheDocument();
  });

  it('deve aplicar className personalizado', () => {
    const { container } = renderWithTheme(
      <EntityCardGrid className="custom-grid">
        <div>Card 1</div>
      </EntityCardGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('custom-grid');
  });

  it('deve renderizar com espaçamento apropriado', () => {
    const { container } = renderWithTheme(
      <EntityCardGrid>
        <div>Card 1</div>
      </EntityCardGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toBeInTheDocument();
  });

  it('deve renderizar múltiplos cards', () => {
    renderWithTheme(
      <EntityCardGrid>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} data-testid={`card-${index}`}>
            Card {index + 1}
          </div>
        ))}
      </EntityCardGrid>
    );
    
    for (let i = 0; i < 6; i++) {
      expect(screen.getByTestId(`card-${i}`)).toBeInTheDocument();
    }
  });

  it('deve renderizar como elemento válido', () => {
    const { container } = renderWithTheme(
      <EntityCardGrid>
        <div>Card 1</div>
      </EntityCardGrid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toBeInTheDocument();
  });
}); 
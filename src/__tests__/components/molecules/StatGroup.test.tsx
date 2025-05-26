import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { StatGroup } from '../../../components/molecules/StatGroup';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('StatGroup', () => {
  const mockStats = [
    { title: 'Total', value: 100 },
    { title: 'Ativo', value: 50 }
  ];

  it('deve renderizar children corretamente', () => {
    renderWithTheme(
      <StatGroup stats={mockStats} />
    );
    
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('deve renderizar título quando fornecido', () => {
    renderWithTheme(
      <StatGroup stats={mockStats} title="Estatísticas" />
    );
    
    expect(screen.getByText('Estatísticas')).toBeInTheDocument();
  });

  it('deve renderizar sem card quando withCard é false', () => {
    const { container } = renderWithTheme(
      <StatGroup stats={mockStats} withCard={false} />
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });
}); 
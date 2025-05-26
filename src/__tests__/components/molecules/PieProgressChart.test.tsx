import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { PieProgressChart } from '../../../components/molecules/PieProgressChart';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('PieProgressChart', () => {
  it('deve renderizar gráfico de pizza', () => {
    const data = [
      { name: 'Item 1', value: 75, color: '#ff0000' },
      { name: 'Item 2', value: 25, color: '#00ff00' }
    ];
    
    renderWithTheme(
      <PieProgressChart data={data} />
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('deve renderizar título quando fornecido', () => {
    const data = [{ name: 'Item', value: 100, color: '#ff0000' }];
    
    renderWithTheme(
      <PieProgressChart data={data} title="Distribuição" />
    );
    
    expect(screen.getByText('Distribuição')).toBeInTheDocument();
  });
}); 
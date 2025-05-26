import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ProgressBarChart } from '../../../components/molecules/ProgressBarChart';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ProgressBarChart', () => {
  it('deve renderizar gráfico de barras de progresso', () => {
    const data = [
      { name: 'Item 1', value: 75, color: '#ff6b6b' },
      { name: 'Item 2', value: 50, color: '#4ecdc4' }
    ];
    
    renderWithTheme(
      <ProgressBarChart data={data} />
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('deve renderizar título quando fornecido', () => {
    const data = [{ name: 'Item', value: 50, color: '#ff6b6b' }];
    
    renderWithTheme(
      <ProgressBarChart data={data} title="Progresso" />
    );
    
    expect(screen.getByText('Progresso')).toBeInTheDocument();
  });
}); 
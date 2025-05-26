import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { StatCard } from '../../../components/molecules/StatCard';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('StatCard', () => {
  it('deve renderizar título e valor', () => {
    renderWithTheme(
      <StatCard title="Total" value="100" />
    );
    
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('deve renderizar ícone quando fornecido', () => {
    const MockIcon = () => <span data-testid="mock-icon">📊</span>;
    
    renderWithTheme(
      <StatCard title="Total" value="100" icon={<MockIcon />} />
    );
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('deve renderizar variação quando fornecida', () => {
    renderWithTheme(
      <StatCard 
        title="Total" 
        value="100" 
        trend={{ value: 10, isPositive: true }} 
      />
    );
    
    expect(screen.getByText('10%')).toBeInTheDocument();
  });
}); 
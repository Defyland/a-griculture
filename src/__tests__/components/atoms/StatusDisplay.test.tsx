import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { StatusDisplay } from '../../../components/atoms/StatusDisplay';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('StatusDisplay', () => {
  it('deve renderizar status ativa', () => {
    renderWithTheme(
      <StatusDisplay status="ativa">Ativo</StatusDisplay>
    );
    
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('deve renderizar status concluida', () => {
    renderWithTheme(
      <StatusDisplay status="concluida">Concluído</StatusDisplay>
    );
    
    expect(screen.getByText('Concluído')).toBeInTheDocument();
  });

  it('deve renderizar status planejada', () => {
    renderWithTheme(
      <StatusDisplay status="planejada">Planejado</StatusDisplay>
    );
    
    expect(screen.getByText('Planejado')).toBeInTheDocument();
  });

  it('deve renderizar como elemento span', () => {
    renderWithTheme(
      <StatusDisplay status="ativa">Ativo</StatusDisplay>
    );
    
    const element = screen.getByText('Ativo');
    expect(element.tagName).toBe('SPAN');
  });
}); 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('PageHeader', () => {
  it('deve renderizar título', () => {
    renderWithTheme(
      <PageHeader title="Página de Teste" />
    );
    
    expect(screen.getByText('Página de Teste')).toBeInTheDocument();
  });

  it('deve renderizar subtítulo quando fornecido', () => {
    renderWithTheme(
      <PageHeader title="Título" subtitle="Subtítulo" />
    );
    
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo')).toBeInTheDocument();
  });

  it('deve renderizar ações quando fornecidas', () => {
    renderWithTheme(
      <PageHeader 
        title="Título" 
        actionButton={{
          label: 'Ação',
          onClick: () => {}
        }}
      />
    );
    
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Ação')).toBeInTheDocument();
  });
}); 
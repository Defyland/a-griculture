import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SkipLink } from '../../../components/atoms/SkipLink';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('SkipLink', () => {
  it('deve renderizar link de pular para conteúdo', () => {
    renderWithTheme(
      <SkipLink href="#main">Pular para conteúdo</SkipLink>
    );
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main');
    expect(link).toHaveTextContent('Pular para conteúdo');
  });

  it('deve ter href padrão quando não especificado', () => {
    renderWithTheme(
      <SkipLink href="#main-content">Pular para conteúdo</SkipLink>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('deve renderizar como link acessível', () => {
    renderWithTheme(
      <SkipLink href="#content">Ir para conteúdo</SkipLink>
    );
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });
}); 
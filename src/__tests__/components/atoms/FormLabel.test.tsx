import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { FormLabel } from '../../../components/atoms/FormLabel';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('FormLabel', () => {
  it('deve renderizar children corretamente', () => {
    renderWithTheme(
      <FormLabel>Nome completo</FormLabel>
    );
    
    expect(screen.getByText('Nome completo')).toBeInTheDocument();
  });

  it('deve renderizar como label HTML', () => {
    renderWithTheme(
      <FormLabel>Email</FormLabel>
    );
    
    const label = screen.getByText('Email');
    expect(label.tagName).toBe('LABEL');
  });

  it('deve associar com input via htmlFor', () => {
    renderWithTheme(
      <FormLabel htmlFor="input-id">Campo</FormLabel>
    );
    
    const label = screen.getByText('Campo');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('deve renderizar label obrigatório', () => {
    renderWithTheme(
      <FormLabel required>Campo obrigatório</FormLabel>
    );
    
    const label = screen.getByText('Campo obrigatório');
    expect(label).toBeInTheDocument();
  });
}); 
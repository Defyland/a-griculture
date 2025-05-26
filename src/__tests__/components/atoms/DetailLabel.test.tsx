import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { DetailLabel } from '../../../components/atoms/DetailLabel';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('DetailLabel', () => {
  it('deve renderizar children corretamente', () => {
    renderWithTheme(
      <DetailLabel>Email:</DetailLabel>
    );
    
    expect(screen.getByText('Email:')).toBeInTheDocument();
  });

  it('deve renderizar como span HTML', () => {
    renderWithTheme(
      <DetailLabel>Nome:</DetailLabel>
    );
    
    const label = screen.getByText('Nome:');
    expect(label.tagName).toBe('SPAN');
  });

  it('deve renderizar className quando fornecido', () => {
    renderWithTheme(
      <DetailLabel className="custom-label">Label:</DetailLabel>
    );
    
    const label = screen.getByText('Label:');
    expect(label).toHaveClass('custom-label');
  });

  it('deve renderizar children complexos', () => {
    renderWithTheme(
      <DetailLabel>
        <span>Data de</span> <em>nascimento:</em>
      </DetailLabel>
    );
    
    expect(screen.getByText('Data de')).toBeInTheDocument();
    expect(screen.getByText('nascimento:')).toBeInTheDocument();
  });
}); 
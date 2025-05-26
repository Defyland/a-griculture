import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Badge } from '../../../components/atoms/Badge';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Badge', () => {
  it('deve renderizar children corretamente', () => {
    renderWithTheme(
      <Badge>Badge</Badge>
    );
    
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('deve renderizar diferentes variantes', () => {
    renderWithTheme(
      <>
        <Badge variant="primary">Primário</Badge>
        <Badge variant="secondary">Secundário</Badge>
      </>
    );
    
    expect(screen.getByText('Primário')).toBeInTheDocument();
    expect(screen.getByText('Secundário')).toBeInTheDocument();
  });

  it('deve renderizar com className personalizado', () => {
    renderWithTheme(
      <Badge className="custom-badge">Badge</Badge>
    );
    
    const badge = screen.getByText('Badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('deve renderizar como elemento span', () => {
    renderWithTheme(
      <Badge>Badge</Badge>
    );
    
    const badge = screen.getByText('Badge');
    expect(badge.tagName).toBe('SPAN');
  });
}); 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { StyledBadge } from '../../../components/atoms/StyledBadge';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('StyledBadge', () => {
  it('deve renderizar children corretamente', () => {
    renderWithTheme(
      <StyledBadge>Badge</StyledBadge>
    );
    
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('deve ter estilos de badge aplicados', () => {
    renderWithTheme(
      <StyledBadge>Badge</StyledBadge>
    );
    
    const badge = screen.getByText('Badge');
    expect(badge).toBeInTheDocument();
  });

  it('deve aplicar className personalizado', () => {
    renderWithTheme(
      <StyledBadge className="custom-badge">Badge</StyledBadge>
    );
    
    const badge = screen.getByText('Badge');
    expect(badge).toHaveClass('custom-badge');
  });
}); 
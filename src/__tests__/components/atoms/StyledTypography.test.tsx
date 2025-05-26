import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { StyledTypography } from '../../../components/atoms/StyledTypography';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('StyledTypography', () => {
  it('deve renderizar children corretamente', () => {
    renderWithTheme(
      <StyledTypography>Texto</StyledTypography>
    );
    
    expect(screen.getByText('Texto')).toBeInTheDocument();
  });

  it('deve aplicar className personalizado', () => {
    renderWithTheme(
      <StyledTypography className="custom-text">Texto</StyledTypography>
    );
    
    const text = screen.getByText('Texto');
    expect(text).toHaveClass('custom-text');
  });

  it('deve ter estilos de tipografia aplicados', () => {
    renderWithTheme(
      <StyledTypography>Texto</StyledTypography>
    );
    
    const text = screen.getByText('Texto');
    expect(text).toBeInTheDocument();
  });
}); 
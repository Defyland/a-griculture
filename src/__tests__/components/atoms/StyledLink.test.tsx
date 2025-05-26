import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { StyledLink } from '../../../components/atoms/StyledLink';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('StyledLink', () => {
  it('deve renderizar children corretamente', () => {
    renderWithTheme(
      <StyledLink>Clique aqui</StyledLink>
    );
    
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('deve executar onClick quando clicado', () => {
    const mockOnClick = jest.fn();
    renderWithTheme(
      <StyledLink onClick={mockOnClick}>Clique aqui</StyledLink>
    );
    
    const link = screen.getByText('Clique aqui');
    fireEvent.click(link);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar como span', () => {
    renderWithTheme(
      <StyledLink>Clique aqui</StyledLink>
    );
    
    const link = screen.getByText('Clique aqui');
    expect(link.tagName).toBe('SPAN');
  });
}); 
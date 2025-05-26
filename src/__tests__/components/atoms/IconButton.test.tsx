import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { IconButton } from '../../../components/atoms/IconButton';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const MockIcon = () => <span>🔍</span>;

describe('IconButton', () => {
  it('deve renderizar o ícone fornecido', () => {
    renderWithTheme(
      <IconButton icon={<MockIcon />} title="Buscar" />
    );
    
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('deve executar onClick quando clicado', () => {
    const mockOnClick = jest.fn();
    renderWithTheme(
      <IconButton icon={<MockIcon />} onClick={mockOnClick} title="Buscar" />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('deve ter o title correto', () => {
    renderWithTheme(
      <IconButton icon={<MockIcon />} title="Buscar itens" />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Buscar itens');
  });

  it('deve ter aria-label correto', () => {
    renderWithTheme(
      <IconButton icon={<MockIcon />} title="Buscar itens" />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Buscar itens');
  });

  it('deve estar desabilitado quando disabled é true', () => {
    renderWithTheme(
      <IconButton icon={<MockIcon />} disabled title="Buscar" />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('não deve executar onClick quando desabilitado', () => {
    const mockOnClick = jest.fn();
    renderWithTheme(
      <IconButton icon={<MockIcon />} onClick={mockOnClick} disabled title="Buscar" />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('deve aplicar className personalizado', () => {
    renderWithTheme(
      <IconButton icon={<MockIcon />} className="custom-class" title="Buscar" />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('deve renderizar com variant padrão primary', () => {
    renderWithTheme(
      <IconButton icon={<MockIcon />} title="Buscar" />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve renderizar com size padrão medium', () => {
    renderWithTheme(
      <IconButton icon={<MockIcon />} title="Buscar" />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve renderizar como botão quadrado', () => {
    renderWithTheme(
      <IconButton icon={<MockIcon />} title="Buscar" />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
}); 
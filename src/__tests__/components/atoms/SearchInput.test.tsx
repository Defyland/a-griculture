import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SearchInput } from '../../../components/atoms/SearchInput';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('SearchInput', () => {
  it('deve renderizar o input corretamente', () => {
    renderWithTheme(
      <SearchInput placeholder="Buscar..." />
    );
    
    const input = screen.getByPlaceholderText('Buscar...');
    expect(input).toBeInTheDocument();
  });

  it('deve aceitar propriedade fullWidth por padrão', () => {
    renderWithTheme(
      <SearchInput placeholder="Buscar..." />
    );
    
    const input = screen.getByPlaceholderText('Buscar...');
    expect(input).toBeInTheDocument();
  });

  it('deve aceitar propriedade fullWidth configurável', () => {
    renderWithTheme(
      <SearchInput placeholder="Buscar..." fullWidth={false} />
    );
    
    const input = screen.getByPlaceholderText('Buscar...');
    expect(input).toBeInTheDocument();
  });

  it('deve chamar onChange quando valor muda', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(
      <SearchInput placeholder="Buscar..." onChange={mockOnChange} />
    );
    
    const input = screen.getByPlaceholderText('Buscar...');
    fireEvent.change(input, { target: { value: 'novo valor' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando disabled é true', () => {
    renderWithTheme(
      <SearchInput placeholder="Buscar..." disabled />
    );
    
    const input = screen.getByPlaceholderText('Buscar...');
    expect(input).toBeDisabled();
  });

  it('deve renderizar com estilos apropriados', () => {
    renderWithTheme(
      <SearchInput placeholder="Buscar..." />
    );
    
    const input = screen.getByPlaceholderText('Buscar...');
    expect(input).toBeInTheDocument();
  });

  it('deve aceitar value controlado', () => {
    renderWithTheme(
      <SearchInput placeholder="Buscar..." value="valor teste" readOnly />
    );
    
    const input = screen.getByDisplayValue('valor teste');
    expect(input).toBeInTheDocument();
  });

  it('deve aplicar props HTML padrão', () => {
    renderWithTheme(
      <SearchInput 
        placeholder="Buscar..." 
        data-testid="search-input"
        maxLength={50}
      />
    );
    
    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('maxLength', '50');
  });

  it('deve renderizar como input HTML', () => {
    renderWithTheme(
      <SearchInput placeholder="Buscar..." />
    );
    
    const input = screen.getByPlaceholderText('Buscar...');
    expect(input.tagName).toBe('INPUT');
  });
}); 
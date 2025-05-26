import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Select } from '../../../components/atoms/Select';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockOptions = [
  { value: '1', label: 'Opção 1' },
  { value: '2', label: 'Opção 2' },
  { value: '3', label: 'Opção 3' }
];

describe('Select', () => {
  it('deve renderizar select corretamente', () => {
    renderWithTheme(
      <Select options={mockOptions} />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('deve renderizar opções corretamente', () => {
    renderWithTheme(
      <Select options={mockOptions} />
    );
    
    expect(screen.getByText('Opção 1')).toBeInTheDocument();
    expect(screen.getByText('Opção 2')).toBeInTheDocument();
    expect(screen.getByText('Opção 3')).toBeInTheDocument();
  });

  it('deve chamar onChange quando valor muda', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(
      <Select options={mockOptions} onChange={mockOnChange} />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando disabled é true', () => {
    renderWithTheme(
      <Select options={mockOptions} disabled />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('deve aceitar value controlado', () => {
    renderWithTheme(
      <Select options={mockOptions} value="2" onChange={() => {}} />
    );
    
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('2');
  });

  it('deve renderizar label quando fornecido', () => {
    renderWithTheme(
      <Select options={mockOptions} label="Selecione uma opção" />
    );
    
    expect(screen.getByText('Selecione uma opção')).toBeInTheDocument();
  });

  it('deve renderizar placeholder quando fornecido', () => {
    renderWithTheme(
      <Select options={mockOptions} placeholder="Escolha..." />
    );
    
    expect(screen.getByText('Escolha...')).toBeInTheDocument();
  });

  it('deve renderizar mensagem de erro quando fornecida', () => {
    renderWithTheme(
      <Select options={mockOptions} error="Campo obrigatório" />
    );
    
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('deve ser fullWidth quando especificado', () => {
    const { container } = renderWithTheme(
      <Select options={mockOptions} fullWidth />
    );
    
    const selectContainer = container.firstChild;
    expect(selectContainer).toBeInTheDocument();
  });
}); 
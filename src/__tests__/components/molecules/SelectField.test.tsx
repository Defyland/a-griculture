import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SelectField } from '../../../components/molecules/SelectField';
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
  { value: '2', label: 'Opção 2' }
];

describe('SelectField', () => {
  it('deve renderizar select field', () => {
    renderWithTheme(
      <SelectField options={mockOptions} label="Selecione uma opção" name="test-select" />
    );
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('deve renderizar label quando fornecido', () => {
    renderWithTheme(
      <SelectField options={mockOptions} label="Selecione" name="test-select" />
    );
    
    expect(screen.getByText('Selecione')).toBeInTheDocument();
  });

  it('deve chamar onChange quando valor muda', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(
      <SelectField options={mockOptions} label="Selecione uma opção" name="test-select" onChange={mockOnChange} />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
}); 
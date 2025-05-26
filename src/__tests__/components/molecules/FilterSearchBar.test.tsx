import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import FilterSearchBar from '../../../components/molecules/FilterSearchBar';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('FilterSearchBar', () => {
  it('deve renderizar campo de busca', () => {
    renderWithTheme(
      <FilterSearchBar searchTerm="" onSearchChange={jest.fn()} />
    );
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('deve chamar onSearchChange quando busca é realizada', () => {
    const mockOnSearch = jest.fn();
    renderWithTheme(
      <FilterSearchBar searchTerm="" onSearchChange={mockOnSearch} />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'teste' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('teste');
  });

  it('deve renderizar filtros quando fornecidos', () => {
    const filterOptions = [
      { 
        id: 'status',
        label: 'Status', 
        options: [
          { value: '', label: 'Todos' },
          { value: 'active', label: 'Ativo' }
        ] 
      }
    ];
    
    renderWithTheme(
      <FilterSearchBar 
        searchTerm="" 
        onSearchChange={jest.fn()} 
        filterOptions={filterOptions}
        filterValues={{}}
        onFilterChange={jest.fn()}
      />
    );
    
    expect(screen.getByDisplayValue('Todos')).toBeInTheDocument();
  });
}); 
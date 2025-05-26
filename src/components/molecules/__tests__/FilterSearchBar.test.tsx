import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import FilterSearchBar from '../FilterSearchBar';
import { theme } from '../../../styles/theme';
import type { FilterOption, SortOption, ViewOption } from '../types/FilterSearchBar.types';

describe('FilterSearchBar', () => {
  const mockViewOptions: ViewOption[] = [
    { id: 'card', label: 'Cartões', icon: '🗂️' },
    { id: 'table', label: 'Tabela', icon: '📊' }
  ];
  
  const mockSortOptions: SortOption[] = [
    { field: 'name', label: 'Nome' },
    { field: 'date', label: 'Data' }
  ];
  
  const mockFilterOptions: FilterOption[] = [
    { 
      id: 'status', 
      label: 'Status', 
      options: [
        { value: '', label: 'Todos' },
        { value: 'active', label: 'Ativo' },
        { value: 'inactive', label: 'Inativo' }
      ]
    },
    {
      id: 'type',
      label: 'Tipo',
      options: [
        { value: '', label: 'Todos' },
        { value: 'type1', label: 'Tipo 1' },
        { value: 'type2', label: 'Tipo 2' }
      ]
    }
  ];
  
  const defaultProps = {
    searchTerm: '',
    onSearchChange: jest.fn()
  };
  
  const renderFilterSearchBar = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <FilterSearchBar {...defaultProps} {...props} />
      </ThemeProvider>
    );
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renderiza o campo de busca corretamente', () => {
    renderFilterSearchBar();
    
    const searchInput = screen.getByPlaceholderText('Pesquisar...');
    expect(searchInput).toBeInTheDocument();
  });
  
  it('chama onSearchChange quando o usuário digita no campo de busca', () => {
    renderFilterSearchBar();
    
    const searchInput = screen.getByPlaceholderText('Pesquisar...');
    fireEvent.change(searchInput, { target: { value: 'teste' } });
    
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('teste');
  });
  
  it('exibe o botão de limpar quando há texto no campo de busca', () => {
    renderFilterSearchBar({ searchTerm: 'teste' });
    
    const clearButton = screen.getByText('Limpar');
    expect(clearButton).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('');
  });
  
  it('não exibe o botão de limpar quando o campo de busca está vazio', () => {
    renderFilterSearchBar();
    
    expect(screen.queryByText('Limpar')).not.toBeInTheDocument();
  });
  
  it('renderiza as opções de visualização quando fornecidas', () => {
    const onViewChange = jest.fn();
    renderFilterSearchBar({ 
      viewOptions: mockViewOptions,
      currentView: 'card',
      onViewChange
    });
    
    expect(screen.getByText(/Cartões/)).toBeInTheDocument();
    expect(screen.getByText(/Tabela/)).toBeInTheDocument();
    
    // Clique em uma opção de visualização
    fireEvent.click(screen.getByText(/Tabela/));
    expect(onViewChange).toHaveBeenCalledWith('table');
  });
  
  it('renderiza as opções de ordenação quando fornecidas', () => {
    const onSortChange = jest.fn();
    renderFilterSearchBar({
      sortOptions: mockSortOptions,
      sortField: 'name',
      sortDirection: 'asc',
      onSortChange,
      searchOnly: false
    });
    
    expect(screen.getByText(/Nome/)).toBeInTheDocument();
    expect(screen.getByText(/Data/)).toBeInTheDocument();
    
    // Clique em uma opção de ordenação
    fireEvent.click(screen.getByText(/Data/));
    expect(onSortChange).toHaveBeenCalledWith('date');
  });
  
  it('renderiza os filtros quando fornecidos', () => {
    const onFilterChange = jest.fn();
    renderFilterSearchBar({
      filterOptions: mockFilterOptions,
      filterValues: { status: 'active' },
      onFilterChange,
      searchOnly: false
    });
    
    // Selecionar uma opção em um filtro
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBe(2);
    
    fireEvent.change(selects[0], { target: { value: 'inactive' } });
    expect(onFilterChange).toHaveBeenCalledWith('status', 'inactive');
  });
  
  it('não renderiza filtros e ordenação quando searchOnly é true', () => {
    renderFilterSearchBar({
      sortOptions: mockSortOptions,
      filterOptions: mockFilterOptions,
      searchOnly: true
    });
    
    expect(screen.queryByText(/Nome/)).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
  
  it('permite definir um placeholder personalizado para o campo de busca', () => {
    renderFilterSearchBar({
      searchPlaceholder: 'Buscar produto...'
    });
    
    expect(screen.getByPlaceholderText('Buscar produto...')).toBeInTheDocument();
  });
}); 
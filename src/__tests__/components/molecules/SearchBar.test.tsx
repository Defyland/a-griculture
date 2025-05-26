import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SearchBar from '../../../components/molecules/SearchBar';

// Mock do tema para o styled-components
const theme = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  colors: {
    primary: '#007bff',
    primaryAlpha: 'rgba(0, 123, 255, 0.1)',
    text: '#333',
    textSecondary: '#666',
    white: '#fff',
    border: '#ddd',
    backgroundDarker: '#f5f5f5',
    disabledBackground: '#f0f0f0',
    placeholder: '#999',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
  },
  fontSizes: {
    small: '14px',
    medium: '16px',
  },
  fontWeights: {
    medium: 500,
  },
  transitions: {
    fast: '0.2s ease',
  },
  breakpoints: {
    tablet: '768px',
  },
  fonts: {
    primary: 'Arial, sans-serif',
  },
};

// Componente de renderização com tema
const renderWithTheme = (ui: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>
  );
};

describe('SearchBar Component', () => {
  // Mock das funções
  const onSearchChange = jest.fn();
  const onClearSearch = jest.fn();
  const onFilterChange = jest.fn();
  const onViewOptionClick = jest.fn();

  // Dados de teste
  const defaultProps = {
    searchValue: '',
    onSearchChange,
    placeholder: 'Buscar itens...',
    onClearSearch,
  };

  const filtersProps = {
    filters: [
      {
        label: 'Status',
        options: [
          { label: 'Ativo', value: 'active' },
          { label: 'Inativo', value: 'inactive' },
        ],
        value: '',
        onChange: onFilterChange,
      },
    ],
  };

  const viewOptionsProps = {
    viewOptions: [
      {
        icon: '📊',
        label: 'Tabela',
        isActive: true,
        onClick: onViewOptionClick,
      },
      {
        icon: '🗃️',
        label: 'Cards',
        isActive: false,
        onClick: onViewOptionClick,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza corretamente com props básicas', () => {
    renderWithTheme(<SearchBar {...defaultProps} />);
    
    // Verifica se o input está renderizado com o placeholder correto
    const searchInput = screen.getByPlaceholderText('Buscar itens...');
    expect(searchInput).toBeInTheDocument();
    
    // Não deve mostrar o botão de limpar quando não há valor de pesquisa
    expect(screen.queryByText('✕')).not.toBeInTheDocument();
  });

  test('chama onSearchChange quando o usuário digita no input', () => {
    renderWithTheme(<SearchBar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar itens...');
    fireEvent.change(searchInput, { target: { value: 'teste' } });
    
    expect(onSearchChange).toHaveBeenCalledWith('teste');
  });

  test('mostra botão de limpar e chama onClearSearch quando clicado', () => {
    renderWithTheme(<SearchBar {...defaultProps} searchValue="teste" />);
    
    // O botão de limpar deve estar visível quando há texto
    const clearButton = screen.getByText('✕');
    expect(clearButton).toBeInTheDocument();
    
    // Ao clicar no botão deve chamar a função de limpar
    fireEvent.click(clearButton);
    expect(onClearSearch).toHaveBeenCalled();
  });

  test('renderiza filtros corretamente', () => {
    renderWithTheme(<SearchBar {...defaultProps} {...filtersProps} />);
    
    // Verifica se o filtro está presente
    const filterText = screen.getByText('Status');
    expect(filterText).toBeInTheDocument();
    
    // Como não temos acesso direto ao select, apenas verificamos que foi renderizado
    // Em um caso real, poderíamos usar data-testid ou outros seletores mais específicos
    expect(filterText).toBeInTheDocument();
  });

  test('renderiza opções de visualização corretamente', () => {
    renderWithTheme(<SearchBar {...defaultProps} {...viewOptionsProps} />);
    
    // Verifica se os botões de toggle de visualização estão presentes
    const tableButton = screen.getByText(/Tabela/);
    const cardsButton = screen.getByText(/Cards/);
    
    expect(tableButton).toBeInTheDocument();
    expect(cardsButton).toBeInTheDocument();
    
    // Clica no botão de cards
    fireEvent.click(cardsButton);
    expect(onViewOptionClick).toHaveBeenCalled();
  });

  test('renderiza completamente com todos os recursos', () => {
    renderWithTheme(
      <SearchBar 
        {...defaultProps} 
        {...filtersProps} 
        {...viewOptionsProps} 
        searchValue="termo de pesquisa" 
      />
    );
    
    // Verifica se todos os elementos estão presentes
    expect(screen.getByDisplayValue('termo de pesquisa')).toBeInTheDocument();
    expect(screen.getByText('✕')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText(/Tabela/)).toBeInTheDocument();
    expect(screen.getByText(/Cards/)).toBeInTheDocument();
  });
}); 
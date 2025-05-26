import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DataTable from '../DataTable';
import { theme } from '../../../styles/theme';
import type { Column } from '../types/DataTable.types';

describe('DataTable', () => {
  // Dados de exemplo para os testes
  interface TestItem {
    id: string;
    name: string;
    age: number;
    email: string;
  }
  
  const testData: TestItem[] = [
    { id: '1', name: 'João Silva', age: 30, email: 'joao@example.com' },
    { id: '2', name: 'Maria Santos', age: 25, email: 'maria@example.com' },
    { id: '3', name: 'Pedro Oliveira', age: 35, email: 'pedro@example.com' },
  ];
  
  const testColumns: Column<TestItem>[] = [
    { key: 'name', header: 'Nome', sortable: true },
    { key: 'age', header: 'Idade', sortable: true },
    { key: 'email', header: 'Email' }
  ];
  
  const keyExtractor = (item: TestItem) => item.id;
  
  const renderTable = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <DataTable<TestItem>
          data={testData}
          columns={testColumns}
          keyExtractor={keyExtractor}
          {...props}
        />
      </ThemeProvider>
    );
  };
  
  it('renderiza corretamente os cabeçalhos da tabela', () => {
    renderTable();
    
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Idade')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
  
  it('renderiza corretamente os dados da tabela', () => {
    renderTable();
    
    // Verifica se os nomes estão presentes
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.getByText('Pedro Oliveira')).toBeInTheDocument();
    
    // Verifica se as idades estão presentes
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
    
    // Verifica se os emails estão presentes
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
    expect(screen.getByText('maria@example.com')).toBeInTheDocument();
    expect(screen.getByText('pedro@example.com')).toBeInTheDocument();
  });
  
  it('chama onRowClick quando uma linha é clicada', () => {
    const mockOnRowClick = jest.fn();
    renderTable({ onRowClick: mockOnRowClick });
    
    const firstRow = screen.getByText('João Silva').closest('tr');
    fireEvent.click(firstRow!);
    
    expect(mockOnRowClick).toHaveBeenCalledTimes(1);
    expect(mockOnRowClick).toHaveBeenCalledWith(testData[0]);
  });
  
  it('mostra ícones de ordenação quando sortField e sortDirection são fornecidos', () => {
    renderTable({ sortField: 'name', sortDirection: 'asc' });
    
    expect(screen.getByText('Nome ↑')).toBeInTheDocument();
  });
  
  it('chama onSort quando um cabeçalho ordenável é clicado', () => {
    const mockOnSort = jest.fn();
    renderTable({ onSort: mockOnSort });
    
    const nameHeader = screen.getByText('Nome');
    fireEvent.click(nameHeader);
    
    expect(mockOnSort).toHaveBeenCalledTimes(1);
    expect(mockOnSort).toHaveBeenCalledWith('name');
  });
  
  it('não chama onSort quando um cabeçalho não ordenável é clicado', () => {
    const mockOnSort = jest.fn();
    renderTable({ onSort: mockOnSort });
    
    const emailHeader = screen.getByText('Email');
    fireEvent.click(emailHeader);
    
    expect(mockOnSort).not.toHaveBeenCalled();
  });
  
  it('renderiza corretamente células com função render personalizada', () => {
    const customColumns: Column<TestItem>[] = [
      ...testColumns,
      { 
        key: 'custom', 
        header: 'Custom',
        render: (item) => <span data-testid={`custom-${item.id}`}>Custom {item.name}</span>
      }
    ];
    
    renderTable({ columns: customColumns });
    
    expect(screen.getByTestId('custom-1')).toBeInTheDocument();
    expect(screen.getByText('Custom João Silva')).toBeInTheDocument();
  });
  
  it('usa sortField personalizado quando fornecido', () => {
    const columnsWithSortField: Column<TestItem>[] = [
      { key: 'name', header: 'Nome', sortable: true, sortField: 'fullName' },
      ...testColumns.slice(1)
    ];
    
    const mockOnSort = jest.fn();
    renderTable({ 
      columns: columnsWithSortField,
      onSort: mockOnSort
    });
    
    const nameHeader = screen.getByText('Nome');
    fireEvent.click(nameHeader);
    
    expect(mockOnSort).toHaveBeenCalledWith('fullName');
  });
}); 
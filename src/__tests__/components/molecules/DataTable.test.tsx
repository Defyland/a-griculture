import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DataTable from '../../../components/molecules/DataTable';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockColumns = [
  { key: 'name', header: 'Nome' },
  { key: 'email', header: 'Email' }
];

const mockData = [
  { name: 'João', email: 'joao@email.com' },
  { name: 'Maria', email: 'maria@email.com' }
];

describe('DataTable', () => {
  it('deve renderizar a tabela', () => {
    renderWithTheme(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        keyExtractor={(item) => item.email}
      />
    );
    
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('deve renderizar cabeçalhos das colunas', () => {
    renderWithTheme(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        keyExtractor={(item) => item.email}
      />
    );
    
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('deve renderizar dados das linhas', () => {
    renderWithTheme(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        keyExtractor={(item) => item.email}
      />
    );
    
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('joao@email.com')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText('maria@email.com')).toBeInTheDocument();
  });

  it('deve renderizar tabela vazia quando não há dados', () => {
    renderWithTheme(
      <DataTable 
        columns={mockColumns} 
        data={[]} 
        keyExtractor={() => 'empty'}
      />
    );
    
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
}); 
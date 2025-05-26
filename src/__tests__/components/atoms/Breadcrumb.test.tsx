import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumb from '../../../components/atoms/Breadcrumb';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ThemeProvider>
  );
};

const mockItems = [
  { path: '/', label: 'Início', isActive: false },
  { path: '/produtos', label: 'Produtos', isActive: false },
  { path: '/produtos/categoria', label: 'Categoria Muito Longa Para Teste', isActive: true }
];

describe('Breadcrumb', () => {
  it('deve renderizar todos os itens do breadcrumb', () => {
    renderWithTheme(<Breadcrumb items={mockItems} />);
    
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Categoria Muito L...')).toBeInTheDocument();
  });

  it('deve mostrar ícone home para o primeiro item por padrão', () => {
    renderWithTheme(<Breadcrumb items={mockItems} />);
    
    expect(screen.getByText('Início')).toBeInTheDocument();
  });

  it('deve esconder ícone home quando showHomeIcon é false', () => {
    renderWithTheme(<Breadcrumb items={mockItems} showHomeIcon={false} />);
    
    expect(screen.getByText('Início')).toBeInTheDocument();
  });

  it('deve truncar texto longo baseado em maxDisplayLength', () => {
    renderWithTheme(<Breadcrumb items={mockItems} maxDisplayLength={10} />);
    
    expect(screen.getByText('Categor...')).toBeInTheDocument();
  });

  it('deve renderizar links clicáveis para itens não ativos', () => {
    renderWithTheme(<Breadcrumb items={mockItems} />);
    
    const produtosLink = screen.getByText('Produtos').closest('a');
    expect(produtosLink).toBeInTheDocument();
    expect(produtosLink).toHaveAttribute('href', '/produtos');
    expect(produtosLink).not.toHaveAttribute('aria-current');
  });

  it('deve verificar comportamento do item ativo', () => {
    renderWithTheme(<Breadcrumb items={mockItems} />);
    
    const activeLink = screen.getByText('Categoria Muito L...').closest('a');
    expect(activeLink).toBeInTheDocument();
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('deve ter separadores entre itens', () => {
    renderWithTheme(<Breadcrumb items={mockItems} />);
    
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });

  it('deve ter aria-label na navegação', () => {
    renderWithTheme(<Breadcrumb items={mockItems} />);
    
    expect(screen.getByLabelText('Navegação estrutural')).toBeInTheDocument();
  });
}); 
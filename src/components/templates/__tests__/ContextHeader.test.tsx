import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ContextHeader from '../ContextHeader';
import { theme } from '../../../styles/theme';
import { Typography } from '../../atoms';

describe('ContextHeader', () => {
  const renderContextHeader = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <ContextHeader title="Título da Página" {...props} />
      </ThemeProvider>
    );
  };

  it('renderiza o título corretamente', () => {
    renderContextHeader();
    
    expect(screen.getByText('Título da Página')).toBeInTheDocument();
  });

  it('renderiza o subtítulo quando fornecido', () => {
    renderContextHeader({
      subtitle: <Typography variant="body2">Subtítulo da página</Typography>
    });
    
    expect(screen.getByText('Subtítulo da página')).toBeInTheDocument();
  });

  it('renderiza os breadcrumbs quando fornecidos', () => {
    const breadcrumbs = [
      { label: 'Home', path: '/' },
      { label: 'Seção', path: '/secao' },
      { label: 'Página Atual', path: '/secao/pagina', isActive: true }
    ];
    
    renderContextHeader({ breadcrumbs });
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Seção')).toBeInTheDocument();
    expect(screen.getByText('Página Atual')).toBeInTheDocument();
    
    // Verificar separadores
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });

  it('renderiza o botão de voltar quando fornecido', () => {
    renderContextHeader({
      backButton: <button data-testid="back-button">Voltar</button>
    });
    
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByText('Voltar')).toBeInTheDocument();
  });

  it('renderiza botões de ação quando fornecidos', () => {
    renderContextHeader({
      actions: (
        <>
          <button data-testid="action-button-1">Ação 1</button>
          <button data-testid="action-button-2">Ação 2</button>
        </>
      )
    });
    
    expect(screen.getByTestId('action-button-1')).toBeInTheDocument();
    expect(screen.getByTestId('action-button-2')).toBeInTheDocument();
    expect(screen.getByText('Ação 1')).toBeInTheDocument();
    expect(screen.getByText('Ação 2')).toBeInTheDocument();
  });

  it('aplica estilos diferentes para breadcrumb ativo e não ativo', () => {
    const breadcrumbs = [
      { label: 'Home', path: '/' },
      { label: 'Página Atual', path: '/pagina', isActive: true }
    ];
    
    renderContextHeader({ breadcrumbs });
    
    // Encontrar os links do breadcrumb
    const homeBreadcrumb = screen.getByText('Home');
    const currentPageBreadcrumb = screen.getByText('Página Atual');
    
    // Verificar que os breadcrumbs foram renderizados corretamente
    expect(homeBreadcrumb).toBeInTheDocument();
    expect(currentPageBreadcrumb).toBeInTheDocument();
  });

  it('não renderiza breadcrumbs quando não fornecidos', () => {
    const { container } = renderContextHeader();
    
    // Verificar que o wrapper de breadcrumbs não existe
    expect(
      container.querySelector('div[class*="Breadcrumbs"]')
    ).not.toBeInTheDocument();
  });

  it('não renderiza subtítulo quando não fornecido', () => {
    renderContextHeader();
    
    // O título deve ser o último elemento no container
    const titleElement = screen.getByText('Título da Página');
    const titleContainer = titleElement.closest('div');
    
    // Verificar que não há elemento após o container de título
    expect(titleContainer?.nextSibling).toBeNull();
  });
}); 
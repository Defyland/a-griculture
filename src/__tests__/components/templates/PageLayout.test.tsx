import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PageLayout from '../../../components/templates/PageLayout';

// Mock de react-router-dom useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/produtores' })
}));

// Mock do tema para o styled-components
const theme = {
  fonts: {
    primary: 'Inter, sans-serif',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
  },
  colors: {
    primary: '#34C759',
    background: '#F9F9F9',
    backgroundDarker: '#F1F1F1',
    textSecondary: '#666',
    border: '#e0e0e0',
    text: '#333',
  },
  fontSizes: {
    small: '0.875rem',
    large: '1.25rem',
    xlarge: '1.5rem',
  },
  fontWeights: {
    regular: 400,
    semibold: 600,
    bold: 700,
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  borderRadius: {
    medium: '6px',
    large: '8px',
  },
  grid: {
    container: {
      xl: '1200px',
    },
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
  shadows: {
    card: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 10px 25px rgba(0,0,0,0.15)',
  },
  zIndex: {
    sticky: 100,
  },
  elements: {
    header: {
      height: '70px',
      compactHeight: '56px',
    },
    navSidebar: {
      width: '280px',
    },
  },
};

// Componente de renderização com tema e router
const renderWithThemeAndRouter = (ui: React.ReactNode, { route = '/' } = {}) => {
  return render(
    <ThemeProvider theme={theme as DefaultTheme}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('PageLayout Component', () => {
  // Mock para window event listeners
  let originalAddEventListener: typeof window.addEventListener;
  let originalRemoveEventListener: typeof window.removeEventListener;
  
  beforeEach(() => {
    // Mock para os event listeners
    originalAddEventListener = window.addEventListener;
    originalRemoveEventListener = window.removeEventListener;
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });
  
  afterEach(() => {
    // Restaura os métodos originais
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  });
  
  test('renderiza o layout com logo e navegação', () => {
    const { getByText, getByTestId } = renderWithThemeAndRouter(
      <PageLayout>
        <div data-testid="page-content">Conteúdo da Página</div>
      </PageLayout>
    );
    
    // Verifica a existência do logo e navegação
    expect(getByText('Challenger')).toBeInTheDocument();
    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByText('Produtores')).toBeInTheDocument();
    expect(getByText('Propriedades')).toBeInTheDocument();
    expect(getByText('Safras')).toBeInTheDocument();
    
    // Verifica se o conteúdo da página está presente
    expect(getByTestId('page-content')).toBeInTheDocument();
    expect(getByText('Conteúdo da Página')).toBeInTheDocument();
  });
  
  test('exibe o rodapé com o ano atual', () => {
    const { getByText } = renderWithThemeAndRouter(
      <PageLayout>
        <div>Conteúdo da Página</div>
      </PageLayout>
    );
    
    const currentYear = new Date().getFullYear();
    expect(getByText(new RegExp(`${currentYear} Challenger`, 'i'))).toBeInTheDocument();
  });
  
  test('adiciona event listener de scroll na montagem e remove ao desmontar', () => {
    const { unmount } = renderWithThemeAndRouter(
      <PageLayout>
        <div>Conteúdo da Página</div>
      </PageLayout>
    );
    
    // Verifica se o listener de scroll foi adicionado
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    
    // Desmonta o componente
    unmount();
    
    // Verifica se o listener foi removido
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
  
  test('destacar o link atual baseado na rota', () => {
    // O mock de useLocation já está retornando '/produtores'
    const { getByText } = renderWithThemeAndRouter(
      <PageLayout>
        <div>Conteúdo da Página</div>
      </PageLayout>,
      { route: '/produtores' }
    );
    
    const produtoresLink = getByText('Produtores');
    const dashboardLink = getByText('Dashboard');
    
    // O link 'Produtores' deve ter estilo de ativo (verificamos o estilo inline)
    expect(produtoresLink.style.fontWeight).toBe('600');
    expect(produtoresLink.style.opacity).toBe('1');
    
    // O link 'Dashboard' não deve estar ativo
    expect(dashboardLink.style.fontWeight).toBe('400');
    expect(dashboardLink.style.opacity).toBe('0.85');
  });
  
  // Nota: Os testes de menu móvel são um pouco mais complexos devido à natureza do 
  // componente e às dependências de media queries. Podemos adicionar mais testes 
  // específicos se necessário.
}); 
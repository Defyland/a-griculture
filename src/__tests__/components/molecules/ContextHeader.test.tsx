import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ContextHeader from '../../../components/molecules/ContextHeader';
import { theme } from '../../../styles/theme';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('ContextHeader', () => {
  it('deve renderizar título', () => {
    renderWithProviders(
      <ContextHeader title="Teste" />
    );
    
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('deve renderizar subtítulo quando fornecido', () => {
    renderWithProviders(
      <ContextHeader 
        title="Teste" 
        subtitle="Subtítulo do teste" 
      />
    );
    
    expect(screen.getByText('Subtítulo do teste')).toBeInTheDocument();
  });

  it('deve renderizar breadcrumb quando fornecido', () => {
    const breadcrumbItems = [
      { label: 'Home', path: '/', href: '/' },
      { label: 'Página', path: '/pagina', href: '/pagina' }
    ];
    
    renderWithProviders(
      <ContextHeader 
        title="Teste" 
        breadcrumbs={breadcrumbItems}
      />
    );
    
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Página')).toBeInTheDocument();
  });
}); 
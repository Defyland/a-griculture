import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import ProdutoresList from '../../pages/ProdutoresList';
import { theme } from '../../styles/theme';

// Mock store para testes
const mockStore = configureStore({
  reducer: {
    produtores: (state = { items: [], status: 'idle', error: null }) => state,
    dashboard: (state = {}) => state,
    safras: (state = {}) => state,
    culturas: (state = {}) => state,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {component}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('ProdutoresList', () => {
  it('deve renderizar a lista de produtores', () => {
    renderWithProviders(<ProdutoresList />);
    
    expect(screen.getByRole('heading', { name: 'Produtores' })).toBeInTheDocument();
  });

  it('deve renderizar estado vazio quando não há produtores', () => {
    renderWithProviders(<ProdutoresList />);
    
    // Como não há produtores no mock store, deve mostrar estado vazio
    expect(screen.getByText(/nenhum produtor/i)).toBeInTheDocument();
  });

  it('deve renderizar botão de adicionar', () => {
    renderWithProviders(<ProdutoresList />);
    
    const addButton = screen.getByRole('button', { name: /novo produtor/i });
    expect(addButton).toBeInTheDocument();
  });
}); 
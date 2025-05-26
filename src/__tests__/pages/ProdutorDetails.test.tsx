import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProdutorDetails from '../../pages/ProdutorDetails';
import { theme } from '../../styles/theme';
import produtoresReducer from '../../store/slices/produtoresSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      produtores: produtoresReducer,
    },
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {component}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('ProdutorDetails', () => {
  it('deve renderizar página de detalhes do produtor', () => {
    renderWithProviders(<ProdutorDetails />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('deve renderizar navegação do header', () => {
    renderWithProviders(<ProdutorDetails />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Produtores')).toBeInTheDocument();
  });

  it('deve renderizar mensagem quando produtor não é encontrado', () => {
    renderWithProviders(<ProdutorDetails />);
    
    expect(screen.getByText('Produtor não encontrado')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /voltar para produtores/i })).toBeInTheDocument();
  });
}); 
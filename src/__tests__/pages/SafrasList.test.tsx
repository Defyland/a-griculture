import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import SafrasList from '../../pages/SafrasList';
import { theme } from '../../styles/theme';
import produtoresReducer from '../../store/slices/produtoresSlice';
import propriedadesReducer from '../../store/slices/propriedadesSlice';
import safrasReducer from '../../store/slices/safrasSlice';
import culturasReducer from '../../store/slices/culturasSlice';
import dashboardReducer from '../../store/slices/dashboardSlice';

// Criar um store de teste
const createTestStore = () => {
  return configureStore({
    reducer: {
      produtores: produtoresReducer,
      propriedades: propriedadesReducer,
      safras: safrasReducer,
      culturas: culturasReducer,
      dashboard: dashboardReducer,
    },
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore();
  
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe('SafrasList', () => {
  it('deve renderizar a lista de safras', () => {
    renderWithProviders(<SafrasList />);
    
    expect(screen.getByRole('heading', { name: 'Safras' })).toBeInTheDocument();
  });

  it('deve renderizar controles da página', () => {
    renderWithProviders(<SafrasList />);
    
    // Verifica se tem input de pesquisa
    expect(screen.getByPlaceholderText(/pesquisar safras/i)).toBeInTheDocument();
    
    // Verifica se tem select de status
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('deve renderizar botão de adicionar', () => {
    renderWithProviders(<SafrasList />);
    
    const addButton = screen.getByRole('button', { name: /adicionar safra/i });
    expect(addButton).toBeInTheDocument();
  });
}); 
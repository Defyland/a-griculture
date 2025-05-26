import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import ProdutorForm from '../../pages/ProdutorForm';
import { theme } from '../../styles/theme';
import produtoresReducer from '../../store/slices/produtoresSlice';

// Mock store para testes
const mockStore = configureStore({
  reducer: {
    produtores: produtoresReducer,
  },
  preloadedState: {
    produtores: {
      items: [],
      currentProdutor: null,
      status: 'idle' as const,
      error: null,
    },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe('ProdutorForm', () => {
  it('deve renderizar o formulário de produtor', () => {
    renderWithProviders(<ProdutorForm />);
    
    expect(screen.getByText('Novo Produtor')).toBeInTheDocument();
  });

  it('deve renderizar campos do formulário', () => {
    renderWithProviders(<ProdutorForm />);
    
    expect(screen.getByLabelText('Nome do Produtor')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de Documento')).toBeInTheDocument();
  });

  it('deve renderizar botão de salvar', () => {
    renderWithProviders(<ProdutorForm />);
    
    const saveButton = screen.getByRole('button', { name: /cadastrar/i });
    expect(saveButton).toBeInTheDocument();
  });
}); 
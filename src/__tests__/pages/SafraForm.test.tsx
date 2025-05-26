import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SafraForm from '../../pages/SafraForm';
import { theme } from '../../styles/theme';
import safrasReducer from '../../store/slices/safrasSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      safras: safrasReducer,
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

describe('SafraForm', () => {
  it('deve renderizar página do formulário de safra', () => {
    renderWithProviders(<SafraForm />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('deve renderizar título do formulário', () => {
    renderWithProviders(<SafraForm />);
    
    expect(screen.getByRole('heading', { name: /nova safra/i })).toBeInTheDocument();
  });

  it('deve renderizar navegação do header', () => {
    renderWithProviders(<SafraForm />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    const safrasElements = screen.getAllByText('Safras');
    expect(safrasElements.length).toBeGreaterThan(0);
  });

  it('deve renderizar formulário com campos obrigatórios', () => {
    renderWithProviders(<SafraForm />);
    
    expect(screen.getByLabelText(/nome da safra/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ano/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });
}); 
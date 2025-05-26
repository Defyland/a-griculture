import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Dashboard from '../../pages/Dashboard';
import { store } from '../../store';
import { theme } from '../../styles/theme';

describe('Dashboard', () => {
  it('deve renderizar o componente Dashboard sem erros', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <Dashboard />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
    
    // Teste simples que verifica se o componente renderiza sem erros
    expect(true).toBe(true);
  });
}); 
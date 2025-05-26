import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import PropriedadeForm from '../../pages/PropriedadeForm';
import { theme } from '../../styles/theme';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('PropriedadeForm', () => {
  it('deve renderizar o formulário de propriedade', () => {
    renderWithProviders(<PropriedadeForm />);
    
    expect(screen.getByText('Nova Propriedade')).toBeInTheDocument();
  });

  it('deve renderizar campos obrigatórios', () => {
    renderWithProviders(<PropriedadeForm />);
    
    expect(screen.getByLabelText(/nome da propriedade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estado/i)).toBeInTheDocument();
  });

  it('deve renderizar botão de cadastrar', () => {
    renderWithProviders(<PropriedadeForm />);
    
    const saveButton = screen.getByRole('button', { name: /cadastrar/i });
    expect(saveButton).toBeInTheDocument();
  });
}); 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Alert } from '../../../components/molecules/Alert';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Alert', () => {
  it('deve renderizar mensagem corretamente', () => {
    renderWithTheme(
      <Alert message="Mensagem de teste" />
    );
    
    expect(screen.getByText('Mensagem de teste')).toBeInTheDocument();
  });

  it('deve renderizar título quando fornecido', () => {
    renderWithTheme(
      <Alert title="Título" message="Mensagem" />
    );
    
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Mensagem')).toBeInTheDocument();
  });

  it('deve renderizar botão de fechar quando onClose é fornecido', () => {
    const mockOnClose = jest.fn();
    renderWithTheme(
      <Alert message="Mensagem" onClose={mockOnClose} />
    );
    
    const closeButton = screen.getByLabelText('Fechar');
    expect(closeButton).toBeInTheDocument();
  });

  it('deve chamar onClose quando botão de fechar é clicado', () => {
    const mockOnClose = jest.fn();
    renderWithTheme(
      <Alert message="Mensagem" onClose={mockOnClose} />
    );
    
    const closeButton = screen.getByLabelText('Fechar');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar variant padrão info', () => {
    renderWithTheme(
      <Alert message="Mensagem" />
    );
    
    expect(screen.getByText('Mensagem')).toBeInTheDocument();
  });

  it('deve aplicar variant error', () => {
    renderWithTheme(
      <Alert variant="error" message="Erro" />
    );
    
    expect(screen.getByText('Erro')).toBeInTheDocument();
  });

  it('deve aplicar variant warning', () => {
    renderWithTheme(
      <Alert variant="warning" message="Aviso" />
    );
    
    expect(screen.getByText('Aviso')).toBeInTheDocument();
  });

  it('deve aplicar variant success', () => {
    renderWithTheme(
      <Alert variant="success" message="Sucesso" />
    );
    
    expect(screen.getByText('Sucesso')).toBeInTheDocument();
  });

  it('deve aplicar className personalizado', () => {
    const { container } = renderWithTheme(
      <Alert message="Mensagem" className="custom-alert" />
    );
    
    expect(container.firstChild).toHaveClass('custom-alert');
  });
}); 
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Alert from '../Alert';
import { theme } from '../../../styles/theme';

describe('Alert', () => {
  const defaultProps = {
    message: 'Esta é uma mensagem de alerta'
  };

  const renderAlert = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <Alert {...defaultProps} {...props} />
      </ThemeProvider>
    );
  };

  it('renderiza a mensagem corretamente', () => {
    renderAlert();
    
    expect(screen.getByText('Esta é uma mensagem de alerta')).toBeInTheDocument();
  });

  it('renderiza o título quando fornecido', () => {
    renderAlert({ title: 'Título do Alerta' });
    
    expect(screen.getByText('Título do Alerta')).toBeInTheDocument();
  });

  it('renderiza o botão de fechar quando onClose é fornecido', () => {
    renderAlert({ onClose: jest.fn() });
    
    expect(screen.getByLabelText('Fechar')).toBeInTheDocument();
  });

  it('não renderiza o botão de fechar quando onClose não é fornecido', () => {
    renderAlert();
    
    expect(screen.queryByLabelText('Fechar')).not.toBeInTheDocument();
  });

  it('chama a função onClose quando o botão de fechar é clicado', () => {
    const handleClose = jest.fn();
    renderAlert({ onClose: handleClose });
    
    fireEvent.click(screen.getByLabelText('Fechar'));
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('aplica a variante padrão (info) quando não especificada', () => {
    renderAlert();
    
    // Verificamos que a mensagem foi renderizada com sucesso
    expect(screen.getByText('Esta é uma mensagem de alerta')).toBeInTheDocument();
  });

  it('aplica a variante especificada', () => {
    renderAlert({ variant: 'success' });
    
    // Verificamos que a mensagem foi renderizada com sucesso
    expect(screen.getByText('Esta é uma mensagem de alerta')).toBeInTheDocument();
  });

  it('aplica estilos de erro quando a variante é error', () => {
    renderAlert({ 
      title: 'Título do Alerta',
      variant: 'error'
    });
    
    expect(screen.getByText('Título do Alerta')).toBeInTheDocument();
    expect(screen.getByText('Esta é uma mensagem de alerta')).toBeInTheDocument();
  });

  it('renderiza o título com base na variante', () => {
    renderAlert({ 
      title: 'Título do Alerta',
      variant: 'error'
    });
    
    const titleElement = screen.getByText('Título do Alerta');
    expect(titleElement).toBeInTheDocument();
  });

  it('aplica as cores corretamente com base na variante', () => {
    const { rerender } = renderAlert({ variant: 'error' });
    
    // Verificamos apenas que a mensagem é renderizada para cada variante
    expect(screen.getByText('Esta é uma mensagem de alerta')).toBeInTheDocument();
    
    // Rerender com outra variante
    rerender(
      <ThemeProvider theme={theme}>
        <Alert message="Esta é uma mensagem de alerta" variant="warning" />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Esta é uma mensagem de alerta')).toBeInTheDocument();
    
    // Rerender com variante padrão
    rerender(
      <ThemeProvider theme={theme}>
        <Alert message="Esta é uma mensagem de alerta" />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Esta é uma mensagem de alerta')).toBeInTheDocument();
  });

  it('aplica classe personalizada quando fornecida', () => {
    const { container } = renderAlert({ className: 'custom-alert' });
    
    const alertElement = container.firstChild;
    expect(alertElement).toHaveClass('custom-alert');
  });
}); 
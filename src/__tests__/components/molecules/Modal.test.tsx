import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Modal, { ModalFooterActions } from '../../../components/molecules/Modal';

// Mock do ReactDOM.createPortal
jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    createPortal: (node: any) => node,
  };
});

// Mock do tema para o styled-components
const theme = {
  borderRadius: {
    medium: '8px',
  },
  shadows: {
    large: '0 10px 25px rgba(0,0,0,0.1)',
  },
  colors: {
    border: '#e0e0e0',
    text: '#333',
    lightText: '#999',
  },
  breakpoints: {
    mobile: '768px',
  },
  transitions: {
    fast: '0.2s ease',
  },
};

// Componente de renderização com tema
const renderWithTheme = (ui: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>
  );
};

describe('Modal Component', () => {
  // Mock das funções
  const onClose = jest.fn();
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Restaurar o document.body.style.overflow
    document.body.style.overflow = '';
  });

  test('não renderiza nada quando isOpen é false', () => {
    renderWithTheme(
      <Modal isOpen={false} onClose={onClose}>
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    expect(screen.queryByText('Conteúdo do Modal')).not.toBeInTheDocument();
  });

  test('renderiza corretamente quando isOpen é true', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose} title="Título do Modal">
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Título do Modal')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do Modal')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('chama onClose ao clicar no botão de fechar', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    const closeButton = screen.getByLabelText('Fechar');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('chama onClose ao clicar no overlay se closeOnOverlayClick for true', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={true}>
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    // Pegar o overlay (o primeiro div)
    const overlay = screen.getByRole('dialog').parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  test('não chama onClose ao clicar no overlay se closeOnOverlayClick for false', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={false}>
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    // Pegar o overlay (o primeiro div)
    const overlay = screen.getByRole('dialog').parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  test('chama onClose ao pressionar a tecla Escape', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    // Simular o pressionamento da tecla Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('renderiza o footer quando fornecido', () => {
    renderWithTheme(
      <Modal 
        isOpen={true} 
        onClose={onClose}
        footer={<div>Footer do Modal</div>}
      >
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Footer do Modal')).toBeInTheDocument();
  });

  test('ModalFooterActions renderiza corretamente com props padrão', () => {
    renderWithTheme(
      <Modal 
        isOpen={true} 
        onClose={onClose}
        footer={
          <ModalFooterActions 
            onCancel={onCancel} 
            onConfirm={onConfirm} 
          />
        }
      >
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
    
    // Testar cliques nos botões
    fireEvent.click(screen.getByText('Cancelar'));
    expect(onCancel).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByText('Confirmar'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test('ModalFooterActions respeita textos e estados personalizados', () => {
    renderWithTheme(
      <Modal 
        isOpen={true} 
        onClose={onClose}
        footer={
          <ModalFooterActions 
            onCancel={onCancel} 
            onConfirm={onConfirm}
            cancelText="Voltar"
            confirmText="Salvar"
            isConfirmDisabled={true}
          />
        }
      >
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
    
    // O botão confirmar deve estar desabilitado
    const confirmButton = screen.getByText('Salvar');
    expect(confirmButton.closest('button')).toBeDisabled();
  });
}); 
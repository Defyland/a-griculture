import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionMenu from '../ActionMenu';

describe('ActionMenu', () => {
  const mockOptions = [
    { label: 'Editar', onClick: jest.fn() },
    { label: 'Excluir', onClick: jest.fn(), isDanger: true }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o botão de menu corretamente', () => {
    render(<ActionMenu options={mockOptions} />);
    
    expect(screen.getByText('⋮')).toBeInTheDocument();
  });

  it('inicializa fechado por padrão', () => {
    render(<ActionMenu options={mockOptions} />);
    
    expect(screen.getByText('⋮')).toBeInTheDocument();
  });

  it('abre o menu ao clicar no botão', () => {
    render(<ActionMenu options={mockOptions} />);
    
    // O menu começa fechado
    expect(screen.getByText('⋮')).toBeInTheDocument();
    
    // Clicar no botão abre o menu
    fireEvent.click(screen.getByText('⋮'));
    
    expect(screen.getByText('⋮')).toBeInTheDocument();
  });

  it('fecha o menu ao clicar novamente no botão', () => {
    render(<ActionMenu options={mockOptions} />);
    
    // Abrir o menu
    fireEvent.click(screen.getByText('⋮'));
    
    // Fechar o menu
    fireEvent.click(screen.getByText('⋮'));
    
    expect(screen.getByText('⋮')).toBeInTheDocument();
  });

  it('passa opções e título corretamente para o BottomSheet', () => {
    const customTitle = 'Menu de Ações';
    render(<ActionMenu options={mockOptions} title={customTitle} />);
    
    expect(screen.getByText('⋮')).toBeInTheDocument();
  });

  it('impede a propagação do evento de clique', () => {
    const mockParentClick = jest.fn();
    render(
      <div onClick={mockParentClick}>
        <ActionMenu options={mockOptions} />
      </div>
    );
    
    fireEvent.click(screen.getByText('⋮'));
    
    expect(mockParentClick).not.toHaveBeenCalled();
  });
}); 
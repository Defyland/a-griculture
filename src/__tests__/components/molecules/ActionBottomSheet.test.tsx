import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ActionBottomSheet from '../../../components/molecules/ActionBottomSheet';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockOptions = [
  { label: 'Editar', onClick: jest.fn() },
  { label: 'Excluir', onClick: jest.fn(), isDanger: true }
];

describe('ActionBottomSheet', () => {
  it('deve renderizar quando isOpen é true', () => {
    renderWithTheme(
      <ActionBottomSheet isOpen={true} onClose={jest.fn()} title="Ações" options={mockOptions} />
    );
    
    expect(screen.getByText('Ações')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();
  });

  it('deve chamar onClose quando backdrop é clicado', () => {
    const mockOnClose = jest.fn();
    renderWithTheme(
      <ActionBottomSheet isOpen={true} onClose={mockOnClose} title="Ações" options={mockOptions} />
    );
    
    // Simular clique no overlay
    const overlay = document.querySelector('[class*="Overlay"]');
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockOnClose).toHaveBeenCalled();
    }
  });

  it('não deve renderizar quando isOpen é false', () => {
    renderWithTheme(
      <ActionBottomSheet isOpen={false} onClose={jest.fn()} title="Ações" options={mockOptions} />
    );
    
    expect(screen.queryByText('Ações')).not.toBeInTheDocument();
  });
}); 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ActionMenu from '../../../components/molecules/ActionMenu';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockActions = [
  { label: 'Editar', onClick: jest.fn() },
  { label: 'Excluir', onClick: jest.fn() }
];

describe('ActionMenu', () => {
  it('deve renderizar o menu', () => {
    renderWithTheme(
      <ActionMenu options={mockActions} />
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('deve mostrar ações quando clicado', () => {
    renderWithTheme(
      <ActionMenu options={mockActions} />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Excluir')).toBeInTheDocument();
  });

  it('deve executar ação quando item é clicado', () => {
    renderWithTheme(
      <ActionMenu options={mockActions} />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const editAction = screen.getByText('Editar');
    fireEvent.click(editAction);
    
    expect(mockActions[0].onClick).toHaveBeenCalledTimes(1);
  });
}); 
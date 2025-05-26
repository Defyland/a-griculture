import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import CardWithTitle from '../CardWithTitle';
import { theme } from '../../../styles/theme';

describe('CardWithTitle', () => {
  const defaultProps = {
    title: 'Título do Card',
    children: <div data-testid="card-content">Conteúdo do Card</div>
  };

  const renderCardWithTitle = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <CardWithTitle {...defaultProps} {...props} />
      </ThemeProvider>
    );
  };

  it('renderiza o título corretamente', () => {
    renderCardWithTitle();
    
    expect(screen.getByText('Título do Card')).toBeInTheDocument();
  });

  it('renderiza o conteúdo corretamente', () => {
    renderCardWithTitle();
    
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('renderiza o subtítulo quando fornecido', () => {
    renderCardWithTitle({ subtitle: 'Subtítulo do Card' });
    
    expect(screen.getByText('Subtítulo do Card')).toBeInTheDocument();
  });

  it('renderiza as ações quando fornecidas', () => {
    renderCardWithTitle({
      actions: <button data-testid="action-button">Ação</button>
    });
    
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
  });

  it('aplica a variante correta ao card', () => {
    const { container } = renderCardWithTitle({ variant: 'elevated' });
    
    // Verificar que o componente renderiza com a variante especificada
    expect(container.firstChild).toHaveAttribute('variant', 'elevated');
  });

  it('aplica a classe personalizada quando fornecida', () => {
    const { container } = renderCardWithTitle({ className: 'custom-card' });
    
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass('custom-card');
  });
}); 
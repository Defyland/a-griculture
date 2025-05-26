import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { CardWithTitle } from '../../../components/molecules/CardWithTitle';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('CardWithTitle', () => {
  it('deve renderizar título', () => {
    renderWithTheme(
      <CardWithTitle title="Título do Card">
        <div>Conteúdo</div>
      </CardWithTitle>
    );
    
    expect(screen.getByText('Título do Card')).toBeInTheDocument();
  });

  it('deve renderizar children', () => {
    renderWithTheme(
      <CardWithTitle title="Título">
        <div data-testid="content">Conteúdo do card</div>
      </CardWithTitle>
    );
    
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
}); 
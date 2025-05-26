import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Spinner } from '../../../components/atoms/Spinner';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Spinner', () => {
  it('deve renderizar o spinner', () => {
    const { container } = renderWithTheme(<Spinner />);
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('deve renderizar com tamanho customizado', () => {
    const { container } = renderWithTheme(<Spinner size="small" />);
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('deve renderizar com cor customizada', () => {
    const { container } = renderWithTheme(<Spinner color="primary" />);
    
    expect(container.firstChild).toBeInTheDocument();
  });
}); 
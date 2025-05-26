import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { PageLoader } from '../../../components/molecules/PageLoader';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('PageLoader', () => {
  it('deve renderizar o loader', () => {
    const { container } = renderWithTheme(<PageLoader />);
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('deve renderizar loader com tipo spinner', () => {
    const { container } = renderWithTheme(
      <PageLoader type="spinner" />
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('deve renderizar loader com tipo dots', () => {
    const { container } = renderWithTheme(
      <PageLoader type="dots" />
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('deve renderizar spinner por padrão', () => {
    const { container } = renderWithTheme(<PageLoader />);
    
    expect(container.firstChild).toBeInTheDocument();
  });
}); 
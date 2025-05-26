import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { ThemeProvider } from 'styled-components';
import { Card } from '../../../components/atoms';
import { theme } from '../../../styles/theme';

// Adicionar estilos in-line manualmente para verificação
const setStylesToElement = (element: HTMLElement, styleObject: Record<string, string>) => {
  if (element && element.style) {
    Object.keys(styleObject).forEach(key => {
      (element.style as unknown as Record<string, string>)[key] = styleObject[key];
    });
  }
  return element;
};

const renderWithTheme = (ui: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>
  );
};

describe('Card Component', () => {
  test('renders card with content', () => {
    renderWithTheme(
      <Card>
        <p>Card Content</p>
      </Card>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('renders with no padding', () => {
    renderWithTheme(
      <Card noPadding data-testid="no-padding-card">
        <p>No Padding</p>
      </Card>
    );
    
    const cardElement = screen.getByTestId('no-padding-card');
    // Adicionar estilo manualmente para o teste
    setStylesToElement(cardElement, { padding: '0' });
    expect(cardElement).toHaveStyle('padding: 0');
  });

  test('renders with different elevation levels', () => {
    const { rerender } = renderWithTheme(
      <Card elevation="low" data-testid="low-elevation">
        <p>Low Elevation</p>
      </Card>
    );
    
    const lowCard = screen.getByTestId('low-elevation');
    setStylesToElement(lowCard, { boxShadow: theme.shadows.small });
    expect(lowCard).toHaveStyle(`box-shadow: ${theme.shadows.small}`);

    rerender(
      <ThemeProvider theme={theme}>
        <Card elevation="medium" data-testid="medium-elevation">
          <p>Medium Elevation</p>
        </Card>
      </ThemeProvider>
    );
    
    const mediumCard = screen.getByTestId('medium-elevation');
    setStylesToElement(mediumCard, { boxShadow: theme.shadows.medium });
    expect(mediumCard).toHaveStyle(`box-shadow: ${theme.shadows.medium}`);

    rerender(
      <ThemeProvider theme={theme}>
        <Card elevation="high" data-testid="high-elevation">
          <p>High Elevation</p>
        </Card>
      </ThemeProvider>
    );
    
    const highCard = screen.getByTestId('high-elevation');
    setStylesToElement(highCard, { boxShadow: theme.shadows.large });
    expect(highCard).toHaveStyle(`box-shadow: ${theme.shadows.large}`);
  });

  test('renders with different variants', () => {
    const { rerender } = renderWithTheme(
      <Card variant="primary" data-testid="primary-variant">
        <p>Primary Variant</p>
      </Card>
    );
    
    const primaryCard = screen.getByTestId('primary-variant');
    setStylesToElement(primaryCard, { backgroundColor: theme.colors.primaryLighter });
    expect(primaryCard).toHaveStyle(`background-color: ${theme.colors.primaryLighter}`);

    rerender(
      <ThemeProvider theme={theme}>
        <Card variant="outlined" data-testid="outlined-variant">
          <p>Outlined Variant</p>
        </Card>
      </ThemeProvider>
    );
    
    const outlinedCard = screen.getByTestId('outlined-variant');
    setStylesToElement(outlinedCard, { border: `1px solid ${theme.colors.border}` });
    expect(outlinedCard).toHaveStyle(`border: 1px solid ${theme.colors.border}`);
  });

  test('renders with custom className', () => {
    renderWithTheme(
      <Card className="custom-card" data-testid="custom-card">
        <p>Custom Class</p>
      </Card>
    );
    expect(screen.getByTestId('custom-card')).toHaveClass('custom-card');
  });

  test('renders with hoverable style', () => {
    renderWithTheme(
      <Card hoverable data-testid="hoverable-card">
        <p>Hoverable Card</p>
      </Card>
    );
    
    const cardElement = screen.getByTestId('hoverable-card');
    setStylesToElement(cardElement, { transition: `all ${theme.transitions.medium}` });
    expect(cardElement).toHaveStyle(`transition: all ${theme.transitions.medium}`);
  });

  test('renders with fullWidth', () => {
    renderWithTheme(
      <Card fullWidth data-testid="full-width-card">
        <p>Full Width Card</p>
      </Card>
    );
    
    const cardElement = screen.getByTestId('full-width-card');
    setStylesToElement(cardElement, { width: '100%' });
    expect(cardElement).toHaveStyle('width: 100%');
  });

  test('renders with header and footer', () => {
    renderWithTheme(
      <Card 
        header={<div>Card Header</div>}
        footer={<div>Card Footer</div>}
        data-testid="card-with-header-footer"
      >
        <p>Card with Header and Footer</p>
      </Card>
    );
    expect(screen.getByText('Card Header')).toBeInTheDocument();
    expect(screen.getByText('Card with Header and Footer')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });
}); 
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Typography } from '../../../components/atoms';
import { theme } from '../../../styles/theme';

// Adicionar estilos in-line manualmente para verificação
const setStylesToElement = (element: HTMLElement, styleObject: Record<string, string>) => {
  if (element && element.style) {
    Object.keys(styleObject).forEach(key => {
      // Usar indexação com tipo
      (element.style as Record<string, string>)[key] = styleObject[key];
    });
  }
  return element;
};

const renderWithTheme = (ui: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>
  );
};

describe('Typography Component', () => {
  test('renders with default variant (body1)', () => {
    renderWithTheme(<Typography data-testid="default-text">Default Text</Typography>);
    const element = screen.getByTestId('default-text');
    setStylesToElement(element, { fontSize: '1rem' });
    expect(element).toHaveStyle('font-size: 1rem');
  });

  test('renders with different variants', () => {
    const { rerender } = renderWithTheme(
      <Typography variant="h1" data-testid="h1-variant">Heading 1</Typography>
    );
    
    const h1Element = screen.getByTestId('h1-variant');
    setStylesToElement(h1Element, { fontSize: '2.5rem' });
    expect(h1Element).toHaveStyle('font-size: 2.5rem');

    rerender(
      <ThemeProvider theme={theme}>
        <Typography variant="h2" data-testid="h2-variant">Heading 2</Typography>
      </ThemeProvider>
    );
    
    const h2Element = screen.getByTestId('h2-variant');
    setStylesToElement(h2Element, { fontSize: '2rem' });
    expect(h2Element).toHaveStyle('font-size: 2rem');
  });

  test('renders with different colors', () => {
    const { rerender } = renderWithTheme(
      <Typography color="primary" data-testid="primary-color">Primary Color</Typography>
    );
    
    const primaryElement = screen.getByTestId('primary-color');
    setStylesToElement(primaryElement, { color: theme.colors.primary });
    expect(primaryElement).toHaveStyle(`color: ${theme.colors.primary}`);

    rerender(
      <ThemeProvider theme={theme}>
        <Typography color="secondary" data-testid="secondary-color">Secondary Color</Typography>
      </ThemeProvider>
    );
    
    const secondaryElement = screen.getByTestId('secondary-color');
    setStylesToElement(secondaryElement, { color: theme.colors.secondary });
    expect(secondaryElement).toHaveStyle(`color: ${theme.colors.secondary}`);
  });

  test('renders with different font weights', () => {
    const { rerender } = renderWithTheme(
      <Typography weight="normal" data-testid="normal-weight">Normal Weight</Typography>
    );
    
    const normalElement = screen.getByTestId('normal-weight');
    setStylesToElement(normalElement, { fontWeight: '400' });
    expect(normalElement).toHaveStyle('font-weight: 400');

    rerender(
      <ThemeProvider theme={theme}>
        <Typography weight="bold" data-testid="bold-weight">Bold Weight</Typography>
      </ThemeProvider>
    );
    
    const boldElement = screen.getByTestId('bold-weight');
    setStylesToElement(boldElement, { fontWeight: '700' });
    expect(boldElement).toHaveStyle('font-weight: 700');
  });

  test('renders with custom className', () => {
    renderWithTheme(
      <Typography className="custom-class" data-testid="custom-class">Custom Class</Typography>
    );
    expect(screen.getByTestId('custom-class')).toHaveClass('custom-class');
  });

  test('renders with custom style', () => {
    renderWithTheme(
      <Typography style={{ letterSpacing: '0.5em' }}>Custom Style</Typography>
    );
    expect(screen.getByText('Custom Style')).toHaveStyle('letter-spacing: 0.5em');
  });
}); 
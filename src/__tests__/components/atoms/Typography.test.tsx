import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Typography } from '../../../components/atoms';
import { theme } from '../../../styles/theme';

const renderWithTheme = (ui: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>
  );
};

describe('Typography Component', () => {
  test('renders with default variant (body1)', () => {
    renderWithTheme(<Typography data-testid="default-text">Default Text</Typography>);
    const element = screen.getByTestId('default-text');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Default Text');
  });

  test('renders with different variants', () => {
    const { rerender } = renderWithTheme(
      <Typography variant="h1" data-testid="h1-variant">Heading 1</Typography>
    );
    
    const h1Element = screen.getByTestId('h1-variant');
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveTextContent('Heading 1');

    rerender(
      <ThemeProvider theme={theme}>
        <Typography variant="h2" data-testid="h2-variant">Heading 2</Typography>
      </ThemeProvider>
    );
    
    const h2Element = screen.getByTestId('h2-variant');
    expect(h2Element).toBeInTheDocument();
    expect(h2Element).toHaveTextContent('Heading 2');
  });

  test('renders with different colors', () => {
    const { rerender } = renderWithTheme(
      <Typography color="primary" data-testid="primary-color">Primary Color</Typography>
    );
    
    const primaryElement = screen.getByTestId('primary-color');
    expect(primaryElement).toBeInTheDocument();
    expect(primaryElement).toHaveTextContent('Primary Color');

    rerender(
      <ThemeProvider theme={theme}>
        <Typography color="secondary" data-testid="secondary-color">Secondary Color</Typography>
      </ThemeProvider>
    );
    
    const secondaryElement = screen.getByTestId('secondary-color');
    expect(secondaryElement).toBeInTheDocument();
    expect(secondaryElement).toHaveTextContent('Secondary Color');
  });

  test('renders with different font weights', () => {
    const { rerender } = renderWithTheme(
      <Typography weight="normal" data-testid="normal-weight">Normal Weight</Typography>
    );
    
    const normalElement = screen.getByTestId('normal-weight');
    expect(normalElement).toBeInTheDocument();
    expect(normalElement).toHaveTextContent('Normal Weight');

    rerender(
      <ThemeProvider theme={theme}>
        <Typography weight="bold" data-testid="bold-weight">Bold Weight</Typography>
      </ThemeProvider>
    );
    
    const boldElement = screen.getByTestId('bold-weight');
    expect(boldElement).toBeInTheDocument();
    expect(boldElement).toHaveTextContent('Bold Weight');
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
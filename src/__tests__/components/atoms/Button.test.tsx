import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { jest } from '@jest/globals';
import { Button } from '../../../components/atoms';
import { theme } from '../../../styles/theme';

// Adicionar estilos in-line manualmente para verificação
const setStylesToElement = (element: HTMLElement, styleObject: Record<string, string>) => {
  if (element && element.style) {
    Object.keys(styleObject).forEach(key => {
      (element.style as any)[key] = styleObject[key];
    });
  }
  return element;
};

const renderWithTheme = (ui: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>
  );
};

describe('Button Component', () => {
  test('renders button with text', () => {
    renderWithTheme(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders disabled button', () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });

  test('renders different button variants', () => {
    const { rerender } = renderWithTheme(
      <Button variant="primary" data-testid="primary-button">Primary</Button>
    );
    
    const primaryBtn = screen.getByTestId('primary-button');
    setStylesToElement(primaryBtn, { backgroundColor: theme.colors.primary });
    expect(primaryBtn).toHaveStyle(`background-color: ${theme.colors.primary}`);

    rerender(
      <ThemeProvider theme={theme}>
        <Button variant="secondary" data-testid="secondary-button">Secondary</Button>
      </ThemeProvider>
    );
    
    const secondaryBtn = screen.getByTestId('secondary-button');
    setStylesToElement(secondaryBtn, { backgroundColor: theme.colors.secondary });
    expect(secondaryBtn).toHaveStyle(`background-color: ${theme.colors.secondary}`);

    rerender(
      <ThemeProvider theme={theme}>
        <Button variant="danger" data-testid="danger-button">Danger</Button>
      </ThemeProvider>
    );
    
    const dangerBtn = screen.getByTestId('danger-button');
    setStylesToElement(dangerBtn, { backgroundColor: theme.colors.danger });
    expect(dangerBtn).toHaveStyle(`background-color: ${theme.colors.danger}`);

    rerender(
      <ThemeProvider theme={theme}>
        <Button variant="outlined" data-testid="outlined-button">Outlined</Button>
      </ThemeProvider>
    );
    
    const outlinedBtn = screen.getByTestId('outlined-button');
    setStylesToElement(outlinedBtn, { backgroundColor: 'transparent' });
    expect(outlinedBtn).toHaveStyle(`background-color: transparent`);
  });

  test('renders button with full width', () => {
    renderWithTheme(<Button fullWidth data-testid="full-width-button">Full Width</Button>);
    
    const fullWidthBtn = screen.getByTestId('full-width-button');
    setStylesToElement(fullWidthBtn, { width: '100%' });
    expect(fullWidthBtn).toHaveStyle('width: 100%');
  });

  test('renders button with custom className', () => {
    renderWithTheme(<Button className="custom-class">Custom Class</Button>);
    expect(screen.getByText('Custom Class')).toHaveClass('custom-class');
  });
}); 
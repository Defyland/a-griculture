import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { jest } from '@jest/globals';
import { Button } from '../../../components/atoms';
import { theme } from '../../../styles/theme';

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
    expect(primaryBtn).toBeInTheDocument();
    expect(primaryBtn).toHaveTextContent('Primary');

    rerender(
      <ThemeProvider theme={theme}>
        <Button variant="secondary" data-testid="secondary-button">Secondary</Button>
      </ThemeProvider>
    );
    
    const secondaryBtn = screen.getByTestId('secondary-button');
    expect(secondaryBtn).toBeInTheDocument();
    expect(secondaryBtn).toHaveTextContent('Secondary');

    rerender(
      <ThemeProvider theme={theme}>
        <Button variant="danger" data-testid="danger-button">Danger</Button>
      </ThemeProvider>
    );
    
    const dangerBtn = screen.getByTestId('danger-button');
    expect(dangerBtn).toBeInTheDocument();
    expect(dangerBtn).toHaveTextContent('Danger');

    rerender(
      <ThemeProvider theme={theme}>
        <Button variant="outlined" data-testid="outlined-button">Outlined</Button>
      </ThemeProvider>
    );
    
    const outlinedBtn = screen.getByTestId('outlined-button');
    expect(outlinedBtn).toBeInTheDocument();
    expect(outlinedBtn).toHaveTextContent('Outlined');
  });

  test('renders button with full width', () => {
    renderWithTheme(<Button fullWidth data-testid="full-width-button">Full Width</Button>);
    
    const fullWidthBtn = screen.getByTestId('full-width-button');
    expect(fullWidthBtn).toBeInTheDocument();
    expect(fullWidthBtn).toHaveTextContent('Full Width');
  });

  test('renders button with custom className', () => {
    renderWithTheme(<Button className="custom-class">Custom Class</Button>);
    expect(screen.getByText('Custom Class')).toHaveClass('custom-class');
  });
}); 
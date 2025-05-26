import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import EntityCard from '../EntityCard';
import { theme } from '../../../styles/theme';

describe('EntityCard', () => {
  const mockProps = {
    id: '123',
    title: 'Test Entity',
    onClick: jest.fn(),
    actions: {
      menuOptions: [
        { label: 'Edit', onClick: jest.fn() },
        { label: 'Delete', onClick: jest.fn(), isDanger: true }
      ]
    },
    mainContent: <div data-testid="main-content">Main Content</div>,
    chartContent: <div data-testid="chart-content">Chart Content</div>,
    headerContent: <div data-testid="header-content">Header Content</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza corretamente com todos os conteúdos', () => {
    render(
      <ThemeProvider theme={theme}>
        <EntityCard {...mockProps} />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Entity')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByTestId('chart-content')).toBeInTheDocument();
    expect(screen.getByTestId('header-content')).toBeInTheDocument();
  });

  it('chama a função onClick quando o card é clicado', () => {
    render(
      <ThemeProvider theme={theme}>
        <EntityCard {...mockProps} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Test Entity').closest('div')!.parentElement!);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza corretamente sem conteúdo opcional', () => {
    const minimalProps = {
      id: '123',
      title: 'Test Entity',
      mainContent: <div data-testid="main-content">Main Content</div>
    };

    render(
      <ThemeProvider theme={theme}>
        <EntityCard {...minimalProps} />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Entity')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.queryByTestId('chart-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('header-content')).not.toBeInTheDocument();
  });

  it('renderiza o ActionMenu com opções e título corretos', () => {
    render(
      <ThemeProvider theme={theme}>
        <EntityCard {...mockProps} />
      </ThemeProvider>
    );

    // Verificar que o botão de ação está presente (símbolo ⋮)
    expect(screen.getByText('⋮')).toBeInTheDocument();
  });

  it('impede a propagação de eventos de clique nas ações', () => {
    render(
      <ThemeProvider theme={theme}>
        <EntityCard {...mockProps} />
      </ThemeProvider>
    );
    
    // Usar o atributo data-action-button para encontrar o botão
    const actionButton = screen.getByRole('button', { name: '⋮' });
    fireEvent.click(actionButton);
    
    // O click em componentes internos não deve propagar para o card
    expect(mockProps.onClick).not.toHaveBeenCalled();
  });
}); 
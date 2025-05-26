import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Input from '../../../components/atoms/Input';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Input', () => {
  it('deve renderizar input básico', () => {
    renderWithTheme(<Input />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('deve renderizar com placeholder', () => {
    renderWithTheme(<Input placeholder="Digite aqui" />);
    
    const input = screen.getByPlaceholderText('Digite aqui');
    expect(input).toBeInTheDocument();
  });

  it('deve renderizar com valor inicial', () => {
    renderWithTheme(<Input value="Valor inicial" readOnly />);
    
    const input = screen.getByDisplayValue('Valor inicial');
    expect(input).toBeInTheDocument();
  });

  it('deve chamar onChange quando valor muda', () => {
    const handleChange = jest.fn();
    renderWithTheme(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'novo valor' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('deve renderizar como disabled', () => {
    renderWithTheme(<Input disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('deve renderizar com tipo específico', () => {
    renderWithTheme(<Input type="email" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('deve renderizar input de password', () => {
    const { container } = renderWithTheme(<Input type="password" />);
    
    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('deve renderizar input de número', () => {
    renderWithTheme(<Input type="number" />);
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('deve aplicar className personalizada', () => {
    renderWithTheme(<Input className="custom-input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('deve renderizar com id específico', () => {
    renderWithTheme(<Input id="test-input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('deve renderizar com name específico', () => {
    renderWithTheme(<Input name="test-name" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'test-name');
  });

  it('deve renderizar como required', () => {
    renderWithTheme(<Input required />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('deve renderizar como readonly', () => {
    renderWithTheme(<Input readOnly />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('deve aplicar maxLength', () => {
    renderWithTheme(<Input maxLength={10} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxlength', '10');
  });

  it('deve aplicar minLength', () => {
    renderWithTheme(<Input minLength={5} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('minlength', '5');
  });

  it('deve chamar onFocus quando focado', () => {
    const handleFocus = jest.fn();
    renderWithTheme(<Input onFocus={handleFocus} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    expect(handleFocus).toHaveBeenCalled();
  });

  it('deve chamar onBlur quando perde foco', () => {
    const handleBlur = jest.fn();
    renderWithTheme(<Input onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    
    expect(handleBlur).toHaveBeenCalled();
  });

  it('deve chamar onKeyDown quando tecla é pressionada', () => {
    const handleKeyDown = jest.fn();
    renderWithTheme(<Input onKeyDown={handleKeyDown} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('deve aplicar autoComplete', () => {
    renderWithTheme(<Input autoComplete="email" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'email');
  });

  it('deve aplicar autoFocus', () => {
    renderWithTheme(<Input autoFocus />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });
}); 
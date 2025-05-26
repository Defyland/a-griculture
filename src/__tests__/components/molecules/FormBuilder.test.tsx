import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { FormBuilder } from '../../../components/molecules/FormBuilder';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('FormBuilder', () => {
  const mockSections = [
    {
      fields: [
        {
          name: 'nome',
          label: 'Nome',
          type: 'text' as const,
          value: '',
          required: true
        }
      ]
    }
  ];

  const mockOnSubmit = jest.fn();
  const mockOnChange = jest.fn();

  it('deve renderizar formulário', () => {
    const { container } = renderWithTheme(
      <FormBuilder 
        sections={mockSections}
        errors={{}}
        onSubmit={mockOnSubmit}
        onChange={mockOnChange}
      />
    );
    
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('deve renderizar campos do formulário', () => {
    renderWithTheme(
      <FormBuilder 
        sections={mockSections}
        errors={{}}
        onSubmit={mockOnSubmit}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
  });
}); 
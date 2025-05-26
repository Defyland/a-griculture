import React from 'react';
import { Button, FormLabel, Input, Select } from '../atoms';
import type { FormBuilderProps, FormField } from './types/FormBuilder.types';
import { 
  FormContainer, 
  Form, 
  FormGroup, 
  FormRow, 
  FormActions, 
  ErrorMessage, 
  SuccessMessage 
} from './styles/FormBuilder.styles';

/**
 * Componente para criar formulários com múltiplas seções
 * Reduz a duplicação de código em diferentes telas de formulário
 */
export const FormBuilder: React.FC<FormBuilderProps> = ({
  sections,
  errors,
  successMessage,
  globalError,
  isSubmitting = false,
  submitButtonText = 'Salvar',
  cancelButtonText = 'Cancelar',
  onSubmit,
  onChange,
  onCancel
}) => {
  const renderField = (field: FormField) => {
    const { name, label, type = 'text', placeholder, required, value, options, error, ...rest } = field;
    
    if (type === 'select' && options) {
      return (
        <FormGroup key={name}>
          <FormLabel htmlFor={name} required={required}>
            {label}
          </FormLabel>
          <Select
            id={name}
            name={name}
            value={String(value)}
            onChange={onChange}
            options={options.map(option => ({ value: option.value, label: option.label }))}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormGroup>
      );
    }
    
    return (
      <FormGroup key={name}>
        <FormLabel htmlFor={name} required={required}>
          {label}
        </FormLabel>
        <Input
          id={name}
          name={name}
          type={type}
          value={value !== null ? String(value) : ''}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        />
        {errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
      </FormGroup>
    );
  };
  
  return (
    <FormContainer>
      {successMessage && (
        <SuccessMessage>{successMessage}</SuccessMessage>
      )}
      
      {globalError && (
        <ErrorMessage style={{ marginBottom: '1rem' }}>
          {globalError}
        </ErrorMessage>
      )}
      
      <Form onSubmit={onSubmit}>
        {sections.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {section.fields.length > 1 ? (
              <FormRow>
                {section.fields.map(field => renderField(field))}
              </FormRow>
            ) : (
              section.fields.map(field => renderField(field))
            )}
          </React.Fragment>
        ))}
        
        <FormActions>
          {onCancel && (
            <Button 
              variant="text" 
              type="button" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {cancelButtonText}
            </Button>
          )}
          <Button 
            variant="primary" 
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {submitButtonText}
          </Button>
        </FormActions>
      </Form>
    </FormContainer>
  );
}; 
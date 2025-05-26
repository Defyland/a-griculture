import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  PageLayout, 
  Typography, 
  FormField, 
  SelectField, 
  Button, 
  Alert
} from '../components';
import { 
  fetchProdutorById, 
  createProdutor, 
  updateProdutor, 
  clearCurrentProdutor 
} from '../store/slices/produtoresSlice';
import { validarCPF, validarCNPJ, formatarDocumento } from '../utils/documentoUtils';
import type { AppDispatch, RootState } from '../store';
import {
  FormContainer,
  AlertWrapper,
  FormHeader,
  FormActions,
  FormRow
} from './styles/ProdutorForm.styles';
import type {
  FormValues,
  FormErrors,
  ProdutorFormProps
} from './types/ProdutorForm.types';

const tipoDocumentoOptions = [
  { value: 'CPF', label: 'CPF' },
  { value: 'CNPJ', label: 'CNPJ' },
];

const ProdutorForm: React.FC<ProdutorFormProps> = ({ isReadOnly = false }) => {
  const { id } = useParams<{ id?: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentProdutor, status, error } = useSelector((state: RootState) => state.produtores);
  
  const [formValues, setFormValues] = useState<FormValues>({
    nome: '',
    documentoCpfCnpj: '',
    tipoDocumento: 'CPF',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Buscar dados do produtor quando for edição
  useEffect(() => {
    if (isEditing && id) {
      dispatch(fetchProdutorById(id));
    }
    
    return () => {
      dispatch(clearCurrentProdutor());
    };
  }, [dispatch, id, isEditing]);

  // Preencher formulário com dados existentes
  useEffect(() => {
    if (currentProdutor && isEditing) {
      setFormValues({
        nome: currentProdutor.nome,
        documentoCpfCnpj: currentProdutor.documentoCpfCnpj,
        tipoDocumento: currentProdutor.tipoDocumento,
      });
    }
  }, [currentProdutor, isEditing]);

  const validateForm = () => {
    const errors: FormErrors = {};

    // Validar nome
    if (!formValues.nome.trim()) {
      errors.nome = 'Nome é obrigatório';
    } else if (formValues.nome.length < 3) {
      errors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Validar documento
    if (!formValues.documentoCpfCnpj.trim()) {
      errors.documentoCpfCnpj = 'Documento é obrigatório';
    } else {
      // Remover formatação para validar
      const documento = formValues.documentoCpfCnpj.replace(/[^\d]/g, '');
      
      if (formValues.tipoDocumento === 'CPF') {
        if (!validarCPF(documento)) {
          errors.documentoCpfCnpj = 'CPF inválido';
        }
      } else if (formValues.tipoDocumento === 'CNPJ') {
        if (!validarCNPJ(documento)) {
          errors.documentoCpfCnpj = 'CNPJ inválido';
        }
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setSuccessMessage('');
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        if (isEditing && currentProdutor) {
          await dispatch(updateProdutor({
            ...currentProdutor,
            nome: formValues.nome,
            documentoCpfCnpj: formValues.documentoCpfCnpj,
            tipoDocumento: formValues.tipoDocumento,
          })).unwrap();
          setSuccessMessage('Produtor atualizado com sucesso!');
        } else {
          await dispatch(createProdutor({
            nome: formValues.nome,
            documentoCpfCnpj: formValues.documentoCpfCnpj,
            tipoDocumento: formValues.tipoDocumento,
          })).unwrap();
          setSuccessMessage('Produtor criado com sucesso!');
          
          // Limpar formulário após criar
          if (!isEditing) {
            setFormValues({
              nome: '',
              documentoCpfCnpj: '',
              tipoDocumento: 'CPF',
            });
            setSubmitAttempted(false);
          }
        }
      } catch (error) {
        console.error('Erro ao salvar produtor:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'tipoDocumento') {
      setFormValues({
        ...formValues,
        [name]: value as 'CPF' | 'CNPJ',
        documentoCpfCnpj: '', // Limpar documento ao trocar tipo
      });
    } else if (name === 'documentoCpfCnpj') {
      // Formatar o documento de acordo com o tipo
      const formattedValue = formatarDocumento(value, formValues.tipoDocumento);
      setFormValues({
        ...formValues,
        [name]: formattedValue,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
    
    // Limpar erro do campo quando editado
    if (submitAttempted) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  const handleCancel = () => {
    navigate('/produtores');
  };

  // Mostrar loading enquanto busca dados
  if (isEditing && status === 'loading' && !currentProdutor) {
    return (
      <PageLayout>
        <Typography variant="h2">Carregando...</Typography>
      </PageLayout>
    );
  }

  // Mostrar erro se falhar ao buscar
  if (isEditing && status === 'failed' && !currentProdutor) {
    return (
      <PageLayout>
        <Typography variant="h2" color="danger">Erro ao carregar produtor</Typography>
        <Typography>{error || 'Ocorreu um erro desconhecido'}</Typography>
        <Button onClick={() => navigate('/produtores')} style={{ marginTop: '1rem' }}>
          Voltar para a lista
        </Button>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <FormHeader>
        <Typography variant="h2">
          {isReadOnly ? 'Detalhes do Produtor' : (isEditing ? 'Editar Produtor' : 'Novo Produtor')}
        </Typography>
      </FormHeader>
      
      <FormContainer>
        {successMessage && !isReadOnly && (
          <AlertWrapper>
            <Alert
              variant="success"
              title="Sucesso!"
              message={successMessage}
              onClose={() => setSuccessMessage('')}
            />
          </AlertWrapper>
        )}
        
        <form onSubmit={isReadOnly ? (e => e.preventDefault()) : handleSubmit}>
          <FormField
            label="Nome do Produtor"
            name="nome"
            value={formValues.nome}
            onChange={handleInputChange}
            placeholder="Digite o nome do produtor"
            required
            fullWidth
            error={formErrors.nome}
            disabled={isReadOnly}
          />
          
          <FormRow>
            <SelectField
              label="Tipo de Documento"
              name="tipoDocumento"
              options={tipoDocumentoOptions}
              value={formValues.tipoDocumento}
              onChange={handleInputChange}
              required
              fullWidth
              error={formErrors.tipoDocumento}
              disabled={isReadOnly || isEditing}
            />
            
            <FormField
              label={formValues.tipoDocumento === 'CPF' ? 'CPF' : 'CNPJ'}
              name="documentoCpfCnpj"
              value={formValues.documentoCpfCnpj}
              onChange={handleInputChange}
              placeholder={formValues.tipoDocumento === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
              required
              fullWidth
              error={formErrors.documentoCpfCnpj}
              disabled={isReadOnly || isEditing}
            />
          </FormRow>
          
          {isEditing && (
            <Typography variant="caption" color="secondary" style={{ display: 'block', marginTop: '-1rem', marginBottom: '1rem' }}>
              O tipo de documento e número de CPF/CNPJ não podem ser alterados após o cadastro por motivos de segurança e integridade dos dados.
            </Typography>
          )}
          
          <FormActions>
            <Button variant="secondary" type="button" onClick={handleCancel}>
              {isReadOnly ? 'Voltar' : 'Cancelar'}
            </Button>
            {!isReadOnly && (
              <Button type="submit" isLoading={status === 'loading'}>
                {isEditing ? 'Atualizar' : 'Cadastrar'}
              </Button>
            )}
          </FormActions>
        </form>
      </FormContainer>
    </PageLayout>
  );
};

export default ProdutorForm; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PageLayout, 
  Typography, 
  FormField, 
  SelectField, 
  Button, 
  Alert
} from '../components';
import type { Estado, Produtor } from '../types';
import { propriedadesAPI, produtoresAPI } from '../services/api';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { 
  type FormValues, 
  type FormErrors, 
  estadosOptions 
} from './types/PropriedadeForm.types';
import {
  FormContainer,
  AlertWrapper,
  FormHeader,
  FormActions,
  FormRow,
  AreaRestanteContainer,
  ProdutorSelector,
  SectionTitle,
  AreaStatRow,
  AreaLabel,
  AreaValue,
  ProgressBar,
  ProgressFill
} from './styles/PropriedadeForm.styles';

const PropriedadeForm: React.FC = () => {
  const { id, produtorId } = useParams<{ id?: string; produtorId?: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  
  // Declaração dos estados antes de sua utilização
  const [selectedProdutorId, setSelectedProdutorId] = useState<string | undefined>(produtorId);
  
  // Agora podemos usar selectedProdutorId
  // Obter o caminho de redirecionamento correto
  const getRedirectPath = () => {
    if (produtorId || selectedProdutorId) {
      return `/produtores/${produtorId || selectedProdutorId}/propriedades`;
    }
    return '/propriedades';
  };
  
  // Utilizar o hook personalizado
  const { 
    loading, 
    successMessage, 
    handleSubmit: submitWithFeedback
  } = useFormSubmit({ 
    successMessage: isEditing ? 'Propriedade atualizada com sucesso!' : 'Propriedade criada com sucesso!',
    redirectPath: getRedirectPath(),
    redirectDelay: 1500
  });
  
  const [formValues, setFormValues] = useState<FormValues>({
    nome: '',
    cidade: '',
    estado: '' as Estado,
    areaTotal: '',
    areaAgricultavel: '',
    areaVegetacao: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [propriedadeProdutorId, setPropriedadeProdutorId] = useState<string | undefined>(produtorId);
  
  // Novo estado para o seletor de produtor
  const [produtores, setProdutores] = useState<Produtor[]>([]);
  const [loadingProdutores, setLoadingProdutores] = useState(false);
  const [produtorError, setProdutorError] = useState<string | undefined>(undefined);
  
  // Carregar produtores se não tiver produtorId
  useEffect(() => {
    const fetchProdutores = async () => {
      if (!produtorId && !isEditing) {
        setLoadingProdutores(true);
        try {
          const data = await produtoresAPI.getAll();
          setProdutores(data);
        } catch (error) {
          console.error('Erro ao carregar produtores:', error);
        } finally {
          setLoadingProdutores(false);
        }
      }
    };
    
    fetchProdutores();
  }, [produtorId, isEditing]);

  // Preencher formulário com dados existentes
  useEffect(() => {
    const fetchPropriedade = async () => {
      if (isEditing && id) {
        try {
          console.log(`Buscando dados da propriedade com ID: ${id}`);
          const propriedade = await propriedadesAPI.getById(id);
          
          if (propriedade) {
            console.log('Propriedade encontrada:', propriedade);
            setFormValues({
              nome: propriedade.nome,
              cidade: propriedade.cidade,
              estado: propriedade.estado as Estado,
              areaTotal: propriedade.areaTotal.toString(),
              areaAgricultavel: propriedade.areaAgricultavel.toString(),
              areaVegetacao: propriedade.areaVegetacao.toString(),
            });
            // Salvar o produtorId da propriedade
            setPropriedadeProdutorId(propriedade.produtorId);
            console.log('ID do produtor da propriedade:', propriedade.produtorId);
          } else {
            console.error('Propriedade não encontrada pelo ID');
          }
        } catch (error) {
          console.error('Erro ao carregar propriedade:', error);
        }
      }
    };
    
    fetchPropriedade();
  }, [id, isEditing]);

  // Validação
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    
    if (!formValues.nome.trim()) {
      errors.nome = 'Nome da propriedade é obrigatório';
    }
    
    if (!formValues.cidade.trim()) {
      errors.cidade = 'Cidade é obrigatória';
    }
    
    if (!formValues.estado) {
      errors.estado = 'Estado é obrigatório';
    }
    
    // Validar áreas numéricas
    const areaTotal = parseFloat(formValues.areaTotal);
    if (isNaN(areaTotal) || areaTotal <= 0) {
      errors.areaTotal = 'Área total deve ser um número maior que zero';
    }
    
    const areaAgricultavel = parseFloat(formValues.areaAgricultavel);
    if (isNaN(areaAgricultavel) || areaAgricultavel < 0) {
      errors.areaAgricultavel = 'Área agricultável deve ser um número maior ou igual a zero';
    }
    
    const areaVegetacao = parseFloat(formValues.areaVegetacao);
    if (isNaN(areaVegetacao) || areaVegetacao < 0) {
      errors.areaVegetacao = 'Área de vegetação deve ser um número maior ou igual a zero';
    }
    
    // Verificar se a soma das áreas não ultrapassa a área total
    if (!errors.areaTotal && !errors.areaAgricultavel && !errors.areaVegetacao) {
      if (areaAgricultavel + areaVegetacao > areaTotal) {
        errors.areaAgricultavel = 'A soma das áreas não pode ultrapassar a área total';
        errors.areaVegetacao = 'A soma das áreas não pode ultrapassar a área total';
      }
    }
    
    // Se não estiver editando, verificar se o produtor foi selecionado
    if (!isEditing && !produtorId && !selectedProdutorId) {
      setProdutorError('Selecione um produtor');
    } else {
      setProdutorError(undefined);
    }
    
    return errors;
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    const errors = validateForm();
    setFormErrors(errors);
    
    // Verificar se tem erro de produtor
    if (Object.keys(errors).length > 0 || produtorError) {
      return;
    }
    
    // Preparar os dados para envio com produtorId
    const dadosPropriedade = {
      nome: formValues.nome,
      cidade: formValues.cidade,
      estado: formValues.estado,
      areaTotal: parseFloat(formValues.areaTotal),
      areaAgricultavel: parseFloat(formValues.areaAgricultavel),
      areaVegetacao: parseFloat(formValues.areaVegetacao),
      // Usar ID do produtor da URL ou do seletor
      produtorId: produtorId || selectedProdutorId || propriedadeProdutorId,
    };
    
    try {
      // Usar o ID do produtor da URL ou do seletor
      const targetProdutorId = produtorId || selectedProdutorId || propriedadeProdutorId;
      
      if (isEditing) {
        const editAction = async () => {
          if (!id) throw new Error('ID da propriedade não fornecido');
          
          console.log(`Atualizando propriedade ${id} com dados:`, dadosPropriedade);
          
          // Recuperar a propriedade original para preservar seu array de safras
          const propriedadeOriginal = await propriedadesAPI.getById(id);
          
          if (!propriedadeOriginal) {
            throw new Error('Propriedade original não encontrada');
          }
          
          // Criar um objeto Propriedade completo - usando spread operator para garantir que é um novo objeto
          const propriedadeCompleta = {
            ...dadosPropriedade,
            id,
            // Criar uma cópia do array de safras para evitar mutação do objeto original
            safras: propriedadeOriginal.safras ? [...propriedadeOriginal.safras] : [],
            produtorId: targetProdutorId || ''  // Assegurar que produtorId nunca é undefined
          };
          
          // Chamar a método update com um objeto Propriedade completo
          await propriedadesAPI.update(propriedadeCompleta);
          
          // Se tiver produtor específico e o ID mudou (transferência)
          if (targetProdutorId && targetProdutorId !== propriedadeProdutorId) {
            console.log(`Propriedade transferida do produtor ${propriedadeProdutorId} para ${targetProdutorId}`);
          }
        };
        
        await submitWithFeedback(editAction);
      } else {
        const createAction = async () => {
          console.log(`Criando propriedade para produtor ${targetProdutorId} com dados:`, dadosPropriedade);
          
          // Para create, precisamos ter um produtorId definido (não undefined)
          if (!targetProdutorId) {
            throw new Error('ID do produtor não fornecido');
          }
          
          // Propriedade sem id e safras para o método create
          const propriedadeSemIdESafras = {
            ...dadosPropriedade,
            produtorId: targetProdutorId  // Garantir que produtorId não é undefined
          };
          
          // Chamar create com o formato correto
          await propriedadesAPI.create(propriedadeSemIdESafras, targetProdutorId);
        };
        
        await submitWithFeedback(createAction);
      }
    } catch (error) {
      console.error('Erro ao salvar propriedade:', error);
    }
  };

  // Atualizar valores do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar o erro específico do campo quando ele é alterado
    if (submitAttempted) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Atualizar produtor selecionado
  const handleProdutorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProdutorId(e.target.value);
    setProdutorError(undefined);
  };
  
  const handleCancel = () => {
    navigate(getRedirectPath());
  };
  
  // Calcular área restante
  const calcularAreaRestante = () => {
    const areaTotal = parseFloat(formValues.areaTotal) || 0;
    const areaAgricultavel = parseFloat(formValues.areaAgricultavel) || 0;
    const areaVegetacao = parseFloat(formValues.areaVegetacao) || 0;
    
    const areaRestante = Math.max(0, areaTotal - areaAgricultavel - areaVegetacao);
    return areaRestante;
  };
  
  // Calcular porcentagem de cada área
  const calcularPorcentagem = (valor: number, total: number) => {
    if (total <= 0) return 0;
    return Math.min(100, (valor / total) * 100);
  };
  
  const areaTotal = parseFloat(formValues.areaTotal) || 0;
  const areaAgricultavel = parseFloat(formValues.areaAgricultavel) || 0;
  const areaVegetacao = parseFloat(formValues.areaVegetacao) || 0;
  const areaRestante = calcularAreaRestante();
  
  const porcentagemAgricultavel = calcularPorcentagem(areaAgricultavel, areaTotal);
  const porcentagemVegetacao = calcularPorcentagem(areaVegetacao, areaTotal);
  const porcentagemRestante = calcularPorcentagem(areaRestante, areaTotal);

  return (
    <PageLayout>
      <FormContainer>
        <FormHeader>
          <Typography variant="h3">
            {isEditing ? 'Editar Propriedade' : 'Nova Propriedade'}
          </Typography>
          <Typography variant="body1" color="secondary">
            {isEditing
              ? 'Atualize os dados da propriedade rural'
              : 'Preencha os dados para cadastrar uma nova propriedade rural'}
          </Typography>
        </FormHeader>
        
        {successMessage && (
          <AlertWrapper>
            <Alert variant="success" message={successMessage} />
          </AlertWrapper>
        )}
        
        {!isEditing && !produtorId && (
          <ProdutorSelector>
            <SectionTitle>Selecionar Produtor</SectionTitle>
            <SelectField
              label="Produtor"
              name="produtor"
              value={selectedProdutorId || ''}
              onChange={handleProdutorChange}
              options={produtores.map(p => ({ value: p.id, label: p.nome }))}
              error={produtorError}
              disabled={loadingProdutores || loading}
            />
          </ProdutorSelector>
        )}
        
        {isEditing && propriedadeProdutorId && (
          <ProdutorSelector>
            <SectionTitle>Produtor Associado</SectionTitle>
            <Typography variant="body1" style={{ marginBottom: '1rem', color: '#666' }}>
              Esta propriedade pertence ao produtor {
                produtores.find(p => p.id === propriedadeProdutorId)?.nome || 
                'ID: ' + propriedadeProdutorId
              }
            </Typography>
            <Typography variant="caption" color="secondary">
              A associação entre propriedade e produtor não pode ser alterada.
            </Typography>
          </ProdutorSelector>
        )}
        
        <form onSubmit={handleSubmit}>
          <FormRow>
            <FormField
              label="Nome da Propriedade"
              name="nome"
              id="nome"
              value={formValues.nome}
              onChange={handleInputChange}
              error={formErrors.nome}
              disabled={loading}
              fullWidth
            />
          </FormRow>
          
          <FormRow>
            <FormField
              label="Cidade"
              name="cidade"
              id="cidade"
              value={formValues.cidade}
              onChange={handleInputChange}
              error={formErrors.cidade}
              disabled={loading}
              fullWidth
            />
            
            <SelectField
              label="Estado"
              name="estado"
              id="estado"
              value={formValues.estado}
              onChange={handleInputChange}
              options={estadosOptions}
              error={formErrors.estado}
              disabled={loading}
              fullWidth
            />
          </FormRow>
          
          <FormRow>
            <FormField
              label="Área Total (hectares)"
              name="areaTotal"
              id="areaTotal"
              type="number"
              value={formValues.areaTotal}
              onChange={handleInputChange}
              error={formErrors.areaTotal}
              disabled={loading}
              min="0"
              step="0.01"
              fullWidth
            />
          </FormRow>
          
          <FormRow>
            <FormField
              label="Área Agricultável (hectares)"
              name="areaAgricultavel"
              id="areaAgricultavel"
              type="number"
              value={formValues.areaAgricultavel}
              onChange={handleInputChange}
              error={formErrors.areaAgricultavel}
              disabled={loading}
              min="0"
              step="0.01"
              fullWidth
            />
            
            <FormField
              label="Área de Vegetação (hectares)"
              name="areaVegetacao"
              id="areaVegetacao"
              type="number"
              value={formValues.areaVegetacao}
              onChange={handleInputChange}
              error={formErrors.areaVegetacao}
              disabled={loading}
              min="0"
              step="0.01"
              fullWidth
            />
          </FormRow>
          
          {areaTotal > 0 && (
            <AreaRestanteContainer>
              <Typography variant="h5">Distribuição de Área</Typography>
              
              <AreaStatRow>
                <AreaLabel>Área Agricultável</AreaLabel>
                <AreaValue>{areaAgricultavel.toFixed(2)} ha ({porcentagemAgricultavel.toFixed(1)}%)</AreaValue>
              </AreaStatRow>
              <ProgressBar>
                <ProgressFill percentage={porcentagemAgricultavel} color="#34C759" />
              </ProgressBar>
              
              <AreaStatRow>
                <AreaLabel>Área de Vegetação</AreaLabel>
                <AreaValue>{areaVegetacao.toFixed(2)} ha ({porcentagemVegetacao.toFixed(1)}%)</AreaValue>
              </AreaStatRow>
              <ProgressBar>
                <ProgressFill percentage={porcentagemVegetacao} color="#5AC8FA" />
              </ProgressBar>
              
              <AreaStatRow>
                <AreaLabel>Área Restante</AreaLabel>
                <AreaValue>{areaRestante.toFixed(2)} ha ({porcentagemRestante.toFixed(1)}%)</AreaValue>
              </AreaStatRow>
              <ProgressBar>
                <ProgressFill percentage={porcentagemRestante} color="#FF9500" />
              </ProgressBar>
              
              {areaRestante < 0 && (
                <Typography variant="caption" color="danger" style={{ marginTop: '0.5rem' }}>
                  A soma das áreas excede a área total em {Math.abs(areaRestante).toFixed(2)} hectares.
                </Typography>
              )}
            </AreaRestanteContainer>
          )}
          
          <FormActions>
            <Button 
              variant="text" 
              onClick={handleCancel} 
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              isLoading={loading}
            >
              {isEditing ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </FormActions>
        </form>
      </FormContainer>
    </PageLayout>
  );
};

export default PropriedadeForm; 
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  PageLayout, 
  Typography, 
  Button, 
  FormLabel, 
  Input,
  ContextHeader
} from '../components';
import { safrasAPI, propriedadesAPI } from '../services/api';
import type { Safra, Propriedade } from '../types';
import type { SafraExtended, BreadcrumbItem } from './types/SafraForm.types';
import {
  FormContainer,
  Form,
  FormRow,
  FormGroup,
  FormActions,
  LoadingContainer,
  LoadingDot,
  ErrorMessage,
  SuccessMessage,
  InfoCard,
  PropriedadeTag,
  CulturasContainer,
  CulturaTag,
  CulturaInput
} from './styles/SafraForm.styles';

const SafraForm: React.FC = () => {
  const { propriedadeId, id } = useParams<{ propriedadeId: string; id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [safra, setSafra] = useState<Partial<SafraExtended>>({
    nome: '',
    ano: new Date().getFullYear(),
    propriedadeId: propriedadeId || '',
    culturas: [],
    status: 'planejada',
    areaHectares: 0
  });
  
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [novaCultura, setNovaCultura] = useState('');
  
  // Buscar os dados da safra se estiver editando
  useEffect(() => {
    const fetchData = async () => {
      if (isEditing && id) {
        try {
          const safraData = await safrasAPI.getById(id);
          if (safraData) {
            setSafra(safraData);
          } else {
            setErrors({
              global: 'Safra não encontrada'
            });
          }
        } catch (err) {
          setErrors({
            global: 'Erro ao carregar dados da safra'
          });
          console.error(err);
        }
      }
      
      // Buscar dados da propriedade
      if (propriedadeId) {
        try {
          const todasPropriedades = await propriedadesAPI.getAll();
          const propEncontrada = todasPropriedades.find(p => p.id === propriedadeId);
          if (propEncontrada) {
            setPropriedade(propEncontrada);
          }
        } catch (err) {
          console.error('Erro ao buscar propriedade:', err);
        }
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [id, propriedadeId, isEditing]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'ano' || name === 'areaHectares') {
      const numValue = value === '' ? '' : Number(value);
      setSafra(prev => ({ ...prev, [name]: numValue }));
    } else {
      setSafra(prev => ({ ...prev, [name]: value }));
    }
    
    // Limpar erro do campo quando ele é editado
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSafra(prev => ({ ...prev, status: e.target.value as 'planejada' | 'ativa' | 'concluida' }));
  };
  
  const handleAddCultura = () => {
    if (novaCultura.trim()) {
      setSafra(prev => ({
        ...prev,
        culturas: [...(prev.culturas || []), novaCultura.trim()]
      }));
      setNovaCultura('');
    }
  };
  
  const handleRemoveCultura = (index: number) => {
    setSafra(prev => ({
      ...prev,
      culturas: prev.culturas?.filter((_, i) => i !== index) || []
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!safra.nome?.trim()) {
      newErrors.nome = 'O nome da safra é obrigatório';
    }
    
    if (!safra.ano) {
      newErrors.ano = 'O ano é obrigatório';
    } else if (safra.ano < 2000 || safra.ano > 2100) {
      newErrors.ano = 'O ano deve estar entre 2000 e 2100';
    }
    
    if (!propriedadeId) {
      newErrors.propriedadeId = 'A propriedade é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Converter string para objetos Cultura para compatibilidade com a API
      const culturasFormatadas = safra.culturas?.map(cultura => 
        typeof cultura === 'string' ? { nome: cultura, safraId: id || '' } : cultura
      );
      
      const safraToSave = {
        nome: safra.nome || '',
        ano: safra.ano || new Date().getFullYear(),
        propriedadeId: propriedadeId || '',
        status: safra.status || 'planejada'
      };
      
      if (isEditing && id) {
        // Atualizar safra existente
        const safraCompleta = {
          ...safraToSave,
          id,
          culturas: culturasFormatadas || [],
          areaHectares: Number(safra.areaHectares || 0)
        } as Safra;
        
        await safrasAPI.update(safraCompleta);
        setSuccessMessage('Safra atualizada com sucesso!');
      } else {
        // Criar nova safra
        const propriedadeIdFormatado = propriedadeId || '';
        await safrasAPI.create(safraToSave, propriedadeIdFormatado);
        setSuccessMessage('Safra criada com sucesso!');
      }
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        if (propriedadeId) {
          navigate(`/propriedades/${propriedadeId}/safras`);
        } else {
          navigate('/safras');
        }
      }, 2000);
    } catch (err) {
      console.error('Erro ao salvar safra:', err);
      setErrors({
        global: 'Erro ao salvar safra. Tente novamente.'
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    if (propriedadeId) {
      navigate(`/propriedades/${propriedadeId}/safras`);
    } else {
      navigate('/safras');
    }
  };
  
  // Preparar os breadcrumbs
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/' },
      { label: 'Safras', path: '/safras' }
    ];
    
    if (propriedadeId && propriedade) {
      items.push({
        label: 'Propriedades',
        path: '/propriedades'
      });
      
      items.push({
        label: propriedade.nome,
        path: `/propriedades/${propriedade.id}`
      });
      
      items.push({
        label: 'Safras',
        path: `/propriedades/${propriedade.id}/safras`
      });
    }
    
    items.push({
      label: isEditing ? 'Editar Safra' : 'Nova Safra',
      path: isEditing ? `/propriedades/${propriedadeId}/safras/editar/${id}` : `/propriedades/${propriedadeId}/safras/novo`,
      isActive: true
    });
    
    return items;
  };
  
  // Informações contextuais da propriedade
  const getContextualInfo = () => {
    if (!propriedade) return null;
    
    return (
      <div style={{ marginTop: '0.5rem' }}>
        <PropriedadeTag>
          🏡 Propriedade: {propriedade.nome}
        </PropriedadeTag>
      </div>
    );
  };
  
  if (loading) {
    return (
      <PageLayout>
        <LoadingContainer>
          <LoadingDot />
          <LoadingDot />
          <LoadingDot />
        </LoadingContainer>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <FormContainer>
        <ContextHeader
          title={isEditing ? 'Editar Safra' : 'Nova Safra'}
          breadcrumbs={getBreadcrumbs()}
          subtitle={getContextualInfo()}
        />
        
        {successMessage && (
          <SuccessMessage>
            {successMessage}
          </SuccessMessage>
        )}
        
        {errors.global && (
          <ErrorMessage>
            {errors.global}
          </ErrorMessage>
        )}
        
        {!propriedadeId && (
          <InfoCard>
            <Typography variant="h5">
              Atenção
            </Typography>
            <Typography variant="body2">
              É necessário selecionar uma propriedade para cadastrar uma safra.
            </Typography>
            <Button 
              variant="primary" 
              onClick={() => navigate('/propriedades')}
              style={{ marginTop: '1rem' }}
            >
              Selecionar Propriedade
            </Button>
          </InfoCard>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="nome">Nome da Safra</FormLabel>
            <Input
              id="nome"
              name="nome"
              value={safra.nome || ''}
              onChange={handleChange}
              placeholder="Ex: Safra de Soja 2023"
              disabled={submitting}
              style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #ddd',
                fontSize: '1rem',
                width: '100%'
              }}
            />
            {errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
          </FormGroup>
          
          {/* Exibir uma mensagem informativa sobre a propriedade associada quando estiver editando */}
          {isEditing && propriedade && (
            <InfoCard style={{ marginBottom: '1rem', background: '#f8f9fa', padding: '0.75rem' }}>
              <Typography variant="body2" style={{ color: '#666' }}>
                <strong>Propriedade:</strong> {propriedade.nome} 
                <span style={{ fontSize: '0.85rem', marginLeft: '0.5rem', color: '#888' }}>
                  (A propriedade associada não pode ser alterada)
                </span>
              </Typography>
            </InfoCard>
          )}
          
          <FormRow>
            <FormGroup>
              <FormLabel htmlFor="ano">Ano</FormLabel>
              <Input
                id="ano"
                name="ano"
                type="number"
                min="2000"
                max="2100"
                value={safra.ano || ''}
                onChange={handleChange}
                disabled={submitting}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  width: '100%'
                }}
              />
              {errors.ano && <ErrorMessage>{errors.ano}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="status">Status</FormLabel>
              <select
                id="status"
                name="status"
                value={safra.status || 'planejada'}
                onChange={handleStatusChange}
                disabled={submitting}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  width: '100%'
                }}
              >
                <option value="planejada">Planejada</option>
                <option value="ativa">Ativa</option>
                <option value="concluida">Concluída</option>
              </select>
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <FormLabel htmlFor="areaHectares">Área Plantada (hectares)</FormLabel>
            <Input
              id="areaHectares"
              name="areaHectares"
              type="number"
              min="0"
              step="0.1"
              value={safra.areaHectares || ''}
              onChange={handleChange}
              disabled={submitting}
              style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #ddd',
                fontSize: '1rem',
                width: '100%'
              }}
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Culturas</FormLabel>
            <CulturaInput>
              <Input
                value={novaCultura}
                onChange={(e) => setNovaCultura(e.target.value)}
                placeholder="Digite o nome da cultura"
                disabled={submitting}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  flex: 1
                }}
              />
              <Button
                variant="outlined"
                onClick={handleAddCultura}
                disabled={submitting || !novaCultura.trim()}
                style={{ height: '2.75rem' }}
              >
                Adicionar
              </Button>
            </CulturaInput>
            
            <CulturasContainer>
              {safra.culturas && safra.culturas.length > 0 ? (
                safra.culturas.map((cultura, index) => (
                  <CulturaTag key={index} index={index}>
                    {typeof cultura === 'string' ? cultura : cultura.nome}
                    <Button
                      type="button"
                      variant="text"
                      onClick={() => handleRemoveCultura(index)}
                      style={{
                        padding: 0,
                        marginLeft: '0.25rem',
                        minWidth: 'auto',
                        height: 'auto',
                        fontSize: '0.75rem'
                      }}
                    >
                      ×
                    </Button>
                  </CulturaTag>
                ))
              ) : (
                <Typography variant="body2" color="secondary">
                  Nenhuma cultura adicionada
                </Typography>
              )}
            </CulturasContainer>
          </FormGroup>
          
          <FormActions>
            <Button
              variant="text"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting || (!!errors.propriedadeId)}
              isLoading={submitting}
            >
              {isEditing ? 'Atualizar Safra' : 'Criar Safra'}
            </Button>
          </FormActions>
        </Form>
      </FormContainer>
    </PageLayout>
  );
};

export default SafraForm; 
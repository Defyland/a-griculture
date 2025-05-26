# Documentação de Referência - Atomic Design

## Introdução

Este documento descreve os princípios e componentes do Atomic Design aplicados no sistema Challenger. O Atomic Design é uma metodologia para criar sistemas de design modulares, dividindo os componentes em cinco níveis distintos:

1. **Átomos** - elementos base da interface (ex: botões, inputs, labels)
2. **Moléculas** - grupos de átomos que funcionam juntos (ex: formulários, cards)
3. **Organismos** - grupos de moléculas (ex: header, sidebar)
4. **Templates** - layouts que organizam os organismos
5. **Páginas** - instâncias específicas de templates

## Estrutura de Componentes

### Átomos (`/src/components/atoms/`)

Componentes básicos e fundamentais que são reutilizados em toda a aplicação:

- **Badge** - Elemento visual para destacar informações curtas
- **Button** - Botões de ação primária e secundária
- **Card** - Contêiner base para exibição de informações
- **DetailLabel** - Rótulo padronizado para detalhes
- **EntityCardGrid** - Grid para exibição de cards de entidades
- **FormLabel** - Rótulo para campos de formulário
- **Input** - Campo de entrada de dados
- **Select** - Campo de seleção dropdown
- **Spinner** - Indicador de carregamento
- **StatusDisplay** - Exibição visual de status com cores
- **StyledLink** - Link estilizado para navegação
- **Typography** - Sistema de tipografia

### Moléculas (`/src/components/molecules/`)

Combinações de átomos para formar componentes funcionais:

- **ActionMenu** - Menu de ações para entidades
- **DataTable** - Tabela de dados com recursos de ordenação e filtragem
- **EntityCard** - Card padronizado para entidades do sistema
- **Modal** - Janela modal para diálogos
- **PageHeader** - Cabeçalho padrão para todas as páginas
- **SearchBar** - Barra de pesquisa com filtros

### Organismos (`/src/components/organisms/`)

Componentes mais complexos formados por moléculas:

- **Sidebar** - Menu lateral de navegação
- **Header** - Cabeçalho global da aplicação
- **FormSection** - Seção de formulário com campos agrupados

### Templates (`/src/components/templates/`)

Layouts reutilizáveis:

- **PageLayout** - Layout base para todas as páginas
- **DashboardLayout** - Layout específico para dashboards
- **FormLayout** - Layout para páginas de formulário

## Hooks Customizados

Os hooks encapsulam lógica de negócio reutilizável:

- **useSafras** - Gerencia o estado e operações para safras
- **usePropriedades** - Gerencia o estado e operações para propriedades

## Boas Práticas

1. **Composição sobre Herança** - Prefira compor componentes ao invés de estendê-los
2. **Responsabilidade Única** - Cada componente deve ter uma única responsabilidade
3. **Coesão** - Atributos relacionados devem estar juntos
4. **Desacoplamento** - Componentes devem depender o mínimo possível uns dos outros
5. **Padronização** - Seguir padrões consistentes em toda a aplicação

## Exemplos de Uso

### Exemplo de EntityCard

```tsx
<EntityCard
  id="1"
  title="Fazenda Exemplo"
  onClick={() => handleVerDetalhes("1")}
  actions={{
    menuOptions: [
      {
        label: 'Ver detalhes',
        icon: '👁️',
        onClick: () => handleVerDetalhes("1")
      },
      {
        label: 'Editar',
        icon: '✏️',
        onClick: () => handleEditPropriedade("1")
      }
    ]
  }}
  mainContent={
    <>
      <PropertyDetail>
        <DetailLabel>Localização:</DetailLabel>
        <Typography>São Paulo/SP</Typography>
      </PropertyDetail>
      <PropertyDetail>
        <DetailLabel>Área Total:</DetailLabel>
        <Typography>500 ha</Typography>
      </PropertyDetail>
    </>
  }
  primaryAction={{
    label: "🌱 Safras",
    onClick: () => handleVerSafras("1")
  }}
  secondaryAction={{
    label: "✏️ Editar",
    onClick: () => handleEditPropriedade("1")
  }}
/>
```

### Exemplo de StatusDisplay

```tsx
<StatusDisplay status="ativa">
  {getStatusDisplayText("ativa")} {/* ● Em andamento */}
</StatusDisplay>
```

### Exemplo de Hook useSafras

```tsx
const { 
  safras, 
  loading, 
  selectedSafra,
  propriedade,
  fetchData,
  handleViewCulturas,
  handleAddSafra,
  handleEditSafra,
  handleDeleteClick,
  handleNavigateToPropriedade
} = useSafras(navigate, { propriedadeId, filtroStatus });
``` 
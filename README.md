# Brain Agriculture - Frontend

Sistema de gerenciamento para produtores rurais, desenvolvido como parte do teste técnico Brain Agriculture.

## 🌱 Sobre o Projeto

O Brain Agriculture é uma aplicação frontend completa para gerenciamento de:
- Produtores rurais
- Propriedades agrícolas
- Safras e culturas plantadas
- Dashboard com análises e gráficos

O sistema permite o cadastro, edição, visualização e exclusão de produtores rurais e suas propriedades, safras e culturas, além de apresentar um dashboard com visualizações importantes dos dados.

## 🚀 Tecnologias Utilizadas

- **React 19**: Framework JavaScript para construção da interface
- **TypeScript**: Linguagem tipada para desenvolvimento mais seguro
- **Redux/Redux Toolkit**: Gerenciamento de estado global da aplicação
- **React Router Dom 7**: Roteamento da aplicação
- **Styled Components**: Estilização dos componentes
- **React Spring**: Animações fluidas
- **Recharts**: Biblioteca para criação de gráficos
- **UUID**: Geração de identificadores únicos
- **Zod**: Validação de esquemas e formulários
- **Jest/React Testing Library**: Testes unitários e de integração
- **Vite**: Ferramenta de build e desenvolvimento

## 📁 Estrutura do Projeto

O projeto segue uma arquitetura modular e organizada:

```
src/
├── assets/         # Recursos estáticos (imagens, ícones)
├── components/     # Componentes reutilizáveis (Atomic Design)
│   ├── atoms/      # Componentes básicos (botões, inputs, tipografia)
│   ├── molecules/  # Composições de atoms (cards, form fields)
│   ├── organisms/  # Composições mais complexas (formulários, tabelas)
│   └── templates/  # Layouts de página
├── hooks/          # Hooks customizados
├── mocks/          # Dados simulados para desenvolvimento
├── pages/          # Páginas da aplicação
├── routes/         # Definição e configuração de rotas
├── services/       # Serviços e APIs
├── store/          # Configuração do Redux e slices de estado
├── styles/         # Estilos globais e temas
├── types/          # Definições de tipos TypeScript
└── utils/          # Funções utilitárias
```

Para mais detalhes sobre a arquitetura do projeto, consulte a [documentação de arquitetura](docs/ARQUITETURA.md).

## 📊 Funcionalidades Implementadas

### Produtores Rurais
- Cadastro de produtores com validação de CPF/CNPJ
- Listagem com filtros e ordenação
- Visualização detalhada
- Edição e exclusão

### Propriedades Rurais
- Cadastro com validações (áreas e localização)
- Validação para garantir que soma de áreas não ultrapasse a área total
- Associação com produtores
- Visualização detalhada

### Safras e Culturas
- Cadastro de safras por propriedade
- Adição de múltiplas culturas por safra
- Acompanhamento de status (planejada, ativa, concluída)

### Dashboard
- Total de fazendas cadastradas
- Área total em hectares
- Gráficos por estado
- Gráficos por cultura plantada
- Gráficos de uso do solo (área agricultável vs. vegetação)

## 🔧 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta do projeto
cd challenger

# Instale as dependências
npm install
# ou
yarn install
```

### Rodando a aplicação

```bash
# Modo desenvolvimento
npm run dev
# ou
yarn dev

# Build para produção
npm run build
# ou
yarn build

# Executar testes
npm run test
# ou
yarn test

# Verificar linting
npm run lint
# ou
yarn lint
```

O aplicativo estará disponível em `http://localhost:5173` (ou a porta indicada no terminal).

## 🧪 Testes

O projeto possui testes unitários e de integração implementados com Jest e React Testing Library. Para executar os testes:

```bash
# Executar todos os testes
npm run test

# Executar testes com watch mode
npm run test:watch

# Verificar cobertura de testes
npm run test:coverage
```

Para mais detalhes sobre como executar e criar testes, consulte a [documentação de testes](docs/TESTES.md).

## 🤝 Contribuindo

Este projeto segue padrões rigorosos de qualidade e organização. Antes de contribuir, consulte:

- **[Guia de Contribuição](CONTRIBUTING.md)** - Padrões de código, commits semânticos e fluxo de trabalho
- **[Estratégia de Commits](COMMIT_STRATEGY.md)** - Como organizar commits de forma profissional

### 📝 Commits Semânticos

O projeto utiliza **Conventional Commits** para manter um histórico limpo:

```bash
# Exemplos de commits
feat(components): adiciona novo componente de filtro
fix(api): corrige timeout em requisições
test(hooks): adiciona testes para useFilter
docs: atualiza documentação da API
```

### 🔧 Template de Commit

O projeto já está configurado com template de commit:

```bash
git commit  # Abrirá editor com template pré-configurado
```

## 📝 Observações Técnicas

- A aplicação utiliza uma API simulada (mock) para o desenvolvimento. Para informações detalhadas sobre os endpoints disponíveis, consulte a [documentação da API](docs/API.md).
- A arquitetura de componentes segue o padrão Atomic Design, detalhado em nossa [documentação de arquitetura](docs/ARQUITETURA.md).
- Implementação de estratégias de performance como code splitting e lazy loading
- Sistema de tipografia consistente
- Sistema de tema com suporte a múltiplos estilos
- Tratamento de erros com ErrorBoundary
- Hooks personalizados para lógica de negócio reutilizável

## 📚 Documentação Adicional

- [Documentação da API](docs/API.md) - Descrição completa dos endpoints da API simulada
- [Arquitetura do Sistema](docs/ARQUITETURA.md) - Detalhes sobre as decisões arquiteturais e padrões utilizados
- [Testes](docs/TESTES.md) - Guia completo sobre como executar e criar testes no projeto
- [Guia de Contribuição](CONTRIBUTING.md) - Padrões de desenvolvimento e commits semânticos
- [Estratégia de Commits](COMMIT_STRATEGY.md) - Organização e estrutura de commits

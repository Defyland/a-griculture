# Testes no Projeto Brain Agriculture

Este documento explica como executar e manter os testes do projeto Brain Agriculture.

## Executando os Testes

Para executar todos os testes do projeto, utilize o seguinte comando:

```bash
npm test
```

Para executar os testes em modo de observação (watch mode), que reinicia automaticamente quando os arquivos são alterados:

```bash
npm run test:watch
```

Para gerar relatórios de cobertura de testes:

```bash
npm run test:coverage
```

## Estrutura dos Testes

Os testes estão organizados na pasta `src/__tests__/`, seguindo uma estrutura similar à do código fonte:

- `components/atoms/`: Testes para componentes atômicos
- `components/molecules/`: Testes para componentes moleculares
- `utils/`: Testes para utilitários
- `hooks/`: Testes para hooks customizados

## Tipos de Testes

O projeto utiliza principalmente testes unitários para:

1. **Componentes**: Verificam renderização, interações e comportamentos
2. **Utilitários**: Testam funções auxiliares como validação de documentos
3. **Hooks**: Testam o comportamento de hooks customizados

## Ferramentas de Teste

- **Jest**: Executor de testes (test runner)
- **Testing Library**: Para testes de componentes React
- **Mock Service Worker**: Para simular respostas de API

## Resolução de Problemas

### Execução de Testes em ESM (ECMAScript Modules)

Como o projeto utiliza ESM, os testes precisam ser executados com configurações específicas. Isso já está configurado no script de teste no `package.json`.

### Importação de Jest em Arquivos de Teste

Para usar funções como `jest.fn()` em arquivos de teste, importe o jest do pacote `@jest/globals`:

```typescript
import { jest } from '@jest/globals';
```

### Verificação de Estilos

Para testar estilos em componentes que usam styled-components, use a função auxiliar `toHaveStyle`:

```typescript
expect(component).toHaveStyle('color: red');
```

## Ajuda Adicional

Para mais informações sobre como escrever testes, consulte:

- [Documentação do Jest](https://jestjs.io/docs/getting-started)
- [Documentação do Testing Library](https://testing-library.com/docs/) 
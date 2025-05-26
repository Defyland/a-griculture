# Estratégia de Commits Semânticos

## 📋 Plano de Commits Organizados

### 1. **build: configuração inicial do projeto**
```bash
# Arquivos de configuração e dependências
- package.json
- package-lock.json
- babel.config.cjs
- jest.config.mjs (delete jest.config.js)
- tsconfig.test.json
```

### 2. **docs: documentação do projeto**
```bash
# Documentação principal e técnica
- README.md
- docs/API.md
- docs/ARQUITETURA.md
- docs/TESTES.md
- src/docs/AtomicDesignReference.md
- src/components/README.md
```

### 3. **feat(types): sistema de tipagem TypeScript**
```bash
# Definições de tipos
- src/types/index.ts
- src/types/common.ts
- src/types/cultura.ts
- src/types/dashboard.ts
- src/types/form.ts
- src/types/forms.ts
- src/types/produtor.ts
- src/types/propriedade.ts
- src/types/safra.ts
```

### 4. **feat(styles): sistema de design e temas**
```bash
# Estilos globais e tema
- src/styles/GlobalStyles.ts
- src/styles/theme.ts
- src/styles/animations.ts
- src/styles/shared/index.ts
```

### 5. **feat(utils): utilitários e helpers**
```bash
# Funções utilitárias
- src/utils/documentoUtils.ts
- src/utils/sanitization.ts
- src/utils/statusUtils.ts
```

### 6. **feat(services): serviços e APIs**
```bash
# Serviços de API e logging
- src/services/api.ts
- src/services/logger.ts
- src/mocks/data.ts
```

### 7. **feat(store): gerenciamento de estado Redux**
```bash
# Redux store e slices
- src/store/index.ts
- src/store/slices/culturasSlice.ts
- src/store/slices/dashboardSlice.ts
- src/store/slices/produtoresSlice.ts
- src/store/slices/safrasSlice.ts
```

### 8. **feat(hooks): hooks customizados**
```bash
# Hooks reutilizáveis
- src/hooks/index.ts
- src/hooks/useApiState.ts
- src/hooks/useDebounce.ts
- src/hooks/useFilter.ts
- src/hooks/useFocusTrap.ts
- src/hooks/useFormSubmit.ts
- src/hooks/usePagination.ts
- src/hooks/usePropriedades.ts
- src/hooks/useSafras.ts
- src/hooks/useSorting.ts
```

### 9. **feat(components): componentes atômicos**
```bash
# Atoms - componentes básicos
- src/components/atoms/
- src/components/index.ts
```

### 10. **feat(components): componentes moleculares**
```bash
# Molecules - composições de atoms
- src/components/molecules/
```

### 11. **feat(components): templates e layouts**
```bash
# Templates e layouts
- src/components/templates/
- src/components/ErrorBoundary.tsx
```

### 12. **feat(pages): páginas da aplicação**
```bash
# Todas as páginas e suas tipagens/estilos
- src/pages/
```

### 13. **feat(routing): sistema de rotas**
```bash
# Configuração de rotas
- src/routes/index.tsx
- src/App.tsx (modificado)
```

### 14. **test: configuração e suíte de testes**
```bash
# Configuração de testes
- src/setupTests.ts
- src/__mocks__/
```

### 15. **test(components): testes de componentes**
```bash
# Testes dos componentes
- src/__tests__/components/
```

### 16. **test(hooks): testes de hooks**
```bash
# Testes dos hooks
- src/__tests__/hooks/
```

### 17. **test(pages): testes de páginas**
```bash
# Testes das páginas
- src/__tests__/pages/
```

### 18. **test(services): testes de serviços**
```bash
# Testes dos serviços
- src/__tests__/services/
- src/__tests__/utils/
- src/__tests__/store/
```

## 🚀 Comandos para Executar

Execute os commits nesta ordem para manter um histórico limpo e organizado:

```bash
# 1. Configuração inicial
git add package.json package-lock.json babel.config.cjs jest.config.mjs tsconfig.test.json
git rm jest.config.js
git commit -m "build: configuração inicial do projeto

- Atualiza dependências do package.json
- Configura Babel para testes
- Migra Jest config para ESM (.mjs)
- Adiciona configuração TypeScript para testes"

# 2. Documentação
git add README.md docs/ src/docs/ src/components/README.md
git commit -m "docs: documentação completa do projeto

- README principal com instruções de uso
- Documentação da API simulada
- Guia de arquitetura e padrões
- Documentação de testes
- Referência do Atomic Design"

# Continue com os próximos commits...
```

## 📝 Dicas Importantes

1. **Sempre revisar** os arquivos antes de cada commit
2. **Testar** se o projeto ainda funciona após cada commit
3. **Manter commits pequenos** e focados em uma responsabilidade
4. **Usar mensagens descritivas** que expliquem o "porquê" da mudança
5. **Seguir a ordem** sugerida para manter dependências corretas 
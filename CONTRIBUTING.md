# 🤝 Guia de Contribuição

## 📝 Padrão de Commits Semânticos

Este projeto segue o padrão **Conventional Commits** para manter um histórico limpo e organizado.

### 🏷️ Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(auth): adiciona login com Google` |
| `fix` | Correção de bug | `fix(api): corrige erro de timeout` |
| `docs` | Documentação | `docs: atualiza README com novas instruções` |
| `style` | Formatação, espaços | `style: corrige indentação` |
| `refactor` | Refatoração de código | `refactor(utils): melhora performance da validação` |
| `perf` | Melhoria de performance | `perf(components): otimiza re-renderizações` |
| `test` | Testes | `test(hooks): adiciona testes para useFilter` |
| `build` | Sistema de build | `build: atualiza dependências` |
| `ci` | Integração contínua | `ci: adiciona workflow do GitHub Actions` |
| `chore` | Tarefas de manutenção | `chore: remove arquivos não utilizados` |
| `revert` | Reverter commit | `revert: desfaz mudanças do commit abc123` |

### 🎯 Formato da Mensagem

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### ✅ Boas Práticas

1. **Use o imperativo**: "adiciona" ao invés de "adicionado"
2. **Seja conciso**: máximo 50 caracteres no título
3. **Use escopos**: `feat(components)`, `fix(api)`, `test(utils)`
4. **Explique o porquê**: use o corpo para contexto adicional
5. **Referencie issues**: `Closes #123` no rodapé

### 🚫 Evite

- Commits muito grandes (use `git add -p` para commits parciais)
- Mensagens vagas como "fix bug" ou "update code"
- Misturar diferentes tipos de mudanças em um commit
- Commits com código que não funciona

### 🔧 Configuração Local

O projeto já está configurado com:

```bash
# Template de commit (já configurado)
git config commit.template .gitmessage

# Para usar o template
git commit  # Abrirá o editor com o template
```

### 📋 Checklist Antes do Commit

- [ ] Código compila sem erros
- [ ] Testes passam (`npm test`)
- [ ] Linting está ok (`npm run lint`)
- [ ] Mensagem de commit segue o padrão
- [ ] Mudanças são atômicas (uma responsabilidade por commit)

### 🏗️ Fluxo de Trabalho Sugerido

```bash
# 1. Criar branch para feature
git checkout -b feat/nova-funcionalidade

# 2. Fazer mudanças pequenas e commits frequentes
git add src/components/NovoComponente.tsx
git commit -m "feat(components): adiciona componente NovoComponente"

# 3. Adicionar testes
git add src/__tests__/components/NovoComponente.test.tsx
git commit -m "test(components): adiciona testes para NovoComponente"

# 4. Atualizar documentação se necessário
git add README.md
git commit -m "docs: documenta uso do NovoComponente"

# 5. Merge para main
git checkout main
git merge feat/nova-funcionalidade
```

### 🎨 Exemplos de Commits Bem Estruturados

```bash
# Feature simples
feat(dashboard): adiciona gráfico de vendas mensais

# Bug fix com contexto
fix(auth): corrige expiração de token JWT

O token não estava sendo renovado automaticamente,
causando logout inesperado após 1 hora.

Closes #456

# Breaking change
feat!: migra para React 19

BREAKING CHANGE: Remove suporte para React 18.
Atualize suas dependências antes de fazer upgrade.

# Refatoração
refactor(hooks): extrai lógica de paginação para hook reutilizável

Move a lógica de paginação que estava duplicada em várias
páginas para um hook customizado usePagination.
```

### 🔍 Verificando Commits

```bash
# Ver histórico limpo
git log --oneline

# Ver commits com detalhes
git log --pretty=format:"%h %s" --graph

# Verificar se segue padrão
npx commitlint --from=HEAD~1
```

### 📚 Recursos Adicionais

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Best Practices](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project) 
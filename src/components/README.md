# Sistema de Tipografia da Aplicação

Este documento descreve como usar o componente `Typography` para manter consistência tipográfica em toda a aplicação.

## Uso Recomendado

### 1. Texto simples
Para texto simples, use o componente Typography diretamente:

```jsx
<Typography variant="body1">Texto simples</Typography>
<Typography variant="h3" color="primary">Título</Typography>
<Typography variant="caption" color="secondary">Legenda</Typography>
```

### 2. Elementos de texto estilizados
Para elementos de texto com estilos customizados, use `styled(Typography)`:

```jsx
const StyledCaption = styled(Typography).attrs({
  variant: 'caption',
  weight: 'medium',
})`
  margin-right: ${({ theme }) => theme.spacing.sm};
  padding: 4px 8px;
  border-radius: 100px;
`;
```

### 3. Elementos interativos
Para elementos que precisam de interatividade (onClick, etc.), você tem duas opções:

**Opção 1:** Usar Typography dentro de um wrapper interativo:
```jsx
const InteractiveWrapper = styled.span`
  cursor: pointer;
`;

<InteractiveWrapper onClick={handleClick}>
  <Typography variant="body2">Clique aqui</Typography>
</InteractiveWrapper>
```

**Opção 2:** Para componentes muito específicos, pode ser necessário manter o elemento HTML básico:
```jsx
const InteractiveText = styled.span`
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

<InteractiveText onClick={handleClick}>Clique aqui</InteractiveText>
```

## Variantes Disponíveis

- `h1` a `h6`: Títulos
- `body1`: Texto padrão
- `body2`: Texto secundário (geralmente menor)
- `caption`: Texto pequeno para legendas
- `subtitle`: Subtítulos

## Cores Disponíveis

- `primary`: Cor primária da aplicação
- `secondary`: Cor secundária da aplicação 
- `text`: Cor padrão de texto
- `lightText`: Texto mais claro
- `danger`: Vermelho (para erros)
- `success`: Verde (para sucesso)
- `warning`: Amarelo (para alertas)

## Pesos Disponíveis

- `normal` (400)
- `medium` (500)
- `bold` (700) 
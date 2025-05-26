# Documentação da API

O sistema Brain Agriculture utiliza uma API simulada (mock) para desenvolvimento. Esta documentação descreve os endpoints disponíveis e como utilizá-los.

## Produtores

### Listar todos os produtores
```
GET /api/produtores
```

**Resposta:**
```json
[
  {
    "id": "string",
    "documentoCpfCnpj": "string",
    "tipoDocumento": "CPF" | "CNPJ",
    "nome": "string",
    "propriedades": [...]
  }
]
```

### Buscar produtor por ID
```
GET /api/produtores/:id
```

**Resposta:**
```json
{
  "id": "string",
  "documentoCpfCnpj": "string",
  "tipoDocumento": "CPF" | "CNPJ",
  "nome": "string",
  "propriedades": [...]
}
```

### Criar produtor
```
POST /api/produtores
```

**Corpo da Requisição:**
```json
{
  "documentoCpfCnpj": "string",
  "tipoDocumento": "CPF" | "CNPJ",
  "nome": "string"
}
```

**Resposta:**
```json
{
  "id": "string",
  "documentoCpfCnpj": "string",
  "tipoDocumento": "CPF" | "CNPJ",
  "nome": "string",
  "propriedades": []
}
```

### Atualizar produtor
```
PUT /api/produtores/:id
```

**Corpo da Requisição:**
```json
{
  "id": "string",
  "documentoCpfCnpj": "string",
  "tipoDocumento": "CPF" | "CNPJ",
  "nome": "string",
  "propriedades": [...]
}
```

**Resposta:**
```json
{
  "id": "string",
  "documentoCpfCnpj": "string",
  "tipoDocumento": "CPF" | "CNPJ",
  "nome": "string",
  "propriedades": [...]
}
```

### Excluir produtor
```
DELETE /api/produtores/:id
```

## Propriedades

### Listar todas as propriedades
```
GET /api/propriedades
```

**Resposta:**
```json
[
  {
    "id": "string",
    "nome": "string",
    "cidade": "string",
    "estado": "string",
    "areaTotal": "number",
    "areaAgricultavel": "number",
    "areaVegetacao": "number",
    "produtorId": "string",
    "safras": [...]
  }
]
```

### Buscar propriedade por ID
```
GET /api/propriedades/:id
```

**Resposta:**
```json
{
  "id": "string",
  "nome": "string",
  "cidade": "string",
  "estado": "string",
  "areaTotal": "number",
  "areaAgricultavel": "number",
  "areaVegetacao": "number",
  "produtorId": "string",
  "safras": [...]
}
```

### Buscar propriedades por produtor
```
GET /api/produtores/:produtorId/propriedades
```

**Resposta:**
```json
[
  {
    "id": "string",
    "nome": "string",
    "cidade": "string",
    "estado": "string",
    "areaTotal": "number",
    "areaAgricultavel": "number",
    "areaVegetacao": "number",
    "produtorId": "string",
    "safras": [...]
  }
]
```

### Criar propriedade
```
POST /api/produtores/:produtorId/propriedades
```

**Corpo da Requisição:**
```json
{
  "nome": "string",
  "cidade": "string",
  "estado": "string",
  "areaTotal": "number",
  "areaAgricultavel": "number",
  "areaVegetacao": "number"
}
```

**Resposta:**
```json
{
  "id": "string",
  "nome": "string",
  "cidade": "string",
  "estado": "string",
  "areaTotal": "number",
  "areaAgricultavel": "number",
  "areaVegetacao": "number",
  "produtorId": "string",
  "safras": []
}
```

### Atualizar propriedade
```
PUT /api/propriedades/:id
```

**Corpo da Requisição:**
```json
{
  "id": "string",
  "nome": "string",
  "cidade": "string",
  "estado": "string",
  "areaTotal": "number",
  "areaAgricultavel": "number",
  "areaVegetacao": "number",
  "produtorId": "string",
  "safras": [...]
}
```

**Resposta:**
```json
{
  "id": "string",
  "nome": "string",
  "cidade": "string",
  "estado": "string",
  "areaTotal": "number",
  "areaAgricultavel": "number",
  "areaVegetacao": "number",
  "produtorId": "string",
  "safras": [...]
}
```

## Safras

### Listar safras por propriedade
```
GET /api/propriedades/:propriedadeId/safras
```

**Resposta:**
```json
[
  {
    "id": "string",
    "nome": "string",
    "ano": "number",
    "propriedadeId": "string",
    "culturas": [...],
    "status": "ativa" | "concluida" | "planejada",
    "areaHectares": "number"
  }
]
```

### Buscar safra por ID
```
GET /api/safras/:id
```

**Resposta:**
```json
{
  "id": "string",
  "nome": "string",
  "ano": "number",
  "propriedadeId": "string",
  "culturas": [...],
  "status": "ativa" | "concluida" | "planejada",
  "areaHectares": "number"
}
```

### Criar safra
```
POST /api/propriedades/:propriedadeId/safras
```

**Corpo da Requisição:**
```json
{
  "nome": "string",
  "ano": "number",
  "status": "ativa" | "concluida" | "planejada",
  "areaHectares": "number"
}
```

**Resposta:**
```json
{
  "id": "string",
  "nome": "string",
  "ano": "number",
  "propriedadeId": "string",
  "culturas": [],
  "status": "ativa" | "concluida" | "planejada",
  "areaHectares": "number"
}
```

## Culturas

### Adicionar cultura à safra
```
POST /api/safras/:safraId/culturas
```

**Corpo da Requisição:**
```json
{
  "nome": "string"
}
```

**Resposta:**
```json
{
  "id": "string",
  "nome": "string",
  "safraId": "string"
}
```

## Dashboard

### Obter dados do dashboard
```
GET /api/dashboard
```

**Resposta:**
```json
{
  "totalFazendas": "number",
  "totalArea": "number",
  "distribuicaoPorEstado": [
    {
      "estado": "string",
      "quantidade": "number",
      "percentual": "number"
    }
  ],
  "distribuicaoPorCultura": [
    {
      "cultura": "string", 
      "quantidade": "number",
      "percentual": "number"
    }
  ],
  "usoDoSolo": {
    "areaAgricultavel": "number",
    "areaVegetacao": "number",
    "percentualAgricultavel": "number",
    "percentualVegetacao": "number"
  }
}
```

## Validações Implementadas

- O CPF/CNPJ é validado quanto ao formato e dígitos verificadores
- A soma das áreas agricultável e de vegetação não pode ultrapassar a área total
- Todas as áreas devem ser números positivos
- Nomes não podem estar vazios
- Culturas não podem ter nomes duplicados em uma mesma safra 
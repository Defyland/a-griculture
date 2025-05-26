import type { Produtor, Propriedade, Safra, Cultura } from '../types';

// Culturas
const culturas: Cultura[] = [
  { id: '1', nome: 'Soja', safraId: '1' },
  { id: '2', nome: 'Milho', safraId: '1' },
  { id: '3', nome: 'Café', safraId: '2' },
  { id: '4', nome: 'Algodão', safraId: '3' },
  { id: '5', nome: 'Cana-de-açúcar', safraId: '3' },
  { id: '6', nome: 'Feijão', safraId: '4' },
  { id: '7', nome: 'Trigo', safraId: '4' },
];

// Safras
const safras: Safra[] = [
  { id: '1', nome: 'Safra 2021', ano: 2021, propriedadeId: '1', culturas: [culturas[0], culturas[1]] },
  { id: '2', nome: 'Safra 2022', ano: 2022, propriedadeId: '1', culturas: [culturas[2]] },
  { id: '3', nome: 'Safra 2021', ano: 2021, propriedadeId: '2', culturas: [culturas[3], culturas[4]] },
  { id: '4', nome: 'Safra 2022', ano: 2022, propriedadeId: '3', culturas: [culturas[5], culturas[6]] },
];

// Propriedades
const propriedades: Propriedade[] = [
  {
    id: '1',
    nome: 'Fazenda Boa Esperança',
    cidade: 'Uberlândia',
    estado: 'MG',
    areaTotal: 1200,
    areaAgricultavel: 800,
    areaVegetacao: 400,
    produtorId: '1',
    safras: [safras[0], safras[1]],
  },
  {
    id: '2',
    nome: 'Sítio São José',
    cidade: 'Ribeirão Preto',
    estado: 'SP',
    areaTotal: 500,
    areaAgricultavel: 350,
    areaVegetacao: 150,
    produtorId: '1',
    safras: [safras[2]],
  },
  {
    id: '3',
    nome: 'Rancho Verde',
    cidade: 'Goiânia',
    estado: 'GO',
    areaTotal: 3000,
    areaAgricultavel: 2200,
    areaVegetacao: 800,
    produtorId: '2',
    safras: [safras[3]],
  },
];

// Produtores
export const produtores: Produtor[] = [
  {
    id: '1',
    documentoCpfCnpj: '529.982.247-25',
    tipoDocumento: 'CPF',
    nome: 'João da Silva',
    propriedades: [propriedades[0], propriedades[1]],
  },
  {
    id: '2',
    documentoCpfCnpj: '89.969.980/0001-49',
    tipoDocumento: 'CNPJ',
    nome: 'Agropecuária Brasil LTDA',
    propriedades: [propriedades[2]],
  },
  {
    id: '3',
    documentoCpfCnpj: '371.302.110-47',
    tipoDocumento: 'CPF',
    nome: 'Maria Joaquina',
    propriedades: [],
  },
];

// Função para calcular os dados do dashboard
export const getDashboardData = () => {
  const totalFazendas = propriedades.length;
  const totalAreaHectares = propriedades.reduce((total, p) => total + p.areaTotal, 0);

  // Distribuição por estado
  const estadosMap = new Map();
  propriedades.forEach(p => {
    const estadoAtual = estadosMap.get(p.estado) || 0;
    estadosMap.set(p.estado, estadoAtual + 1);
  });
  const distribuicaoPorEstado = Array.from(estadosMap.entries()).map(([estado, quantidade]) => ({
    estado,
    quantidade,
  }));

  // Distribuição por cultura
  const culturasMap = new Map();
  culturas.forEach(c => {
    const culturaAtual = culturasMap.get(c.nome) || 0;
    culturasMap.set(c.nome, culturaAtual + 1);
  });
  const distribuicaoPorCultura = Array.from(culturasMap.entries()).map(([cultura, quantidade]) => ({
    cultura,
    quantidade,
  }));

  // Distribuição por uso do solo
  const totalAgricultavel = propriedades.reduce((total, p) => total + p.areaAgricultavel, 0);
  const totalVegetacao = propriedades.reduce((total, p) => total + p.areaVegetacao, 0);
  const distribuicaoUsoSolo = [
    { tipo: 'Agricultável', area: totalAgricultavel },
    { tipo: 'Vegetação', area: totalVegetacao },
  ];

  return {
    totalFazendas,
    totalAreaHectares,
    distribuicaoPorEstado,
    distribuicaoPorCultura,
    distribuicaoUsoSolo,
  };
}; 
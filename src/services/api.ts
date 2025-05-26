import { v4 as uuidv4 } from 'uuid';
import { produtores, getDashboardData, debugDados } from '../mocks/data';
import type { Produtor, Propriedade, Safra, Cultura } from '../types';

// Simulação de delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para criar cópia profunda
const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// API para Produtores
export const produtoresAPI = {
  // Listar todos os produtores
  getAll: async (): Promise<Produtor[]> => {
    await delay(500);
    return deepClone(produtores);
  },

  // Buscar um produtor por ID
  getById: async (id: string): Promise<Produtor | undefined> => {
    await delay(300);
    const produtor = produtores.find(p => p.id === id);
    return produtor ? deepClone(produtor) : undefined;
  },

  // Criar um novo produtor
  create: async (produtor: Omit<Produtor, 'id'>): Promise<Produtor> => {
    await delay(800);
    const novoProdutorId = uuidv4();
    const novoProdutorCompleto = {
      ...produtor,
      id: novoProdutorId,
      propriedades: [],
    };
    
    produtores.push(novoProdutorCompleto);
    return deepClone(novoProdutorCompleto);
  },

  // Atualizar um produtor existente
  update: async (produtor: Produtor): Promise<Produtor> => {
    await delay(800);
    const index = produtores.findIndex(p => p.id === produtor.id);
    if (index !== -1) {
      produtores[index] = deepClone(produtor);
      return deepClone(produtores[index]);
    }
    throw new Error('Produtor não encontrado');
  },

  // Excluir um produtor
  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = produtores.findIndex(p => p.id === id);
    if (index !== -1) {
      produtores.splice(index, 1);
      return;
    }
    throw new Error('Produtor não encontrado');
  },
};

// API para Propriedades
export const propriedadesAPI = {
  // Listar todas as propriedades
  getAll: async (): Promise<Propriedade[]> => {
    console.log('API: Buscando todas as propriedades');
    await delay(500);
    const todasProps = produtores.flatMap(p => p.propriedades);
    console.log(`API: Encontradas ${todasProps.length} propriedades`);
    return deepClone(todasProps);
  },

  // Buscar propriedade por ID
  getById: async (id: string): Promise<Propriedade | undefined> => {
    console.log(`API: Buscando propriedade com ID ${id}`);
    await delay(300);
    const propriedade = produtores
      .flatMap(p => p.propriedades)
      .find(prop => prop.id === id);
    
    if (propriedade) {
      console.log(`API: Propriedade ${id} encontrada`);
      return deepClone(propriedade);
    } else {
      console.log(`API: Propriedade ${id} não encontrada`);
      return undefined;
    }
  },

  // Buscar propriedades por produtor
  getByProdutor: async (produtorId: string): Promise<Propriedade[]> => {
    console.log(`API: Buscando propriedades do produtor ${produtorId}`);
    await delay(300);
    const produtor = produtores.find(p => p.id === produtorId);
    if (!produtor) {
      console.log(`API: Produtor ${produtorId} não encontrado`);
      return [];
    }
    console.log(`API: Encontradas ${produtor.propriedades.length} propriedades para o produtor ${produtorId}`);
    return deepClone(produtor.propriedades);
  },

  // Adicionar propriedade a um produtor
  create: async (propriedade: Omit<Propriedade, 'id' | 'safras'>, produtorId: string): Promise<Propriedade> => {
    console.log(`API: Criando propriedade para produtor ${produtorId}`, propriedade);
    await delay(800);
    
    try {
      const produtorIndex = produtores.findIndex(p => p.id === produtorId);
      if (produtorIndex === -1) {
        console.error(`API: Produtor ${produtorId} não encontrado para criar propriedade`);
        throw new Error('Produtor não encontrado');
      }

      const novaPropriedadeId = uuidv4();
      const novaPropriedadeCompleta = {
        ...propriedade,
        id: novaPropriedadeId,
        produtorId,
        safras: [],
      };

      console.log('API: Nova propriedade completa:', novaPropriedadeCompleta);
      
      // Criar uma nova cópia do produtor com a nova propriedade
      const produtorAtualizado = deepClone(produtores[produtorIndex]);
      produtorAtualizado.propriedades.push(novaPropriedadeCompleta);
      produtores[produtorIndex] = produtorAtualizado;
      
      console.log(`API: Propriedade criada com sucesso, ID: ${novaPropriedadeId}`);
      return deepClone(novaPropriedadeCompleta);
    } catch (error) {
      console.error('API: Erro ao criar propriedade:', error);
      throw error;
    }
  },

  // Atualizar uma propriedade
  update: async (propriedade: Propriedade): Promise<Propriedade> => {
    console.log(`API: Atualizando propriedade ${propriedade.id}`, propriedade);
    await delay(800);
    
    try {
      // Encontrar o produtor que contém esta propriedade
      let produtorIndex = -1;
      let propriedadeIndex = -1;
      
      for (let i = 0; i < produtores.length; i++) {
        const propIndex = produtores[i].propriedades.findIndex(p => p.id === propriedade.id);
        if (propIndex !== -1) {
          produtorIndex = i;
          propriedadeIndex = propIndex;
          break;
        }
      }
      
      if (produtorIndex === -1 || propriedadeIndex === -1) {
        console.error(`API: Propriedade ${propriedade.id} não encontrada para atualização`);
        throw new Error('Propriedade não encontrada');
      }
      
      // Criar uma nova cópia do produtor com a propriedade atualizada
      const produtorAtualizado = deepClone(produtores[produtorIndex]);
      produtorAtualizado.propriedades[propriedadeIndex] = deepClone(propriedade);
      produtores[produtorIndex] = produtorAtualizado;
      
      console.log(`API: Propriedade ${propriedade.id} atualizada com sucesso`);
      return deepClone(propriedade);
    } catch (error) {
      console.error('API: Erro ao atualizar propriedade:', error);
      throw error;
    }
  },

  // Excluir uma propriedade
  delete: async (id: string, produtorId: string): Promise<void> => {
    await delay(600);
    
    const produtorIndex = produtores.findIndex(p => p.id === produtorId);
    if (produtorIndex === -1) {
      throw new Error('Produtor não encontrado');
    }

    const propriedadeIndex = produtores[produtorIndex].propriedades.findIndex(prop => prop.id === id);
    if (propriedadeIndex !== -1) {
      // Criar uma nova cópia do produtor sem a propriedade excluída
      const produtorAtualizado = deepClone(produtores[produtorIndex]);
      produtorAtualizado.propriedades.splice(propriedadeIndex, 1);
      produtores[produtorIndex] = produtorAtualizado;
      return;
    }
    throw new Error('Propriedade não encontrada');
  },
};

// API para Safras
export const safrasAPI = {
  // Buscar todas as safras
  getAll: async (): Promise<Safra[]> => {
    console.log('API: Buscando todas as safras');
    await delay(500);
    
    try {
      const todasSafras = produtores
        .flatMap(p => p.propriedades)
        .flatMap(prop => prop.safras);
      
      console.log(`API: Encontradas ${todasSafras.length} safras no total`);
      // Retornar cópia para que o React detecte mudanças
      return JSON.parse(JSON.stringify(todasSafras));
    } catch (error) {
      console.error('API: Erro ao buscar todas as safras:', error);
      return [];
    }
  },
  
  // Buscar safras por propriedade
  getByPropriedade: async (propriedadeId: string): Promise<Safra[]> => {
    console.log(`API: Buscando safras da propriedade ${propriedadeId}`);
    await delay(300);
    
    try {
      const propriedade = produtores
        .flatMap(p => p.propriedades)
        .find(prop => prop.id === propriedadeId);
      
      if (!propriedade) {
        console.log(`API: Propriedade ${propriedadeId} não encontrada`);
        return [];
      }
      
      console.log(`API: Encontradas ${propriedade.safras.length} safras para a propriedade ${propriedadeId}`);
      // Retornar cópia para que o React detecte mudanças
      return JSON.parse(JSON.stringify(propriedade.safras));
    } catch (error) {
      console.error('API: Erro ao buscar safras:', error);
      return [];
    }
  },

  // Buscar safra por ID
  getById: async (id: string): Promise<Safra | undefined> => {
    console.log(`API: Buscando safra com ID ${id}`);
    await delay(300);
    
    try {
      const safra = produtores
        .flatMap(p => p.propriedades)
        .flatMap(prop => prop.safras)
        .find(s => s.id === id);
      
      if (safra) {
        console.log(`API: Safra ${id} encontrada`);
      } else {
        console.log(`API: Safra ${id} não encontrada`);
      }
      
      return safra;
    } catch (error) {
      console.error('API: Erro ao buscar safra:', error);
      return undefined;
    }
  },

  // Adicionar safra a uma propriedade
  create: async (safra: Omit<Safra, 'id' | 'culturas'>, propriedadeId: string): Promise<Safra> => {
    console.log(`API: Criando safra para propriedade ${propriedadeId}`, safra);
    await delay(800);
    
    try {
      // Encontrar o produtor que contém a propriedade
      let produtorEncontrado = null;
      let propriedadeEncontrada = null;
      
      for (const produtor of produtores) {
        const propriedade = produtor.propriedades.find(prop => prop.id === propriedadeId);
        if (propriedade) {
          produtorEncontrado = produtor;
          propriedadeEncontrada = propriedade;
          break;
        }
      }

      if (!produtorEncontrado || !propriedadeEncontrada) {
        console.error(`API: Propriedade ${propriedadeId} não encontrada para criar safra`);
        throw new Error('Propriedade não encontrada');
      }

      const novaSafraId = uuidv4();
      const novaSafraCompleta = {
        ...safra,
        id: novaSafraId,
        propriedadeId,
        culturas: [],
      };

      console.log('API: Nova safra completa:', novaSafraCompleta);
      
      // Criar uma nova cópia do array de safras
      propriedadeEncontrada.safras = [...propriedadeEncontrada.safras, novaSafraCompleta];
      
      console.log(`API: Safra criada com sucesso, ID: ${novaSafraId}`);
      return novaSafraCompleta;
    } catch (error) {
      console.error('API: Erro ao criar safra:', error);
      throw error;
    }
  },

  // Atualizar safra
  update: async (safra: Safra): Promise<Safra> => {
    console.log(`API: Atualizando safra ${safra.id}`, safra);
    await delay(800);
    
    try {
      // Encontrar o produtor que contém a propriedade
      let propriedadeEncontrada = null;
      
      for (const produtor of produtores) {
        const propriedade = produtor.propriedades.find(prop => prop.id === safra.propriedadeId);
        if (propriedade) {
          propriedadeEncontrada = propriedade;
          break;
        }
      }

      if (!propriedadeEncontrada) {
        console.error(`API: Propriedade ${safra.propriedadeId} não encontrada para atualizar safra`);
        throw new Error('Propriedade não encontrada');
      }

      const index = propriedadeEncontrada.safras.findIndex(s => s.id === safra.id);
      if (index === -1) {
        console.error(`API: Safra ${safra.id} não encontrada para atualização`);
        throw new Error('Safra não encontrada');
      }
      
      // Preservar culturas se não fornecidas
      const culturasOriginais = [...propriedadeEncontrada.safras[index].culturas];
      if (!safra.culturas || safra.culturas.length === 0) {
        safra.culturas = culturasOriginais;
      }
      
      // Criar uma cópia da safra atualizada
      const safraAtualizada = { ...safra };
      
      // Criar uma nova cópia do array de safras com a safra atualizada
      propriedadeEncontrada.safras = propriedadeEncontrada.safras.map((s, i) => 
        i === index ? safraAtualizada : s
      );
      
      console.log(`API: Safra ${safra.id} atualizada com sucesso`);
      return { ...safraAtualizada };
    } catch (error) {
      console.error('API: Erro ao atualizar safra:', error);
      throw error;
    }
  },

  // Excluir safra
  delete: async (id: string, propriedadeId: string): Promise<void> => {
    await delay(600);
    
    console.log(`API: Tentando excluir safra ${id} da propriedade ${propriedadeId}`);
    debugDados(); // Debug antes da exclusão
    
    // Encontrar o produtor que contém a propriedade
    let propriedadeEncontrada = null;
    
    for (const produtor of produtores) {
      const propriedade = produtor.propriedades.find(prop => prop.id === propriedadeId);
      if (propriedade) {
        propriedadeEncontrada = propriedade;
        break;
      }
    }

    if (!propriedadeEncontrada) {
      console.error(`API: Propriedade ${propriedadeId} não encontrada`);
      throw new Error('Propriedade não encontrada');
    }

    console.log(`API: Propriedade encontrada: ${propriedadeEncontrada.nome}`);
    console.log(`API: Safras antes da exclusão:`, propriedadeEncontrada.safras.map(s => ({ id: s.id, nome: s.nome })));

    const index = propriedadeEncontrada.safras.findIndex(s => s.id === id);
    if (index !== -1) {
      // Criar uma nova cópia do array sem a safra excluída
      const safrasAtualizadas = propriedadeEncontrada.safras.filter(s => s.id !== id);
      propriedadeEncontrada.safras = safrasAtualizadas;
      
      console.log(`API: Safra ${id} excluída com sucesso`);
      console.log(`API: Safras após exclusão:`, propriedadeEncontrada.safras.map(s => ({ id: s.id, nome: s.nome })));
      debugDados(); // Debug depois da exclusão
      return;
    }
    
    console.error(`API: Safra ${id} não encontrada na propriedade ${propriedadeId}`);
    throw new Error('Safra não encontrada');
  },
};

// API para Culturas
export const culturasAPI = {
  // Buscar culturas por safra
  getBySafra: async (safraId: string): Promise<Cultura[]> => {
    await delay(300);
    const safra = produtores
      .flatMap(p => p.propriedades)
      .flatMap(prop => prop.safras)
      .find(s => s.id === safraId);
    
    return safra ? [...safra.culturas] : [];
  },

  // Buscar cultura por ID
  getById: async (id: string): Promise<Cultura | undefined> => {
    await delay(300);
    return produtores
      .flatMap(p => p.propriedades)
      .flatMap(prop => prop.safras)
      .flatMap(s => s.culturas)
      .find(c => c.id === id);
  },

  // Adicionar cultura a uma safra
  create: async (cultura: Omit<Cultura, 'id'>, safraId: string): Promise<Cultura> => {
    await delay(800);
    
    // Encontrar a safra
    let safraEncontrada = null;
    
    for (const produtor of produtores) {
      for (const propriedade of produtor.propriedades) {
        const safra = propriedade.safras.find(s => s.id === safraId);
        if (safra) {
          safraEncontrada = safra;
          break;
        }
      }
      if (safraEncontrada) break;
    }

    if (!safraEncontrada) {
      throw new Error('Safra não encontrada');
    }

    const novaCulturaId = uuidv4();
    const novaCulturaCompleta = {
      ...cultura,
      id: novaCulturaId,
      safraId,
    };

    // Criar uma nova cópia do array de culturas
    safraEncontrada.culturas = [...safraEncontrada.culturas, novaCulturaCompleta];
    return novaCulturaCompleta;
  },

  // Atualizar cultura
  update: async (cultura: Cultura): Promise<Cultura> => {
    await delay(800);
    
    // Encontrar a safra
    let safraEncontrada = null;
    
    for (const produtor of produtores) {
      for (const propriedade of produtor.propriedades) {
        const safra = propriedade.safras.find(s => s.id === cultura.safraId);
        if (safra) {
          safraEncontrada = safra;
          break;
        }
      }
      if (safraEncontrada) break;
    }

    if (!safraEncontrada) {
      throw new Error('Safra não encontrada');
    }

    const index = safraEncontrada.culturas.findIndex(c => c.id === cultura.id);
    if (index !== -1) {
      const culturaAtualizada = { ...cultura };
      // Criar uma nova cópia do array de culturas com a cultura atualizada
      safraEncontrada.culturas = safraEncontrada.culturas.map((c, i) => 
        i === index ? culturaAtualizada : c
      );
      return { ...culturaAtualizada };
    }
    throw new Error('Cultura não encontrada');
  },

  // Excluir cultura
  delete: async (id: string, safraId: string): Promise<void> => {
    await delay(600);
    
    // Encontrar a safra
    let safraEncontrada = null;
    
    for (const produtor of produtores) {
      for (const propriedade of produtor.propriedades) {
        const safra = propriedade.safras.find(s => s.id === safraId);
        if (safra) {
          safraEncontrada = safra;
          break;
        }
      }
      if (safraEncontrada) break;
    }

    if (!safraEncontrada) {
      throw new Error('Safra não encontrada');
    }

    const index = safraEncontrada.culturas.findIndex(c => c.id === id);
    if (index !== -1) {
      // Criar uma nova cópia do array sem a cultura excluída
      safraEncontrada.culturas = safraEncontrada.culturas.filter(c => c.id !== id);
      return;
    }
    throw new Error('Cultura não encontrada');
  },
};

// API para o Dashboard
export const dashboardAPI = {
  // Obter dados do dashboard
  getData: async () => {
    await delay(1000);
    return getDashboardData();
  },
};
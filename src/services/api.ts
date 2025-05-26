import { v4 as uuidv4 } from 'uuid';
import { produtores, getDashboardData } from '../mocks/data';
import type { Produtor, Propriedade, Safra, Cultura } from '../types';

// Simulação de delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API para Produtores
export const produtoresAPI = {
  // Listar todos os produtores
  getAll: async (): Promise<Produtor[]> => {
    await delay(500);
    return [...produtores];
  },

  // Buscar um produtor por ID
  getById: async (id: string): Promise<Produtor | undefined> => {
    await delay(300);
    return produtores.find(p => p.id === id);
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
    return novoProdutorCompleto;
  },

  // Atualizar um produtor existente
  update: async (produtor: Produtor): Promise<Produtor> => {
    await delay(800);
    const index = produtores.findIndex(p => p.id === produtor.id);
    if (index !== -1) {
      produtores[index] = { ...produtor };
      return produtores[index];
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
    return todasProps;
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
    } else {
      console.log(`API: Propriedade ${id} não encontrada`);
    }
    
    return propriedade;
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
    return [...produtor.propriedades];
  },

  // Adicionar propriedade a um produtor
  create: async (propriedade: Omit<Propriedade, 'id' | 'safras'>, produtorId: string): Promise<Propriedade> => {
    console.log(`API: Criando propriedade para produtor ${produtorId}`, propriedade);
    await delay(800);
    
    try {
      const produtor = produtores.find(p => p.id === produtorId);
      if (!produtor) {
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
      produtor.propriedades.push(novaPropriedadeCompleta);
      
      // Verificar se a propriedade foi realmente adicionada
      const propAdicionada = produtor.propriedades.find(p => p.id === novaPropriedadeId);
      if (!propAdicionada) {
        console.error('API: Propriedade não foi adicionada corretamente');
        throw new Error('Falha ao adicionar propriedade');
      }
      
      console.log(`API: Propriedade criada com sucesso, ID: ${novaPropriedadeId}`);
      return novaPropriedadeCompleta;
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
      // Se o produtorId não estiver definido, tente encontrar o produtor correto
      if (!propriedade.produtorId) {
        console.log(`API: produtorId não fornecido, buscando produtor para propriedade ${propriedade.id}`);
        
        // Buscar em todos os produtores
        for (const produtor of produtores) {
          const propIndex = produtor.propriedades.findIndex(p => p.id === propriedade.id);
          if (propIndex !== -1) {
            console.log(`API: Encontrado produtor ${produtor.id} para propriedade ${propriedade.id}`);
            propriedade.produtorId = produtor.id;
            break;
          }
        }
        
        if (!propriedade.produtorId) {
          console.error(`API: Não foi possível encontrar um produtor para a propriedade ${propriedade.id}`);
          throw new Error('Propriedade sem produtor associado');
        }
      }
      
      // Encontrar o produtor para esta propriedade
      const produtor = produtores.find(p => p.id === propriedade.produtorId);
      if (!produtor) {
        console.error(`API: Produtor ${propriedade.produtorId} não encontrado para atualizar propriedade`);
        
        // Tentar encontrar o produtor correto
        console.log(`API: Tentando encontrar produtor alternativo para propriedade ${propriedade.id}`);
        let produtorEncontrado = null;
        
        for (const p of produtores) {
          const propIndex = p.propriedades.findIndex(prop => prop.id === propriedade.id);
          if (propIndex !== -1) {
            produtorEncontrado = p;
            console.log(`API: Encontrado produtor alternativo ${p.id}`);
            break;
          }
        }
        
        if (!produtorEncontrado) {
          console.error(`API: Nenhum produtor encontrado para propriedade ${propriedade.id}`);
          throw new Error('Produtor não encontrado e nenhuma alternativa disponível');
        }
        
        // Usar o produtor encontrado
        console.log(`API: Usando produtor alternativo ${produtorEncontrado.id}`);
        const propriedadeProdutorId = produtorEncontrado.id;
        const index = produtorEncontrado.propriedades.findIndex(prop => prop.id === propriedade.id);
        
        if (index === -1) {
          console.error(`API: Propriedade ${propriedade.id} não encontrada no produtor alternativo`);
          throw new Error('Propriedade não encontrada no produtor alternativo');
        }
        
        // Obter uma cópia da propriedade original
        const propriedadeOriginal = { ...produtorEncontrado.propriedades[index] };
        
        // Preservar safras se não fornecidas ou vazias - criar uma cópia profunda do array de safras
        const safrasAtualizadas = propriedade.safras && propriedade.safras.length > 0
          ? propriedade.safras.map(safra => ({ ...safra }))
          : propriedadeOriginal.safras ? propriedadeOriginal.safras.map(safra => ({ ...safra })) : [];
        
        // Criar uma nova propriedade atualizada
        const propriedadeAtualizada = {
          ...propriedade,
          produtorId: propriedadeProdutorId,
          safras: safrasAtualizadas
        };
        
        // Atualizar a propriedade no produtor
        produtorEncontrado.propriedades[index] = propriedadeAtualizada;
        
        console.log(`API: Propriedade ${propriedade.id} atualizada com sucesso usando produtor alternativo`);
        return { ...propriedadeAtualizada };
      }

      // Produtor encontrado, atualizar a propriedade
      const index = produtor.propriedades.findIndex(prop => prop.id === propriedade.id);
      if (index === -1) {
        console.error(`API: Propriedade ${propriedade.id} não encontrada para atualização`);
        throw new Error('Propriedade não encontrada');
      }
      
      // Obter uma cópia da propriedade original
      const propriedadeOriginal = { ...produtor.propriedades[index] };
      
      // Preservar safras se não fornecidas ou vazias - criar uma cópia profunda do array de safras
      const safrasAtualizadas = propriedade.safras && propriedade.safras.length > 0
        ? propriedade.safras.map(safra => ({ ...safra })) 
        : propriedadeOriginal.safras ? propriedadeOriginal.safras.map(safra => ({ ...safra })) : [];
      
      // Criar uma nova propriedade atualizada
      const propriedadeAtualizada = { 
        ...propriedade,
        safras: safrasAtualizadas 
      };
      
      // Atualizar a propriedade no produtor com uma nova referência
      produtor.propriedades[index] = propriedadeAtualizada;
      
      console.log(`API: Propriedade ${propriedade.id} atualizada com sucesso`);
      return { ...propriedadeAtualizada };
    } catch (error) {
      console.error('API: Erro ao atualizar propriedade:', error);
      throw error;
    }
  },

  // Excluir uma propriedade
  delete: async (id: string, produtorId: string): Promise<void> => {
    await delay(600);
    const produtor = produtores.find(p => p.id === produtorId);
    if (!produtor) {
      throw new Error('Produtor não encontrado');
    }

    const index = produtor.propriedades.findIndex(prop => prop.id === id);
    if (index !== -1) {
      produtor.propriedades.splice(index, 1);
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
      return [...todasSafras];
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
      return [...propriedade.safras];
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
      const propriedade = produtores
        .flatMap(p => p.propriedades)
        .find(prop => prop.id === propriedadeId);

      if (!propriedade) {
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
      propriedade.safras.push(novaSafraCompleta);
      
      // Verificar se a safra foi realmente adicionada
      const safraAdicionada = propriedade.safras.find(s => s.id === novaSafraId);
      if (!safraAdicionada) {
        console.error('API: Safra não foi adicionada corretamente');
        throw new Error('Falha ao adicionar safra');
      }
      
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
      const propriedade = produtores
        .flatMap(p => p.propriedades)
        .find(prop => prop.id === safra.propriedadeId);

      if (!propriedade) {
        console.error(`API: Propriedade ${safra.propriedadeId} não encontrada para atualizar safra`);
        throw new Error('Propriedade não encontrada');
      }

      const index = propriedade.safras.findIndex(s => s.id === safra.id);
      if (index === -1) {
        console.error(`API: Safra ${safra.id} não encontrada para atualização`);
        throw new Error('Safra não encontrada');
      }
      
      // Preservar culturas se não fornecidas
      const culturasOriginais = [...propriedade.safras[index].culturas];
      if (!safra.culturas || safra.culturas.length === 0) {
        safra.culturas = culturasOriginais;
      }
      
      // Criar uma cópia da safra atualizada
      const safraAtualizada = { ...safra };
      
      // Atualizar a safra na propriedade
      propriedade.safras[index] = safraAtualizada;
      
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
    const propriedade = produtores
      .flatMap(p => p.propriedades)
      .find(prop => prop.id === propriedadeId);

    if (!propriedade) {
      throw new Error('Propriedade não encontrada');
    }

    const index = propriedade.safras.findIndex(s => s.id === id);
    if (index !== -1) {
      propriedade.safras.splice(index, 1);
      return;
    }
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
    const safra = produtores
      .flatMap(p => p.propriedades)
      .flatMap(prop => prop.safras)
      .find(s => s.id === safraId);

    if (!safra) {
      throw new Error('Safra não encontrada');
    }

    const novaCulturaId = uuidv4();
    const novaCulturaCompleta = {
      ...cultura,
      id: novaCulturaId,
      safraId,
    };

    safra.culturas.push(novaCulturaCompleta);
    return novaCulturaCompleta;
  },

  // Atualizar cultura
  update: async (cultura: Cultura): Promise<Cultura> => {
    await delay(800);
    const safra = produtores
      .flatMap(p => p.propriedades)
      .flatMap(prop => prop.safras)
      .find(s => s.id === cultura.safraId);

    if (!safra) {
      throw new Error('Safra não encontrada');
    }

    const index = safra.culturas.findIndex(c => c.id === cultura.id);
    if (index !== -1) {
      const culturaAtualizada = { ...cultura };
      safra.culturas[index] = culturaAtualizada;
      return { ...culturaAtualizada };
    }
    throw new Error('Cultura não encontrada');
  },

  // Excluir cultura
  delete: async (id: string, safraId: string): Promise<void> => {
    await delay(600);
    const safra = produtores
      .flatMap(p => p.propriedades)
      .flatMap(prop => prop.safras)
      .find(s => s.id === safraId);

    if (!safra) {
      throw new Error('Safra não encontrada');
    }

    const index = safra.culturas.findIndex(c => c.id === id);
    if (index !== -1) {
      safra.culturas.splice(index, 1);
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
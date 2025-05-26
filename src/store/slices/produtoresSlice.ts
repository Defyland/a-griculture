import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { produtoresAPI } from '../../services/api';
import type { Produtor } from '../../types';

// Estado inicial
interface ProdutoresState {
  items: Produtor[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentProdutor: Produtor | null;
}

const initialState: ProdutoresState = {
  items: [],
  status: 'idle',
  error: null,
  currentProdutor: null,
};

// Thunks
export const fetchProdutores = createAsyncThunk('produtores/fetchAll', async () => {
  const response = await produtoresAPI.getAll();
  return response;
});

export const fetchProdutorById = createAsyncThunk(
  'produtores/fetchById',
  async (id: string) => {
    const response = await produtoresAPI.getById(id);
    return response;
  }
);

export const createProdutor = createAsyncThunk(
  'produtores/create',
  async (produtor: Omit<Produtor, 'id' | 'propriedades'>) => {
    const response = await produtoresAPI.create({
      ...produtor,
      propriedades: [],
    });
    return response;
  }
);

export const updateProdutor = createAsyncThunk(
  'produtores/update',
  async (produtor: Produtor) => {
    const response = await produtoresAPI.update(produtor);
    return response;
  }
);

export const deleteProdutor = createAsyncThunk(
  'produtores/delete',
  async (id: string) => {
    await produtoresAPI.delete(id);
    return id;
  }
);

// Slice
const produtoresSlice = createSlice({
  name: 'produtores',
  initialState,
  reducers: {
    clearCurrentProdutor: (state) => {
      state.currentProdutor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchProdutores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProdutores.fulfilled, (state, action: PayloadAction<Produtor[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProdutores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao carregar produtores';
      })
      // Fetch By Id
      .addCase(fetchProdutorById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProdutorById.fulfilled, (state, action: PayloadAction<Produtor | undefined>) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.currentProdutor = action.payload;
        }
      })
      .addCase(fetchProdutorById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao carregar produtor';
      })
      // Create
      .addCase(createProdutor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProdutor.fulfilled, (state, action: PayloadAction<Produtor>) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createProdutor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao criar produtor';
      })
      // Update
      .addCase(updateProdutor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProdutor.fulfilled, (state, action: PayloadAction<Produtor>) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProdutor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao atualizar produtor';
      })
      // Delete
      .addCase(deleteProdutor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProdutor.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProdutor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao excluir produtor';
      });
  },
});

export const { clearCurrentProdutor } = produtoresSlice.actions;

export default produtoresSlice.reducer; 
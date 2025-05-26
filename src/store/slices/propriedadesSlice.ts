import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { propriedadesAPI } from '../../services/api';
import type { Propriedade } from '../../types';

// Estado inicial
interface PropriedadesState {
  items: Propriedade[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPropriedade: Propriedade | null;
}

const initialState: PropriedadesState = {
  items: [],
  status: 'idle',
  error: null,
  currentPropriedade: null,
};

// Thunks
export const fetchPropriedades = createAsyncThunk('propriedades/fetchAll', async () => {
  const response = await propriedadesAPI.getAll();
  return response;
});

export const fetchPropriedadeById = createAsyncThunk(
  'propriedades/fetchById',
  async (id: string) => {
    const response = await propriedadesAPI.getById(id);
    return response;
  }
);

export const createPropriedade = createAsyncThunk(
  'propriedades/create',
  async (data: { propriedade: Omit<Propriedade, 'id' | 'safras'>; produtorId: string }) => {
    const propriedadeWithSafras = {
      ...data.propriedade,
      safras: [],
    } as Omit<Propriedade, 'id'>;
    const response = await propriedadesAPI.create(propriedadeWithSafras, data.produtorId);
    return response;
  }
);

export const updatePropriedade = createAsyncThunk(
  'propriedades/update',
  async (propriedade: Propriedade) => {
    const response = await propriedadesAPI.update(propriedade);
    return response;
  }
);

export const deletePropriedade = createAsyncThunk(
  'propriedades/delete',
  async (data: { id: string; produtorId: string }) => {
    await propriedadesAPI.delete(data.id, data.produtorId);
    return data.id;
  }
);

// Slice
const propriedadesSlice = createSlice({
  name: 'propriedades',
  initialState,
  reducers: {
    clearCurrentPropriedade: (state) => {
      state.currentPropriedade = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchPropriedades.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPropriedades.fulfilled, (state, action: PayloadAction<Propriedade[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPropriedades.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao carregar propriedades';
      })
      // Fetch By Id
      .addCase(fetchPropriedadeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPropriedadeById.fulfilled, (state, action: PayloadAction<Propriedade | undefined>) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.currentPropriedade = action.payload;
        }
      })
      .addCase(fetchPropriedadeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao carregar propriedade';
      })
      // Create
      .addCase(createPropriedade.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPropriedade.fulfilled, (state, action: PayloadAction<Propriedade>) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createPropriedade.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao criar propriedade';
      })
      // Update
      .addCase(updatePropriedade.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePropriedade.fulfilled, (state, action: PayloadAction<Propriedade>) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updatePropriedade.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao atualizar propriedade';
      })
      // Delete
      .addCase(deletePropriedade.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePropriedade.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePropriedade.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao excluir propriedade';
      });
  },
});

export const { clearCurrentPropriedade } = propriedadesSlice.actions;

export default propriedadesSlice.reducer; 
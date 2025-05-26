import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { safrasAPI } from '../../services/api';
import type { Safra } from '../../types';

// Estado inicial
interface SafrasState {
  items: Safra[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentSafra: Safra | null;
}

const initialState: SafrasState = {
  items: [],
  status: 'idle',
  error: null,
  currentSafra: null,
};

// Thunks
export const fetchSafrasByPropriedade = createAsyncThunk(
  'safras/fetchByPropriedade',
  async (propriedadeId: string) => {
    const response = await safrasAPI.getByPropriedade(propriedadeId);
    return response;
  }
);

export const fetchSafraById = createAsyncThunk(
  'safras/fetchById',
  async (id: string) => {
    const response = await safrasAPI.getById(id);
    return response;
  }
);

export const createSafra = createAsyncThunk(
  'safras/create',
  async (params: { safra: Omit<Safra, 'id' | 'culturas'>, propriedadeId: string }) => {
    const { safra, propriedadeId } = params;
    const response = await safrasAPI.create(safra, propriedadeId);
    return response;
  }
);

export const updateSafra = createAsyncThunk(
  'safras/update',
  async (safra: Safra) => {
    const response = await safrasAPI.update(safra);
    return response;
  }
);

export const deleteSafra = createAsyncThunk(
  'safras/delete',
  async (params: { id: string, propriedadeId: string }) => {
    const { id, propriedadeId } = params;
    await safrasAPI.delete(id, propriedadeId);
    return id;
  }
);

// Slice
const safrasSlice = createSlice({
  name: 'safras',
  initialState,
  reducers: {
    clearCurrentSafra: (state) => {
      state.currentSafra = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch By Propriedade
      .addCase(fetchSafrasByPropriedade.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSafrasByPropriedade.fulfilled, (state, action: PayloadAction<Safra[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSafrasByPropriedade.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao carregar safras';
      })
      // Fetch By Id
      .addCase(fetchSafraById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSafraById.fulfilled, (state, action: PayloadAction<Safra | undefined>) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.currentSafra = action.payload;
        }
      })
      .addCase(fetchSafraById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao carregar safra';
      })
      // Create
      .addCase(createSafra.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSafra.fulfilled, (state, action: PayloadAction<Safra>) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createSafra.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao criar safra';
      })
      // Update
      .addCase(updateSafra.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSafra.fulfilled, (state, action: PayloadAction<Safra>) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateSafra.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao atualizar safra';
      })
      // Delete
      .addCase(deleteSafra.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSafra.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.items = state.items.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteSafra.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao excluir safra';
      });
  },
});

export const { clearCurrentSafra } = safrasSlice.actions;

export default safrasSlice.reducer; 
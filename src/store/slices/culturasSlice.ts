import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { culturasAPI } from '../../services/api';
import type { Cultura } from '../../types';

// Estado inicial
interface CulturasState {
  items: Cultura[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentCultura: Cultura | null;
}

const initialState: CulturasState = {
  items: [],
  status: 'idle',
  error: null,
  currentCultura: null,
};

// Thunks
export const fetchCulturasBySafra = createAsyncThunk(
  'culturas/fetchBySafra',
  async (safraId: string) => {
    const response = await culturasAPI.getBySafra(safraId);
    return response;
  }
);

export const fetchCulturaById = createAsyncThunk(
  'culturas/fetchById',
  async (id: string) => {
    const response = await culturasAPI.getById(id);
    return response;
  }
);

export const createCultura = createAsyncThunk(
  'culturas/create',
  async (params: { cultura: Omit<Cultura, 'id'>, safraId: string }) => {
    const { cultura, safraId } = params;
    const response = await culturasAPI.create(cultura, safraId);
    return response;
  }
);

export const updateCultura = createAsyncThunk(
  'culturas/update',
  async (cultura: Cultura) => {
    const response = await culturasAPI.update(cultura);
    return response;
  }
);

export const deleteCultura = createAsyncThunk(
  'culturas/delete',
  async (params: { id: string, safraId: string }) => {
    const { id, safraId } = params;
    await culturasAPI.delete(id, safraId);
    return id;
  }
);

// Slice
const culturasSlice = createSlice({
  name: 'culturas',
  initialState,
  reducers: {
    clearCurrentCultura: (state) => {
      state.currentCultura = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch By Safra
      .addCase(fetchCulturasBySafra.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCulturasBySafra.fulfilled, (state, action: PayloadAction<Cultura[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCulturasBySafra.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao carregar culturas';
      })
      // Fetch By Id
      .addCase(fetchCulturaById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCulturaById.fulfilled, (state, action: PayloadAction<Cultura | undefined>) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.currentCultura = action.payload;
        }
      })
      .addCase(fetchCulturaById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao carregar cultura';
      })
      // Create
      .addCase(createCultura.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCultura.fulfilled, (state, action: PayloadAction<Cultura>) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createCultura.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao criar cultura';
      })
      // Update
      .addCase(updateCultura.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCultura.fulfilled, (state, action: PayloadAction<Cultura>) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCultura.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao atualizar cultura';
      })
      // Delete
      .addCase(deleteCultura.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCultura.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.items = state.items.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCultura.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao excluir cultura';
      });
  },
});

export const { clearCurrentCultura } = culturasSlice.actions;

export default culturasSlice.reducer; 
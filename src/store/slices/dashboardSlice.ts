import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dashboardAPI } from '../../services/api';
import type { DashboardData } from '../../types';

// Estado inicial
interface DashboardState {
  data: DashboardData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  status: 'idle',
  error: null,
};

// Thunks
export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
  const response = await dashboardAPI.getData();
  return response;
});

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erro ao carregar dados do dashboard';
      });
  },
});

export default dashboardSlice.reducer; 
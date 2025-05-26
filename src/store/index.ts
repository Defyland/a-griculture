import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

// Importações dos slices
import produtoresReducer from './slices/produtoresSlice';
import dashboardReducer from './slices/dashboardSlice';
import safrasReducer from './slices/safrasSlice';
import culturasReducer from './slices/culturasSlice';

export const store = configureStore({
  reducer: {
    produtores: produtoresReducer,
    dashboard: dashboardReducer,
    safras: safrasReducer,
    culturas: culturasReducer,
  },
});

// Tipos para useDispatch e useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 
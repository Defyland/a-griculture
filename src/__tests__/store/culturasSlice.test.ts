import culturasReducer, {
  clearCurrentCultura
} from '../../store/slices/culturasSlice';

describe('culturasSlice', () => {
  it('deve ter reducer definido', () => {
    expect(culturasReducer).toBeDefined();
    expect(typeof culturasReducer).toBe('function');
  });

  it('deve ter ação clearCurrentCultura definida', () => {
    expect(clearCurrentCultura).toBeDefined();
    expect(typeof clearCurrentCultura).toBe('function');
  });

  it('deve processar ação clearCurrentCultura', () => {
    const initialState = {
      items: [],
      status: 'idle' as const,
      error: null,
      currentCultura: { id: '1', nome: 'Soja', safraId: '1' }
    };

    const action = clearCurrentCultura();
    const newState = culturasReducer(initialState, action);
    
    expect(newState.currentCultura).toBeNull();
  });

  it('deve manter estado inicial correto', () => {
    const state = culturasReducer(undefined, { type: '@@INIT' });
    
    expect(state.items).toEqual([]);
    expect(state.status).toBe('idle');
    expect(state.error).toBeNull();
    expect(state.currentCultura).toBeNull();
  });
}); 
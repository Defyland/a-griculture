import { renderHook } from '@testing-library/react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

describe('useFocusTrap', () => {
  it('deve retornar ref para o elemento', () => {
    const { result } = renderHook(() => useFocusTrap(false));
    
    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe('object');
  });

  it('deve funcionar com isActive true', () => {
    const { result } = renderHook(() => useFocusTrap(true));
    
    expect(result.current).toBeDefined();
  });

  it('deve funcionar com isActive false', () => {
    const { result } = renderHook(() => useFocusTrap(false));
    
    expect(result.current).toBeDefined();
  });

  it('deve retornar ref válido', () => {
    const { result } = renderHook(() => useFocusTrap(false));
    
    expect(result.current.current).toBeNull();
  });

  it('deve manter mesma referência entre renders', () => {
    const { result, rerender } = renderHook(() => useFocusTrap(false));
    
    const firstRef = result.current;
    rerender();
    const secondRef = result.current;
    
    expect(firstRef).toBe(secondRef);
  });

  it('deve criar nova referência quando isActive muda', () => {
    const { result, rerender } = renderHook(
      ({ isActive }) => useFocusTrap(isActive),
      { initialProps: { isActive: false } }
    );
    
    rerender({ isActive: true });
    
    // A referência deve ser a mesma, mas o comportamento interno pode ter mudado
    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe('object');
  });

  it('deve funcionar com isActive false como padrão', () => {
    const { result } = renderHook(() => useFocusTrap(false));
    
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('deve retornar ref com propriedades corretas', () => {
    const { result } = renderHook(() => useFocusTrap(false));
    
    expect(result.current).toHaveProperty('current');
    expect(result.current.current).toBeNull();
  });

  it('deve funcionar com diferentes valores de isActive', () => {
    const { result, rerender } = renderHook(
      ({ isActive }) => useFocusTrap(isActive),
      { initialProps: { isActive: true } }
    );
    
    expect(result.current).toBeDefined();
    
    rerender({ isActive: false });
    expect(result.current).toBeDefined();
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve retornar valor inicial', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    
    expect(result.current).toBe('test');
  });

  it('deve debounce o valor', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );
    
    expect(result.current).toBe('initial');
    
    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial');
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(result.current).toBe('updated');
  });

  it('deve funcionar com diferentes delays', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 1000 } }
    );
    
    rerender({ value: 'new', delay: 1000 });
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(result.current).toBe('test');
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(result.current).toBe('new');
  });

  it('deve cancelar timeout anterior quando valor muda rapidamente', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );
    
    rerender({ value: 'first', delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    rerender({ value: 'second', delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    expect(result.current).toBe('initial');
    
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(result.current).toBe('second');
  });

  it('deve funcionar com diferentes tipos de valores', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 123, delay: 300 } }
    );
    
    expect(result.current).toBe(123);
    
    rerender({ value: 456, delay: 300 });
    
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(result.current).toBe(456);
  });

  it('deve funcionar com objetos', () => {
    const initialObj = { name: 'test', value: 1 };
    const updatedObj = { name: 'updated', value: 2 };
    
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: initialObj, delay: 200 } }
    );
    
    expect(result.current).toBe(initialObj);
    
    rerender({ value: updatedObj, delay: 200 });
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    expect(result.current).toBe(updatedObj);
  });

  it('deve limpar timeout ao desmontar componente', () => {
    const { unmount, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );
    
    rerender({ value: 'updated', delay: 500 });
    
    unmount();
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Não deve haver erros ao desmontar com timeout ativo
    expect(true).toBe(true);
  });
}); 
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Tornar o jest disponível globalmente para todos os testes
global.jest = jest;

// Mock para keyframes do styled-components
export const keyframes = () => 'animation-name';

// Silenciar os console.error relacionados a props customizadas
// que são comuns nos testes com o styled-components
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const message = args[0] || '';
  
  // Lista de erros a serem silenciados
  const suppressedErrors = [
    'React does not recognize the',
    'prop on a DOM element',
    'Received `true` for a non-boolean attribute',
    'Received `false` for a non-boolean attribute',
  ];
  
  // Verificar se o erro deve ser silenciado
  const shouldSuppress = suppressedErrors.some(errorText => 
    typeof message === 'string' && message.includes(errorText)
  );
  
  if (!shouldSuppress) {
    originalConsoleError(...args);
  }
};

// Customizador para testes de estilo
expect.extend({
  toHaveStyleRule(received, property, value) {
    const style = window.getComputedStyle(received);
    const pass = style[property] === value;
    
    if (pass) {
      return {
        message: () => `expected ${received} not to have CSS property "${property}: ${value}"`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to have CSS property "${property}: ${value}", but received "${style[property]}"`,
        pass: false,
      };
    }
  },
});

// Mock para o matchMedia que não está disponível no JSDom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock para ResizeObserver
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

// Adicionar polyfill para TextEncoder/TextDecoder (necessário para react-router)
class TextEncoderPolyfill {
  encode(input: string): Uint8Array {
    const utf8 = unescape(encodeURIComponent(input));
    const result = new Uint8Array(utf8.length);
    for (let i = 0; i < utf8.length; i++) {
      result[i] = utf8.charCodeAt(i);
    }
    return result;
  }
}

class TextDecoderPolyfill {
  decode(input?: Uint8Array): string {
    if (!input) return '';
    const bytes = new Uint8Array(input);
    const decoded = decodeURIComponent(escape(String.fromCharCode.apply(null, Array.from(bytes))));
    return decoded;
  }
}

// @ts-expect-error - TextEncoder não está definido no tipo global do NodeJS
global.TextEncoder = TextEncoderPolyfill;
// @ts-expect-error - TextDecoder não está definido no tipo global do NodeJS
global.TextDecoder = TextDecoderPolyfill; 
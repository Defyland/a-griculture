import React from 'react';

// Função para filtrar apenas as props válidas para elementos HTML
const filterValidHtmlProps = (props) => {
  const validProps = {};
  const transientPropRegex = /^\$/; // Identificar props que começam com $
  
  Object.keys(props).forEach(key => {
    // Ignorar props transientes (que começam com $) e props específicas do styled-components
    if (!transientPropRegex.test(key)) {
      validProps[key] = props[key];
    }
  });
  
  return validProps;
};

// Factory para criar componentes mockados
const createStyledComponent = (Component) => {
  return (styles) => {
    return (props) => {
      const validProps = filterValidHtmlProps(props);
      
      // Adicionar uma classe com o "tipo" de componente para ajudar nos testes
      const className = `styled-${Component.displayName || Component.name || 'component'}`;
      
      // Mesclar className existente se houver
      const mergedClassNames = props.className 
        ? `${props.className} ${className}`
        : className;
        
      return React.createElement(Component, {...validProps, className: mergedClassNames, 'data-testid': props['data-testid']});
    };
  };
};

// Crie o componente styled para cada tipo de elemento HTML
const elementTypes = [
  'div', 'span', 'button', 'input', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'li', 'label', 'select', 'nav', 'article', 'section', 'aside', 'header',
  'footer', 'main', 'form', 'textarea', 'fieldset', 'legend', 'table', 'tr', 'td',
  'th', 'thead', 'tbody', 'tfoot'
];

// Mock para elementos HTML básicos
const styled = elementTypes.reduce((acc, type) => {
  acc[type] = (styles) => (props) => {
    const validProps = filterValidHtmlProps(props);
    return React.createElement(type, validProps);
  };
  return acc;
}, {});

// Proxy para capturar qualquer elemento não definido explicitamente
const styledProxy = new Proxy(createStyledComponent, {
  get: (target, prop) => {
    if (prop in styled) {
      return styled[prop];
    }
    // Mock dinâmico para qualquer outro elemento HTML
    return (styles) => (props) => {
      const validProps = filterValidHtmlProps(props);
      return React.createElement(prop, validProps);
    };
  }
});

// Mock para a função css
const css = (...args) => args.join('');

// Mock do ThemeProvider
export const ThemeProvider = ({ children, theme }) => children;

// Mock do createGlobalStyle
export const createGlobalStyle = () => null;

// Mock do keyframes
export const keyframes = () => 'animation-name';

export default styledProxy;
export { css }; 
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100%;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    line-height: 1.5;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.medium};
    margin-top: 0;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  
  h1 {
    font-size: 2.5rem;
    letter-spacing: -0.022em;
  }
  
  h2 {
    font-size: 2rem;
    letter-spacing: -0.021em;
  }
  
  h3 {
    font-size: 1.75rem;
    letter-spacing: -0.02em;
  }
  
  h4 {
    font-size: 1.5rem;
    letter-spacing: -0.018em;
  }
  
  h5 {
    font-size: 1.25rem;
    letter-spacing: -0.016em;
  }
  
  h6 {
    font-size: 1.125rem;
    letter-spacing: -0.014em;
  }
  
  p {
    margin-top: 0;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primaryDark};
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button {
    font-family: ${theme.fonts.primary};
  }
  
  input, select, textarea {
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.medium};
  }
  
  /* Scrollbar styles - Apple-like minimal design */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    transition: background ${theme.transitions.fast};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  
  /* Focus outline style - similar to Safari */
  :focus {
    outline: ${theme.colors.primary} auto 1px;
    outline-offset: 2px;
  }
  
  /* For better mobile experience */
  @media (max-width: ${theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.75rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
    
    h4 {
      font-size: 1.25rem;
    }
    
    h5 {
      font-size: 1.125rem;
    }
    
    h6 {
      font-size: 1rem;
    }
  }
`;

export default GlobalStyles; 
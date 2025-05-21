import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: ${theme.fonts.primary};
    font-size: 16px;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${theme.spacing.md};
    font-weight: 500;
  }

  h1 {
    font-size: ${theme.fontSizes.xxlarge};
  }

  h2 {
    font-size: ${theme.fontSizes.xlarge};
  }

  h3 {
    font-size: ${theme.fontSizes.large};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  img {
    max-width: 100%;
  }

  ul, ol {
    list-style-position: inside;
    margin-bottom: ${theme.spacing.md};
  }
`; 
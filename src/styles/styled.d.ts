import 'styled-components';
import { theme } from './theme';

type ThemeType = typeof theme;

// Estendendo a definição padrão
declare module 'styled-components' {
   
  export interface DefaultTheme extends ThemeType {}
} 
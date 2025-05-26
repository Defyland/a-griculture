export const theme = {
  colors: {
    primary: '#34C759',
    primaryLight: '#63DD83',
    primaryDark: '#248A3D',
    primaryLighter: '#F2FFF5',
    primaryAlpha: 'rgba(52, 199, 89, 0.1)',
    
    secondary: '#007AFF',
    secondaryLight: '#5AA9FF',
    secondaryDark: '#0055B3',
    secondaryLighter: '#F0F8FF',
    secondaryAlpha: 'rgba(0, 122, 255, 0.1)',
    
    tertiary: '#FF9500',
    tertiaryLight: '#FFB54C',
    tertiaryDark: '#C56500',
    tertiaryLighter: '#FFF8F0',
    tertiaryAlpha: 'rgba(255, 149, 0, 0.1)',
    
    danger: '#FF3B30',
    dangerLight: '#FF6D65',
    dangerDark: '#C90000',
    dangerLighter: '#FFF0F0',
    dangerAlpha: 'rgba(255, 59, 48, 0.1)',
    
    warning: '#FFCC00',
    warningLight: '#FFDB4D',
    warningDark: '#D6A100',
    warningLighter: '#FFFDF0',
    warningAlpha: 'rgba(255, 204, 0, 0.1)',
    
    success: '#34C759',
    successLight: '#63DD83',
    successDark: '#248A3D',
    successLighter: '#F2FFF5',
    successAlpha: 'rgba(52, 199, 89, 0.1)',
    
    info: '#5AC8FA',
    infoLight: '#8AD9FC',
    infoDark: '#0889C6',
    infoLighter: '#F0FAFF',
    infoAlpha: 'rgba(90, 200, 250, 0.1)',
    
    background: '#FAFAFA',
    backgroundDarker: '#F2F2F7',
    backgroundLight: '#FFFFFF',
    cardBackground: '#FFFFFF',
    
    text: '#1D1D1F',
    textSecondary: '#515154',
    lightText: '#86868B',
    
    border: '#E5E5EA',
    borderDark: '#C6C6C8',
    divider: '#F2F2F7',
    
    white: '#FFFFFF',
    black: '#000000',
    
    inputBackground: '#FFFFFF',
    inputBorder: '#C6C6C8',
    inputFocus: '#34C759',
    
    disabledBackground: '#F2F2F7',
    disabledText: '#86868B',
    disabledBorder: '#E5E5EA',
    
    tableHeaderBackground: '#F9F9FB',
    tableRowHover: '#F2F2F7',
    tableStripedBackground: '#FAFAFA',
    
    badgeBackground: '#F2F2F7',
    tooltip: '#1D1D1F',
    placeholder: '#9e9e9e',
    selection: 'rgba(52, 199, 89, 0.2)',
  },
  
  fonts: {
    primary: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    monospace: "'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    heading: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  
  fontSizes: {
    tiny: '0.75rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.125rem',
    xlarge: '1.25rem',
    xxlarge: '1.5rem',
    xxxlarge: '2rem',
    huge: '2.5rem',
  },
  
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  borderRadius: {
    small: '6px',
    medium: '8px',
    large: '12px',
    xl: '20px',
    round: '50%',
  },
  shadows: {
    small: '0 1px 2px rgba(0,0,0,0.05)',
    medium: '0 2px 8px rgba(0,0,0,0.07)',
    large: '0 8px 16px rgba(0,0,0,0.08)',
    xl: '0 12px 24px rgba(0,0,0,0.09)',
    inner: 'inset 0 1px 2px rgba(0,0,0,0.04)',
    focus: '0 0 0 3px rgba(52, 199, 89, 0.3)',
    popover: '0 5px 15px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.05)',
    card: '0 1px 3px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.04)',
    none: 'none',
  },
  transitions: {
    fast: '0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    medium: '0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    slow: '0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  breakpoints: {
    xs: '480px',
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    largeDesktop: '1200px',
    xl: '1400px',
  },
  grid: {
    container: {
      xs: '100%',
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
      xxl: '1320px',
    },
    gutter: '1.5rem',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  elements: {
    buttonHeight: {
      small: '2rem',
      medium: '2.5rem',
      large: '3rem',
    },
    inputHeight: {
      small: '2rem',
      medium: '2.5rem',
      large: '3rem',
    },
    header: {
      height: '3.5rem',
      compactHeight: '3rem',
    },
    navSidebar: {
      width: '16rem',
      collapsedWidth: '4.5rem',
    },
    sidebar: {
      width: '18rem',
    },
  },
}; 
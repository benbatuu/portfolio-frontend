export const theme = {
  colors: {
    primary: '#011627',
    secondary: '#011221',
    border: '#1E2D3D',
    text: '#607B96',
    textLight: '#E5E9F0',
    background: '#000000',
    containerBg: '#011627',
    backgroundLight: '#1E2D3D',
    purple: '#4D5BCE',
    orange: '#FEA55F',
    green: '#43D9AD',
    white: '#FFFFFF',
  },
  fonts: {
    main: "'Fira Code', monospace",
    title: "'Fira Code', monospace",
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  transitions: {
    default: 'all 0.3s ease-in-out',
  },
  maxWidth: '1100px',
  borderRadius: '8px',
} as const;

export type Theme = typeof theme; 
const palette = {
  primary: {
    100: '#45BF91',
    150: '#4BAE8A',
    200: '#7ED3B3',
    300: '#BDE9D8',
    400: '#D2EBDE',
    500: '#EFFBF5',
    600: '#E1F4EE',
  },
  neutral: {
    100: '#FFFFFF',
    800: '#00000026',
    900: '#000000',
  },
  danger: {
    500: '#D07F7E',
    600: '#D35A58',
    700: '#D66764',
  },
};

export const theme = {
  spacing: {
    xs: '0.4rem',
    sm: '0.8rem',
    md: '1.2rem',
    lg: '1.6rem',
    xl: '2.0rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  fonts: {
    sm: "1rem",
    md: "1.2rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  weights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  colors: {
    background: palette.primary[500],
    header: palette.primary[600],
    main: palette.primary[600],
    // [TODO] status 이름 수정
    status: palette.primary[400],
    card: palette.primary[200],
    gameDiv: palette.primary[600],
    theadTr: palette.primary[400],

    modal: palette.primary[600],
    modalOverlay: palette.neutral[800],
    modalLoading: palette.primary[150],

    buttonInactive: palette.primary[400],
    buttonActive: palette.primary[200],
    buttonHover: palette.primary[300],
    resetButton: palette.danger[500],
    resetButtonHover: palette.danger[600],

    matchedPair: palette.primary[100],
    mismatchedPair: palette.danger[700],

    white: palette.neutral[100],
    black: palette.neutral[900],
  },
};
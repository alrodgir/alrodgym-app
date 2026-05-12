// AlrodGym Design System — extraído del Figma
// Fuentes: Anybody (métricas), Space Grotesk (títulos), Inter (body)

export const colors = {
  // Surface
  surface: '#1A1A2E',
  surfaceDim: '#1d100c',
  surfaceBright: '#463630',
  surfaceContainerLowest: '#170b08',
  surfaceContainerLow: '#261814',
  surfaceContainer: '#2a1c18',
  surfaceContainerHigh: '#352722',
  surfaceContainerHighest: '#41312c',

  // On Surface
  onSurface: '#f7ddd5',
  onSurfaceVariant: '#e1bfb5',

  // Primary (Neon Orange)
  primary: '#FF6B35',
  onPrimary: '#000000',
  primaryContainer: '#FF6B35',
  primaryFixed: '#ffdbd0',
  primaryFixedDim: '#ffb59d',
  onPrimaryFixed: '#390c00',
  onPrimaryFixedVariant: '#832600',

  // Secondary (Electric Blue)
  secondary: '#0F3460',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#294a77',
  onSecondaryContainer: '#9bbaee',

  // Accent Blue
  accentBlue: '#0F3460',
  accentCyan: '#59d5fb',
  accentTeal: '#00a7cb',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#e1bfb5',
  textMuted: '#a98a80',

  // Status
  success: '#00C853',
  warning: '#FF8800',
  error: '#FF4444',
  rir0: '#FF4444',
  rir1: '#FF8800',
  rir2: '#FFDD00',

  // Nav
  navInactive: '#594139',
  navActive: '#FF6B35',
  navBackground: '#1A1A2E',

  // Borders
  border: 'rgba(255,255,255,0.06)',
  borderLight: 'rgba(255,255,255,0.10)',
};

export const typography = {
  // The Metric (Anybody) — pesos, reps, temporizadores
  display: {
    fontFamily: 'Anybody_800ExtraBold',
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -0.02,
  },
  displaySmall: {
    fontFamily: 'Anybody_800ExtraBold',
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.01,
  },
  // Space Grotesk — títulos y labels
  h1: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    lineHeight: 34,
  },
  h2: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 22,
    lineHeight: 28,
  },
  h3: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 18,
    lineHeight: 24,
  },
  label: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  // Inter — cuerpo
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  captionBold: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    lineHeight: 18,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const layout = {
  mobileMargin: 20,
  contentWidth: 390 - 40, // 390px - 20px*2 margins
};

// Temas de color para AlrodGym
// Cada tema define la paleta completa

const themes = {
  // Tema original — navy + naranja neón
  alrod: {
    name: 'Alrod',
    colors: {
      surface: '#1A1A2E',
      surfaceContainerLow: '#261814',
      surfaceContainer: '#2a1c18',
      surfaceContainerHigh: '#352722',
      primary: '#FF6B35',
      onPrimary: '#000000',
      secondary: '#0F3460',
      accentBlue: '#0F3460',
      accentCyan: '#59d5fb',
      textPrimary: '#FFFFFF',
      textSecondary: '#e1bfb5',
      textMuted: '#a98a80',
      success: '#00C853',
      warning: '#FF8800',
      error: '#FF4444',
      border: 'rgba(255,255,255,0.06)',
    },
  },

  // Matrix — verde neón sobre carbón
  matrix: {
    name: 'Matrix',
    colors: {
      surface: '#0D1117',
      surfaceContainerLow: '#161B22',
      surfaceContainer: '#21262D',
      surfaceContainerHigh: '#30363D',
      primary: '#00FF41',
      onPrimary: '#000000',
      secondary: '#1a4a1a',
      accentBlue: '#58A6FF',
      accentCyan: '#39D2C0',
      textPrimary: '#C9D1D9',
      textSecondary: '#8B949E',
      textMuted: '#6E7681',
      success: '#00FF41',
      warning: '#FFA500',
      error: '#FF4444',
      border: 'rgba(255,255,255,0.08)',
    },
  },

  // Royal — púrpura + dorado
  royal: {
    name: 'Royal',
    colors: {
      surface: '#1A0A2E',
      surfaceContainerLow: '#2D1B4E',
      surfaceContainer: '#3D2A5E',
      surfaceContainerHigh: '#4D3A6E',
      primary: '#FFD700',
      onPrimary: '#1A0A2E',
      secondary: '#6A0DAD',
      accentBlue: '#9B59B6',
      accentCyan: '#E8A0FF',
      textPrimary: '#F5E6FF',
      textSecondary: '#D4B8FF',
      textMuted: '#9B80B0',
      success: '#00E676',
      warning: '#FFB300',
      error: '#FF5252',
      border: 'rgba(255,215,0,0.1)',
    },
  },

  // Ice — azul hielo + cian
  ice: {
    name: 'Ice',
    colors: {
      surface: '#0F172A',
      surfaceContainerLow: '#1E293B',
      surfaceContainer: '#334155',
      surfaceContainerHigh: '#475569',
      primary: '#38BDF8',
      onPrimary: '#0F172A',
      secondary: '#1E3A5F',
      accentBlue: '#60A5FA',
      accentCyan: '#22D3EE',
      textPrimary: '#F1F5F9',
      textSecondary: '#CBD5E1',
      textMuted: '#94A3B8',
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      border: 'rgba(56,189,248,0.1)',
    },
  },

  // Lava — rojo anaranjado intenso
  lava: {
    name: 'Lava',
    colors: {
      surface: '#1C0F0A',
      surfaceContainerLow: '#2C1A12',
      surfaceContainer: '#3C2518',
      surfaceContainerHigh: '#4C3020',
      primary: '#FF4500',
      onPrimary: '#FFFFFF',
      secondary: '#8B2500',
      accentBlue: '#FF6B35',
      accentCyan: '#FF8C42',
      textPrimary: '#FFE4D6',
      textSecondary: '#FFC8B0',
      textMuted: '#A87A6A',
      success: '#FF6347',
      warning: '#FFA500',
      error: '#FF0000',
      border: 'rgba(255,69,0,0.12)',
    },
  },

  // Midnight — azul profundo + plata
  midnight: {
    name: 'Midnight',
    colors: {
      surface: '#0A0E27',
      surfaceContainerLow: '#141838',
      surfaceContainer: '#1E2248',
      surfaceContainerHigh: '#282C58',
      primary: '#C0C0FF',
      onPrimary: '#0A0E27',
      secondary: '#2A2E5E',
      accentBlue: '#7B8CFF',
      accentCyan: '#A0B4FF',
      textPrimary: '#E8E8FF',
      textSecondary: '#B8B8E0',
      textMuted: '#8888AA',
      success: '#00E5FF',
      warning: '#FFD740',
      error: '#FF5252',
      border: 'rgba(192,192,255,0.08)',
    },
  },
};

export default themes;
export const themeList = Object.keys(themes).map(key => ({
  id: key,
  ...themes[key],
}));

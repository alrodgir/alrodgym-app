// Theme system — exporta colores estáticos (fallback) y dinámicos (context)
import themes from './themes';
import { ThemeProvider, useTheme } from './ThemeContext';

// Static fallback (tema default) — para StyleSheet.create() y imports directos
export const colors = themes.alrod.colors;
export const typography = {
  display: { fontFamily: 'Anybody_800ExtraBold', fontSize: 48, lineHeight: 52, letterSpacing: -0.02 },
  displaySmall: { fontFamily: 'Anybody_800ExtraBold', fontSize: 32, lineHeight: 36, letterSpacing: -0.01 },
  h1: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 28, lineHeight: 34 },
  h2: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 22, lineHeight: 28 },
  h3: { fontFamily: 'SpaceGrotesk_600SemiBold', fontSize: 18, lineHeight: 24 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 12, lineHeight: 12, letterSpacing: 0.1, textTransform: 'uppercase' },
  body: { fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24 },
  bodyBold: { fontFamily: 'Inter_700Bold', fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 18 },
  captionBold: { fontFamily: 'Inter_700Bold', fontSize: 13, lineHeight: 18 },
};
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
export const radius = { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 };
export const layout = { mobileMargin: 20, contentWidth: 350 };

export { themes, themeList } from './themes';
export { ThemeProvider, useTheme };

// Hook para obtener los colores del tema activo
export function useThemeColors() {
  const { theme } = useTheme();
  return theme.colors;
}

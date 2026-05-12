// Theme context — permite cambiar de tema en caliente
import React, { createContext, useContext, useState } from 'react';
import themes from './themes';

const ThemeContext = createContext({
  theme: themes.alrod,
  themeId: 'alrod',
  setTheme: () => {},
  themeList: Object.keys(themes).map(k => ({ id: k, ...themes[k] })),
});

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState('alrod');
  const theme = themes[themeId] || themes.alrod;

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme: setThemeId, themeList: Object.keys(themes).map(k => ({ id: k, ...themes[k] })) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;

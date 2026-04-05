import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DarkTheme = {
  dark: true,
  bg: '#09090B',
  surface: '#111111',
  surfaceElevated: '#1A1A1A',
  border: '#2A2A2A',
  text: '#FFFFFF',
  textMuted: '#888888',
  accent: '#F97316',
  accentLight: '#FED7AA',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#EAB308',
};

export const LightTheme = {
  dark: false,
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceElevated: '#F4F4F5',
  border: '#E4E4E7',
  text: '#09090B',
  textMuted: '#71717A',
  accent: '#EA6E00',
  accentLight: '#FED7AA',
  success: '#16A34A',
  error: '#DC2626',
  warning: '#CA8A04',
};

export type Theme = typeof DarkTheme;

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: DarkTheme,
  isDark: true,
  toggleTheme: () => {},
});

const THEME_KEY = '@bt_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((val) => {
      if (val !== null) {
        setIsDark(val === 'dark');
      }
    });
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    await AsyncStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme: isDark ? DarkTheme : LightTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

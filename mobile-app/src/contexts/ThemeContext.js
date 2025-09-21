import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  light: {
    primary: '#00d4ff',
    secondary: '#0099cc',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#dee2e6',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
  },
  dark: {
    primary: '#00d4ff',
    secondary: '#0099cc',
    background: '#0f0f23',
    surface: '#1a1a2e',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.1)',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
  },
  quantum: {
    primary: '#00d4ff',
    secondary: '#0099cc',
    background: '#0f0f23',
    surface: '#1a1a2e',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(0, 212, 255, 0.3)',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
    accent: '#ff6b6b',
    gradient: ['#0f0f23', '#1a1a2e', '#16213e'],
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('quantum');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    loadTheme();
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });
    return () => subscription?.remove();
  }, []);

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme && themes[storedTheme]) {
        setTheme(storedTheme);
        setIsDarkMode(storedTheme !== 'light');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const changeTheme = async (newTheme) => {
    try {
      if (themes[newTheme]) {
        setTheme(newTheme);
        setIsDarkMode(newTheme !== 'light');
        await AsyncStorage.setItem('theme', newTheme);
      }
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  };

  const toggleDarkMode = async () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    await changeTheme(newTheme);
  };

  const getCurrentTheme = () => themes[theme];

  const value = {
    theme,
    isDarkMode,
    currentTheme: getCurrentTheme(),
    changeTheme,
    toggleDarkMode,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

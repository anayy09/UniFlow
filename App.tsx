// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

// Ignore specific warnings
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

// We need this wrapper to access the theme context
const ThemedApp = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <PaperProvider
      theme={{
        dark: isDarkMode,
        colors: {
          primary: '#4361EE',
          accent: '#FF006E',
          background: isDarkMode ? '#2B2D42' : '#FFFFFF',
          surface: isDarkMode ? '#3A3B50' : '#F8F9FA',
          text: isDarkMode ? '#FFFFFF' : '#2B2D42',
          disabled: isDarkMode ? '#AAAAAA' : '#9E9E9E',
          placeholder: isDarkMode ? '#AAAAAA' : '#9E9E9E',
          backdrop: 'rgba(0, 0, 0, 0.5)',
          onSurface: isDarkMode ? '#FFFFFF' : '#2B2D42',
          notification: '#FF006E',
        },
      }}
    >
      <RootNavigator />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </PaperProvider>
  );
};

export default App;
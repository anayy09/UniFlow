import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from './src/context/ThemeContext';
import { useTheme } from './src/context/ThemeContext';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components';

// Temporary placeholder component until we set up navigation
const PlaceholderScreen = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <Container>
      <Title>UniFlow: Campus Pulse</Title>
      <Subtitle>Your time management companion</Subtitle>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </Container>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <ThemeProvider>
          <PlaceholderScreen />
        </ThemeProvider>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props: { theme: DefaultTheme }) => props.theme.colors.background};
  padding: ${(props: { theme: DefaultTheme }) => props.theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${(props: { theme: DefaultTheme }) => props.theme.fontSizes.xxxl}px;
  font-weight: ${(props: { theme: DefaultTheme }) => props.theme.fontWeights.bold};
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.primary};
  margin-bottom: ${(props: { theme: DefaultTheme }) => props.theme.spacing.md}px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: ${(props: { theme: DefaultTheme }) => props.theme.fontSizes.lg}px;
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text};
  text-align: center;
`;

export default App;
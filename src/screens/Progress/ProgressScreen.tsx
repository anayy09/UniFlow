// src/screens/Progress/ProgressScreen.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { useTheme } from '../../context/ThemeContext';

const ProgressScreen = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <Container>
      <Title>Progress</Title>
      <Subtitle>Your stats and achievements will appear here</Subtitle>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${props => props.theme.fontSizes.xxxl}px;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const Subtitle = styled.Text`
  font-size: ${props => props.theme.fontSizes.lg}px;
  color: ${props => props.theme.colors.text};
`;

export default ProgressScreen;
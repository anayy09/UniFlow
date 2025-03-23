// src/screens/Settings/SettingsScreen.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { useTheme } from '../../context/ThemeContext';

const SettingsScreen = () => {
  const { isDarkMode, themeMode, setThemeMode } = useTheme();
  
  return (
    <Container>
      <Title>Settings</Title>
      <Subtitle>App preferences and settings</Subtitle>
      
      <SettingsSection>
        <SectionTitle>Theme</SectionTitle>
        <SettingRow>
          <SettingButton 
            active={themeMode === 'light'} 
            onPress={() => setThemeMode('light')}
          >
            <SettingButtonText active={themeMode === 'light'}>Light</SettingButtonText>
          </SettingButton>
          
          <SettingButton 
            active={themeMode === 'dark'} 
            onPress={() => setThemeMode('dark')}
          >
            <SettingButtonText active={themeMode === 'dark'}>Dark</SettingButtonText>
          </SettingButton>
          
          <SettingButton 
            active={themeMode === 'system'} 
            onPress={() => setThemeMode('system')}
          >
            <SettingButtonText active={themeMode === 'system'}>System</SettingButtonText>
          </SettingButton>
        </SettingRow>
      </SettingsSection>
      
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${props => props.theme.fontSizes.xxxl}px;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const Subtitle = styled.Text`
  font-size: ${props => props.theme.fontSizes.lg}px;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const SettingsSection = styled.View`
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const SectionTitle = styled.Text`
  font-size: ${props => props.theme.fontSizes.xl}px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

interface ActiveProps {
  active: boolean;
}

const SettingButton = styled.TouchableOpacity<ActiveProps>`
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surface};
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.md}px;
  flex: 1;
  margin-horizontal: ${props => props.theme.spacing.xs}px;
  align-items: center;
`;

const SettingButtonText = styled.Text<ActiveProps>`
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  font-weight: ${props => props.active ? props.theme.fontWeights.bold : props.theme.fontWeights.regular};
`;

export default SettingsScreen;
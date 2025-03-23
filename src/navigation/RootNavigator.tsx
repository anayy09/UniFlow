// src/navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types/navigation';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <NavigationContainer
      theme={{
        dark: isDarkMode,
        colors: {
          primary: '#4361EE',
          background: isDarkMode ? '#2B2D42' : '#FFFFFF',
          card: isDarkMode ? '#2B2D42' : '#FFFFFF',
          text: isDarkMode ? '#FFFFFF' : '#2B2D42',
          border: isDarkMode ? '#3A3B50' : '#E0E0E0',
          notification: '#FF006E',
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: 'bold',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: isDarkMode ? '#2B2D42' : '#FFFFFF',
          },
          headerTintColor: isDarkMode ? '#FFFFFF' : '#2B2D42',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <SettingsIcon name="cog" size={24} color={isDarkMode ? '#FFFFFF' : '#2B2D42'} />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ 
            headerTitle: 'UniFlow',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ 
            headerTitle: 'Settings',
            animation: 'slide_from_right',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SettingsIcon = styled(MaterialCommunityIcons)`
  margin-right: 10px;
`;

export default RootNavigator;
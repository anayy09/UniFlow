// src/navigation/TabNavigator.tsx
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { RootTabParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeTab/HomeScreen';
import ScheduleScreen from '../screens/Schedule/ScheduleScreen';
import TasksScreen from '../screens/Tasks/TasksScreen';
import TimerScreen from '../screens/Timer/TimerScreen';
import ProgressScreen from '../screens/Progress/ProgressScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  const { isDarkMode } = useTheme();
  const paperTheme = usePaperTheme();
  const theme = useTheme();
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={theme.isDarkMode ? '#FFFFFF' : '#4361EE'}
      inactiveColor={theme.isDarkMode ? '#AAAAAA' : '#757575'}
      barStyle={{ 
        backgroundColor: theme.isDarkMode ? '#2B2D42' : '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: theme.isDarkMode ? '#3A3B50' : '#E0E0E0',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen} 
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="checkbox-marked-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="Timer" 
        component={TimerScreen} 
        options={{
          tabBarLabel: 'Timer',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="timer" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen} 
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
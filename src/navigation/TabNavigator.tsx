// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import { RootTabParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeTab/HomeScreen';
import ScheduleScreen from '../screens/Schedule/ScheduleScreen';
import TasksScreen from '../screens/Tasks/TasksScreen';
import TimerScreen from '../screens/Timer/TimerScreen';
import ProgressScreen from '../screens/Progress/ProgressScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Schedule':
              iconName = 'calendar';
              break;
            case 'Tasks':
              iconName = 'checkbox-marked-outline';
              break;
            case 'Timer':
              iconName = 'timer';
              break;
            case 'Progress':
              iconName = 'chart-line';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4361EE',
        tabBarInactiveTintColor: isDarkMode ? '#AAAAAA' : '#757575',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#2B2D42' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#3A3B50' : '#E0E0E0',
          borderTopWidth: 1,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{
          tabBarLabel: 'Schedule',
        }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen} 
        options={{
          tabBarLabel: 'Tasks',
        }}
      />
      <Tab.Screen 
        name="Timer" 
        component={TimerScreen} 
        options={{
          tabBarLabel: 'Timer',
        }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen} 
        options={{
          tabBarLabel: 'Progress',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
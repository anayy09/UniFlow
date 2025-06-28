// src/screens/Settings/SettingsScreen.tsx
import React from 'react';
import { ScrollView, StatusBar, Switch, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilState } from 'recoil';
import { useTheme } from '../../context/ThemeContext';
import { userSettingsState } from '../../atoms';
import Typography from '../../components/UI/Typography';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = () => {
  const { isDarkMode, themeMode, setThemeMode } = useTheme();
  const [settings, setSettings] = useRecoilState(userSettingsState);
  
  const updatePomodoroSetting = (key: keyof typeof settings.pomodoroSettings, value: number) => {
    setSettings(prev => ({
      ...prev,
      pomodoroSettings: {
        ...prev.pomodoroSettings,
        [key]: value,
      },
    }));
  };
  
  const updateNotificationSetting = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: enabled,
    }));
  };
  
  const updateDoNotDisturbSetting = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      doNotDisturbHours: {
        ...prev.doNotDisturbHours,
        enabled,
      },
    }));
  };
  
  const resetAllData = () => {
    Alert.alert(
      'Reset All Data',
      'This will delete all your tasks, lectures, and study sessions. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            // Here you would reset all Recoil atoms to their default values
            Alert.alert('Success', 'All data has been reset.');
          },
        },
      ]
    );
  };
  
  const exportData = () => {
    Alert.alert(
      'Export Data',
      'Your data will be exported as a JSON file.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Export', 
          onPress: () => {
            // Here you would implement data export functionality
            Alert.alert('Success', 'Data exported successfully!');
          },
        },
      ]
    );
  };
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Typography variant="h2">Settings</Typography>
          <Typography variant="body1" color={isDarkMode ? '#AAAAAA' : '#757575'}>
            Customize your UniFlow experience
          </Typography>
        </Header>
        
        {/* Theme Settings */}
        <Section>
          <SectionTitle>
            <MaterialCommunityIcons 
              name="palette" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#2B2D42'} 
            />
            <Typography variant="h3">Appearance</Typography>
          </SectionTitle>
          
          <SettingsCard variant="outlined">
            <SettingLabel>
              <Typography variant="body1">Theme</Typography>
              <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                Choose your preferred theme
              </Typography>
            </SettingLabel>
            
            <ThemeButtonRow>
              <ThemeButton 
                active={themeMode === 'light'} 
                onPress={() => setThemeMode('light')}
              >
                <MaterialCommunityIcons 
                  name="white-balance-sunny" 
                  size={20} 
                  color={themeMode === 'light' ? '#FFFFFF' : (isDarkMode ? '#FFFFFF' : '#2B2D42')} 
                />
                <ThemeButtonText active={themeMode === 'light'}>Light</ThemeButtonText>
              </ThemeButton>
              
              <ThemeButton 
                active={themeMode === 'dark'} 
                onPress={() => setThemeMode('dark')}
              >
                <MaterialCommunityIcons 
                  name="moon-waning-crescent" 
                  size={20} 
                  color={themeMode === 'dark' ? '#FFFFFF' : (isDarkMode ? '#FFFFFF' : '#2B2D42')} 
                />
                <ThemeButtonText active={themeMode === 'dark'}>Dark</ThemeButtonText>
              </ThemeButton>
              
              <ThemeButton 
                active={themeMode === 'system'} 
                onPress={() => setThemeMode('system')}
              >
                <MaterialCommunityIcons 
                  name="theme-light-dark" 
                  size={20} 
                  color={themeMode === 'system' ? '#FFFFFF' : (isDarkMode ? '#FFFFFF' : '#2B2D42')} 
                />
                <ThemeButtonText active={themeMode === 'system'}>System</ThemeButtonText>
              </ThemeButton>
            </ThemeButtonRow>
          </SettingsCard>
        </Section>
        
        {/* Notifications */}
        <Section>
          <SectionTitle>
            <MaterialCommunityIcons 
              name="bell" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#2B2D42'} 
            />
            <Typography variant="h3">Notifications</Typography>
          </SectionTitle>
          
          <SettingsCard variant="outlined">
            <SettingRow>
              <SettingLabel>
                <Typography variant="body1">Push Notifications</Typography>
                <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                  Receive reminders for classes and deadlines
                </Typography>
              </SettingLabel>
              
              <Switch
                value={settings.notifications}
                onValueChange={updateNotificationSetting}
                trackColor={{ false: '#767577', true: '#4361EE' }}
                thumbColor={settings.notifications ? '#FFFFFF' : '#f4f3f4'}
              />
            </SettingRow>
            
            <SettingRow>
              <SettingLabel>
                <Typography variant="body1">Do Not Disturb</Typography>
                <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                  Mute notifications during specified hours
                </Typography>
              </SettingLabel>
              
              <Switch
                value={settings.doNotDisturbHours.enabled}
                onValueChange={updateDoNotDisturbSetting}
                trackColor={{ false: '#767577', true: '#4361EE' }}
                thumbColor={settings.doNotDisturbHours.enabled ? '#FFFFFF' : '#f4f3f4'}
              />
            </SettingRow>
            
            {settings.doNotDisturbHours.enabled && (
              <DNDTimeRow>
                <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                  Quiet hours: {settings.doNotDisturbHours.start} - {settings.doNotDisturbHours.end}
                </Typography>
                <Button
                  title="Change"
                  onPress={() => Alert.alert('Time Picker', 'Time picker would open here')}
                  variant="text"
                  size="small"
                />
              </DNDTimeRow>
            )}
          </SettingsCard>
        </Section>
        
        {/* Pomodoro Settings */}
        <Section>
          <SectionTitle>
            <MaterialCommunityIcons 
              name="timer" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#2B2D42'} 
            />
            <Typography variant="h3">Pomodoro Timer</Typography>
          </SectionTitle>
          
          <SettingsCard variant="outlined">
            <PomodoroSetting>
              <SettingLabel>
                <Typography variant="body1">Work Duration</Typography>
                <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                  Focus session length
                </Typography>
              </SettingLabel>
              
              <TimeAdjuster>
                <TimeButton onPress={() => updatePomodoroSetting('workDuration', Math.max(1, settings.pomodoroSettings.workDuration - 5))}>
                  <MaterialCommunityIcons name="minus" size={20} color="#4361EE" />
                </TimeButton>
                
                <TimeValue>
                  <Typography variant="h4" color="#4361EE">
                    {settings.pomodoroSettings.workDuration}m
                  </Typography>
                </TimeValue>
                
                <TimeButton onPress={() => updatePomodoroSetting('workDuration', Math.min(60, settings.pomodoroSettings.workDuration + 5))}>
                  <MaterialCommunityIcons name="plus" size={20} color="#4361EE" />
                </TimeButton>
              </TimeAdjuster>
            </PomodoroSetting>
            
            <PomodoroSetting>
              <SettingLabel>
                <Typography variant="body1">Break Duration</Typography>
                <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                  Short break length
                </Typography>
              </SettingLabel>
              
              <TimeAdjuster>
                <TimeButton onPress={() => updatePomodoroSetting('breakDuration', Math.max(1, settings.pomodoroSettings.breakDuration - 1))}>
                  <MaterialCommunityIcons name="minus" size={20} color="#4361EE" />
                </TimeButton>
                
                <TimeValue>
                  <Typography variant="h4" color="#4361EE">
                    {settings.pomodoroSettings.breakDuration}m
                  </Typography>
                </TimeValue>
                
                <TimeButton onPress={() => updatePomodoroSetting('breakDuration', Math.min(30, settings.pomodoroSettings.breakDuration + 1))}>
                  <MaterialCommunityIcons name="plus" size={20} color="#4361EE" />
                </TimeButton>
              </TimeAdjuster>
            </PomodoroSetting>
            
            <PomodoroSetting>
              <SettingLabel>
                <Typography variant="body1">Long Break</Typography>
                <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                  Extended break length
                </Typography>
              </SettingLabel>
              
              <TimeAdjuster>
                <TimeButton onPress={() => updatePomodoroSetting('longBreakDuration', Math.max(5, settings.pomodoroSettings.longBreakDuration - 5))}>
                  <MaterialCommunityIcons name="minus" size={20} color="#4361EE" />
                </TimeButton>
                
                <TimeValue>
                  <Typography variant="h4" color="#4361EE">
                    {settings.pomodoroSettings.longBreakDuration}m
                  </Typography>
                </TimeValue>
                
                <TimeButton onPress={() => updatePomodoroSetting('longBreakDuration', Math.min(60, settings.pomodoroSettings.longBreakDuration + 5))}>
                  <MaterialCommunityIcons name="plus" size={20} color="#4361EE" />
                </TimeButton>
              </TimeAdjuster>
            </PomodoroSetting>
            
            <PomodoroSetting>
              <SettingLabel>
                <Typography variant="body1">Sessions Before Long Break</Typography>
                <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                  Focus sessions before extended break
                </Typography>
              </SettingLabel>
              
              <TimeAdjuster>
                <TimeButton onPress={() => updatePomodoroSetting('sessionsBeforeLongBreak', Math.max(2, settings.pomodoroSettings.sessionsBeforeLongBreak - 1))}>
                  <MaterialCommunityIcons name="minus" size={20} color="#4361EE" />
                </TimeButton>
                
                <TimeValue>
                  <Typography variant="h4" color="#4361EE">
                    {settings.pomodoroSettings.sessionsBeforeLongBreak}
                  </Typography>
                </TimeValue>
                
                <TimeButton onPress={() => updatePomodoroSetting('sessionsBeforeLongBreak', Math.min(10, settings.pomodoroSettings.sessionsBeforeLongBreak + 1))}>
                  <MaterialCommunityIcons name="plus" size={20} color="#4361EE" />
                </TimeButton>
              </TimeAdjuster>
            </PomodoroSetting>
          </SettingsCard>
        </Section>
        
        {/* Data Management */}
        <Section>
          <SectionTitle>
            <MaterialCommunityIcons 
              name="database" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#2B2D42'} 
            />
            <Typography variant="h3">Data Management</Typography>
          </SectionTitle>
          
          <SettingsCard variant="outlined">
            <ActionButton
              title="Export Data"
              onPress={exportData}
              variant="outline"
              fullWidth
              icon={<MaterialCommunityIcons name="download" size={18} color="#4361EE" />}
            />
            
            <ActionButton
              title="Reset All Data"
              onPress={resetAllData}
              variant="outline"
              fullWidth
              style={{ borderColor: '#FF5252' }}
              icon={<MaterialCommunityIcons name="delete-forever" size={18} color="#FF5252" />}
            />
          </SettingsCard>
        </Section>
        
        {/* About */}
        <Section>
          <SectionTitle>
            <MaterialCommunityIcons 
              name="information" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#2B2D42'} 
            />
            <Typography variant="h3">About</Typography>
          </SectionTitle>
          
          <SettingsCard variant="outlined">
            <AboutRow>
              <Typography variant="body1">Version</Typography>
              <Typography variant="body2" color="#4361EE">1.0.0</Typography>
            </AboutRow>
            
            <AboutRow>
              <Typography variant="body1">Build</Typography>
              <Typography variant="body2" color="#4361EE">Beta</Typography>
            </AboutRow>
            
            <AboutRow>
              <Typography variant="body1">Developer</Typography>
              <Typography variant="body2" color="#4361EE">UniFlow Team</Typography>
            </AboutRow>
            
            <ActionButton
              title="Rate App"
              onPress={() => Alert.alert('Rate App', 'This would open the app store rating')}
              variant="text"
              fullWidth
              icon={<MaterialCommunityIcons name="star" size={18} color="#4361EE" />}
            />
            
            <ActionButton
              title="Send Feedback"
              onPress={() => Alert.alert('Feedback', 'This would open the feedback form')}
              variant="text"
              fullWidth
              icon={<MaterialCommunityIcons name="message-text" size={18} color="#4361EE" />}
            />
          </SettingsCard>
        </Section>
      </ScrollView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Header = styled.View`
  padding: ${props => props.theme.spacing.lg}px;
  padding-bottom: ${props => props.theme.spacing.md}px;
  align-items: center;
`;

const Section = styled.View`
  padding-horizontal: ${props => props.theme.spacing.lg}px;
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const SectionTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md}px;
  gap: ${props => props.theme.spacing.sm}px;
`;

const SettingsCard = styled(Card)``;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const SettingLabel = styled.View`
  flex: 1;
  margin-right: ${props => props.theme.spacing.md}px;
`;

const ThemeButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.md}px;
  gap: ${props => props.theme.spacing.sm}px;
`;

interface ThemeButtonProps {
  active: boolean;
}

const ThemeButton = styled.TouchableOpacity<ThemeButtonProps>`
  flex: 1;
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surface};
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.md}px;
  align-items: center;
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  flex-direction: row;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs}px;
`;

const ThemeButtonText = styled.Text<ThemeButtonProps>`
  color: ${props => props.active ? '#FFFFFF' : props.theme.colors.text};
  font-weight: ${props => props.active ? props.theme.fontWeights.bold : props.theme.fontWeights.regular};
  font-size: ${props => props.theme.fontSizes.sm}px;
`;

const DNDTimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.sm}px;
  padding-top: ${props => props.theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.border};
`;

const PomodoroSetting = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg}px;
`;

const TimeAdjuster = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${props => props.theme.spacing.md}px;
`;

const TimeButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${props => props.theme.colors.surface};
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.border};
`;

const TimeValue = styled.View`
  min-width: 50px;
  align-items: center;
`;

const ActionButton = styled(Button)`
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const AboutRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

export default SettingsScreen;
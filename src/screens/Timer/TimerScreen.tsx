// src/screens/Timer/TimerScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StatusBar, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTheme } from '../../context/ThemeContext';
import { timerState, userSettingsState, studySessionsState } from '../../atoms';
import Typography from '../../components/UI/Typography';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TimerScreen = () => {
  const { isDarkMode } = useTheme();
  const [timer, setTimer] = useRecoilState(timerState);
  const [studySessions, setStudySessions] = useRecoilState(studySessionsState);
  const settings = useRecoilValue(userSettingsState);
  const [currentSubject, setCurrentSubject] = useState('General Study');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartRef = useRef<Date | null>(null);
  
  const { pomodoroSettings } = settings;
  
  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev.timeRemaining <= 1) {
            // Timer finished
            handleTimerComplete();
            return {
              ...prev,
              isRunning: false,
              timeRemaining: 0,
            };
          }
          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isRunning]);
  
  const handleTimerComplete = () => {
    // Create study session if it was a work session
    if (!timer.isBreak && sessionStartRef.current) {
      const newSession = {
        id: Date.now().toString(),
        startTime: sessionStartRef.current,
        endTime: new Date(),
        duration: pomodoroSettings.workDuration,
        subject: currentSubject,
        breaks: 0, // Will be updated when breaks are taken
      };
      
      setStudySessions(prev => [...prev, newSession]);
    }
    
    // Show completion alert
    Alert.alert(
      timer.isBreak ? 'Break Complete!' : 'Session Complete!',
      timer.isBreak 
        ? 'Time to get back to work!' 
        : 'Great job! Time for a break.',
      [{ text: 'OK', onPress: () => moveToNextPhase() }]
    );
  };
  
  const moveToNextPhase = () => {
    const isLongBreakTime = timer.currentSession % pomodoroSettings.sessionsBeforeLongBreak === 0;
    
    if (timer.isBreak) {
      // Moving from break to work
      setTimer(prev => ({
        ...prev,
        isBreak: false,
        timeRemaining: pomodoroSettings.workDuration * 60,
        currentSession: prev.currentSession + 1,
      }));
    } else {
      // Moving from work to break
      const breakDuration = isLongBreakTime 
        ? pomodoroSettings.longBreakDuration 
        : pomodoroSettings.breakDuration;
        
      setTimer(prev => ({
        ...prev,
        isBreak: true,
        timeRemaining: breakDuration * 60,
        totalSessions: prev.totalSessions + 1,
      }));
    }
  };
  
  const startTimer = () => {
    if (!timer.isBreak) {
      sessionStartRef.current = new Date();
    }
    
    setTimer(prev => ({ ...prev, isRunning: true }));
  };
  
  const pauseTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: false }));
  };
  
  const resetTimer = () => {
    setTimer(prev => ({
      ...prev,
      isRunning: false,
      timeRemaining: prev.isBreak 
        ? pomodoroSettings.breakDuration * 60 
        : pomodoroSettings.workDuration * 60,
    }));
    sessionStartRef.current = null;
  };
  
  const resetSession = () => {
    setTimer({
      isRunning: false,
      timeRemaining: pomodoroSettings.workDuration * 60,
      currentSession: 1,
      isBreak: false,
      totalSessions: 0,
    });
    sessionStartRef.current = null;
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getProgressPercentage = () => {
    const totalTime = timer.isBreak 
      ? (timer.currentSession % pomodoroSettings.sessionsBeforeLongBreak === 0 
          ? pomodoroSettings.longBreakDuration 
          : pomodoroSettings.breakDuration) * 60
      : pomodoroSettings.workDuration * 60;
    
    return ((totalTime - timer.timeRemaining) / totalTime) * 100;
  };
  
  const subjects = ['General Study', 'Psychology', 'Mathematics', 'Computer Science', 'Physics', 'Chemistry'];
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Typography variant="h2">
            {timer.isBreak ? 'Break Time' : 'Focus Time'}
          </Typography>
          <Typography variant="body1" color={isDarkMode ? '#AAAAAA' : '#757575'}>
            Session {timer.currentSession} • {timer.totalSessions} completed today
          </Typography>
        </Header>
        
        {/* Timer Display */}
        <TimerCard variant="elevated">
          <TimerCircle isBreak={timer.isBreak} progress={getProgressPercentage()}>
            <TimerTime>
              <Typography variant="h1" align="center" color={timer.isBreak ? '#FF006E' : '#4361EE'}>
                {formatTime(timer.timeRemaining)}
              </Typography>
              <Typography variant="body1" align="center">
                {timer.isBreak ? 'Break' : currentSubject}
              </Typography>
            </TimerTime>
          </TimerCircle>
          
          <TimerControls>
            {!timer.isRunning ? (
              <Button
                title="Start"
                onPress={startTimer}
                variant="primary"
                size="large"
                icon={<MaterialCommunityIcons name="play" size={24} color="#FFFFFF" />}
              />
            ) : (
              <Button
                title="Pause"
                onPress={pauseTimer}
                variant="secondary"
                size="large"
                icon={<MaterialCommunityIcons name="pause" size={24} color="#FFFFFF" />}
              />
            )}
            
            <Button
              title="Reset"
              onPress={resetTimer}
              variant="outline"
              size="large"
              icon={<MaterialCommunityIcons name="refresh" size={24} color="#4361EE" />}
            />
          </TimerControls>
        </TimerCard>
        
        {/* Subject Selection */}
        {!timer.isBreak && (
          <Section>
            <Typography variant="h3">Subject</Typography>
            <SubjectGrid>
              {subjects.map((subject) => (
                <SubjectButton
                  key={subject}
                  isSelected={currentSubject === subject}
                  onPress={() => setCurrentSubject(subject)}
                  disabled={timer.isRunning}
                >
                  <Typography 
                    variant="body2" 
                    color={currentSubject === subject ? '#FFFFFF' : undefined}
                  >
                    {subject}
                  </Typography>
                </SubjectButton>
              ))}
            </SubjectGrid>
          </Section>
        )}
        
        {/* Statistics */}
        <Section>
          <Typography variant="h3">Today's Progress</Typography>
          <StatsCard variant="filled">
            <StatsRow>
              <StatItem>
                <Typography variant="h2" color="#4361EE">
                  {timer.totalSessions}
                </Typography>
                <Typography variant="caption">Sessions</Typography>
              </StatItem>
              
              <StatItem>
                <Typography variant="h2" color="#FF006E">
                  {Math.round(timer.totalSessions * pomodoroSettings.workDuration / 60 * 10) / 10}
                </Typography>
                <Typography variant="caption">Hours</Typography>
              </StatItem>
              
              <StatItem>
                <Typography variant="h2" color="#B5E48C">
                  {studySessions.filter(s => {
                    const today = new Date();
                    return s.startTime.toDateString() === today.toDateString();
                  }).length}
                </Typography>
                <Typography variant="caption">Completed</Typography>
              </StatItem>
            </StatsRow>
          </StatsCard>
        </Section>
        
        {/* Settings Preview */}
        <Section>
          <Typography variant="h3">Timer Settings</Typography>
          <SettingsCard variant="outlined">
            <SettingRow>
              <Typography variant="body1">Work Duration</Typography>
              <Typography variant="body1" color="#4361EE">
                {pomodoroSettings.workDuration} min
              </Typography>
            </SettingRow>
            
            <SettingRow>
              <Typography variant="body1">Break Duration</Typography>
              <Typography variant="body1" color="#4361EE">
                {pomodoroSettings.breakDuration} min
              </Typography>
            </SettingRow>
            
            <SettingRow>
              <Typography variant="body1">Long Break</Typography>
              <Typography variant="body1" color="#4361EE">
                {pomodoroSettings.longBreakDuration} min
              </Typography>
            </SettingRow>
            
            <SettingRow>
              <Typography variant="body1">Sessions before Long Break</Typography>
              <Typography variant="body1" color="#4361EE">
                {pomodoroSettings.sessionsBeforeLongBreak}
              </Typography>
            </SettingRow>
          </SettingsCard>
        </Section>
        
        {/* Action Buttons */}
        <Section>
          <Button
            title="Reset Session"
            onPress={resetSession}
            variant="text"
            fullWidth
            icon={<MaterialCommunityIcons name="restart" size={18} color="#4361EE" />}
          />
          <Button
            title="View History"
            onPress={() => {}}
            variant="outline"
            fullWidth
            icon={<MaterialCommunityIcons name="history" size={18} color="#4361EE" />}
          />
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

const TimerCard = styled(Card)`
  margin: ${props => props.theme.spacing.lg}px;
  align-items: center;
  padding: ${props => props.theme.spacing.xxl}px;
`;

interface TimerCircleProps {
  isBreak: boolean;
  progress: number;
}

const TimerCircle = styled.View<TimerCircleProps>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 8px solid ${props => props.isBreak ? '#FF006E' : '#4361EE'};
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.xl}px;
  opacity: ${props => 0.1 + (props.progress / 100) * 0.9};
`;

const TimerTime = styled.View`
  align-items: center;
`;

const TimerControls = styled.View`
  flex-direction: row;
  gap: ${props => props.theme.spacing.md}px;
`;

const Section = styled.View`
  padding-horizontal: ${props => props.theme.spacing.lg}px;
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const SubjectGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm}px;
`;

interface SubjectButtonProps {
  isSelected: boolean;
  disabled: boolean;
}

const SubjectButton = styled.TouchableOpacity<SubjectButtonProps>`
  background-color: ${props => 
    props.isSelected ? props.theme.colors.primary : props.theme.colors.surface
  };
  border-radius: ${props => props.theme.borderRadius.pill}px;
  padding: ${props => props.theme.spacing.sm}px ${props => props.theme.spacing.md}px;
  border: 1px solid ${props => 
    props.isSelected ? props.theme.colors.primary : props.theme.colors.border
  };
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const StatsCard = styled(Card)``;

const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const StatItem = styled.View`
  align-items: center;
`;

const SettingsCard = styled(Card)``;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

export default TimerScreen;
// src/screens/HomeTab/HomeScreen.tsx
import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { format, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import { lecturesState, tasksState, studySessionsState, timerState } from '../../atoms';
import Typography from '../../components/UI/Typography';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import ProgressBar from '../../components/UI/ProgressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const { isDarkMode } = useTheme();
  const lectures = useRecoilValue(lecturesState);
  const tasks = useRecoilValue(tasksState);
  const studySessions = useRecoilValue(studySessionsState);
  const timer = useRecoilValue(timerState);
  
  // Filter today's lectures
  const todaysLectures = [...lectures]
    .filter(lecture => isToday(lecture.startTime))
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 2); // Show only next 2 lectures
  
  // Filter urgent/upcoming tasks
  const urgentTasks = [...tasks]
    .filter(task => !task.completed)
    .filter(task => {
      if (!task.deadline) return false;
      const daysUntil = differenceInDays(task.deadline, new Date());
      return daysUntil <= 7; // Tasks due within a week
    })
    .sort((a, b) => {
      // Sort by deadline, then by priority
      if (a.deadline && b.deadline) {
        const deadlineDiff = a.deadline.getTime() - b.deadline.getTime();
        if (deadlineDiff !== 0) return deadlineDiff;
      }
      
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3); // Show only top 3 urgent tasks
  
  // Calculate today's study stats
  const todaysSessions = studySessions.filter(session => 
    isToday(session.startTime)
  );
  
  const todaysHours = todaysSessions.reduce((total, session) => total + session.duration, 0) / 60;
  const todaysSessionCount = todaysSessions.length + timer.totalSessions;
  
  // Calculate this week's completed tasks
  const thisWeekCompletedTasks = tasks.filter(task => {
    if (!task.completed) return false;
    // Note: This is simplified - in a real app, you'd track completion dates
    return true;
  }).length;
  
  const getDeadlineText = (deadline: Date) => {
    if (isToday(deadline)) return 'Due today';
    if (isTomorrow(deadline)) return 'Due tomorrow';
    
    const daysUntil = differenceInDays(deadline, new Date());
    if (daysUntil < 0) return `Overdue`;
    if (daysUntil <= 7) return `Due in ${daysUntil} day${daysUntil > 1 ? 's' : ''}`;
    
    return `Due ${format(deadline, 'MMM dd')}`;
  };
  
  const getDeadlineColor = (deadline: Date) => {
    const daysUntil = differenceInDays(deadline, new Date());
    
    if (daysUntil < 0) return '#FF5252'; // Overdue - red
    if (daysUntil <= 1) return '#FF9800'; // Due soon - orange
    if (daysUntil <= 3) return '#FFC107'; // Due this week - yellow
    
    return undefined;
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return '🔥';
      case 'high': return '🚀';
      case 'medium': return '⚡';
      case 'low': return '🌱';
      default: return '📝';
    }
  };
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Typography variant="h1">Welcome to UniFlow</Typography>
          <Typography variant="body1">Your campus companion</Typography>
        </Header>
        
        {/* Today's Schedule */}
        <Section>
          <SectionHeader>
            <Typography variant="h3">Today's Schedule</Typography>
            <Button 
              title="View All" 
              onPress={() => {}} 
              variant="text" 
              size="small"
              icon={<MaterialCommunityIcons name="calendar" size={16} color="#4361EE" />}
            />
          </SectionHeader>
          
          {todaysLectures.length === 0 ? (
            <Card variant="outlined">
              <EmptyStateContainer>
                <MaterialCommunityIcons 
                  name="calendar-blank" 
                  size={48} 
                  color={isDarkMode ? '#AAAAAA' : '#CED4DA'} 
                />
                <Typography variant="h4" color={isDarkMode ? '#AAAAAA' : '#CED4DA'}>
                  No classes today
                </Typography>
                <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#CED4DA'}>
                  Enjoy your free day!
                </Typography>
              </EmptyStateContainer>
            </Card>
          ) : (
            todaysLectures.map((lecture) => (
              <Card key={lecture.id} variant="elevated">
                <LectureHeader>
                  <LectureColorIndicator color={lecture.color} />
                  <LectureInfo>
                    <Typography variant="h4">{lecture.title}</Typography>
                    <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                      {lecture.professor}
                    </Typography>
                  </LectureInfo>
                </LectureHeader>
                
                <LectureDetails>
                  <DetailRow>
                    <MaterialCommunityIcons 
                      name="clock-outline" 
                      size={16} 
                      color={isDarkMode ? '#AAAAAA' : '#757575'} 
                    />
                    <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                      {format(lecture.startTime, 'h:mm a')} - {format(lecture.endTime, 'h:mm a')}
                    </Typography>
                  </DetailRow>
                  
                  <DetailRow>
                    <MaterialCommunityIcons 
                      name="map-marker-outline" 
                      size={16} 
                      color={isDarkMode ? '#AAAAAA' : '#757575'} 
                    />
                    <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                      {lecture.location}
                    </Typography>
                  </DetailRow>
                  
                  {lecture.notes && (
                    <DetailRow>
                      <MaterialCommunityIcons 
                        name="note-text-outline" 
                        size={16} 
                        color={isDarkMode ? '#AAAAAA' : '#757575'} 
                      />
                      <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                        {lecture.notes}
                      </Typography>
                    </DetailRow>
                  )}
                </LectureDetails>
                
                <ButtonRow>
                  <Button 
                    title="View Details" 
                    onPress={() => {}} 
                    variant="outline" 
                    size="small"
                    icon={<MaterialCommunityIcons name="information-outline" size={16} color="#4361EE" />}
                  />
                </ButtonRow>
              </Card>
            ))
          )}
        </Section>
        
        {/* Upcoming Deadlines */}
        <Section>
          <SectionHeader>
            <Typography variant="h3">Upcoming Deadlines</Typography>
            <Button 
              title="View All" 
              onPress={() => {}} 
              variant="text" 
              size="small"
              icon={<MaterialCommunityIcons name="checkbox-marked-outline" size={16} color="#4361EE" />}
            />
          </SectionHeader>
          
          {urgentTasks.length === 0 ? (
            <Card variant="outlined">
              <EmptyStateContainer>
                <MaterialCommunityIcons 
                  name="checkbox-marked-circle-outline" 
                  size={48} 
                  color={isDarkMode ? '#AAAAAA' : '#CED4DA'} 
                />
                <Typography variant="h4" color={isDarkMode ? '#AAAAAA' : '#CED4DA'}>
                  No urgent deadlines
                </Typography>
                <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#CED4DA'}>
                  You're all caught up!
                </Typography>
              </EmptyStateContainer>
            </Card>
          ) : (
            urgentTasks.map((task) => (
              <Card key={task.id} variant="outlined">
                <TaskHeader>
                  <PriorityBadge priority={task.priority}>
                    <Typography variant="caption" color="#FFFFFF">
                      {getPriorityIcon(task.priority)} {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </Typography>
                  </PriorityBadge>
                  {task.deadline && (
                    <DeadlineIndicator color={getDeadlineColor(task.deadline)}>
                      <Typography variant="caption" color={getDeadlineColor(task.deadline)}>
                        {getDeadlineText(task.deadline)}
                      </Typography>
                    </DeadlineIndicator>
                  )}
                </TaskHeader>
                
                <Typography variant="h4">{task.title}</Typography>
                {task.description && (
                  <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                    {task.description}
                  </Typography>
                )}
                
                <ProgressSection>
                  <ProgressBar progress={task.progress} />
                  <ProgressText>
                    <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                      {task.progress}% Complete
                    </Typography>
                  </ProgressText>
                </ProgressSection>
              </Card>
            ))
          )}
        </Section>
        
        {/* Study Stats */}
        <Section>
          <Typography variant="h3">Study Stats</Typography>
          <Card variant="filled">
            <Typography variant="h4">Today</Typography>
            <StatsRow>
              <StatItem>
                <Typography variant="h2" color="#4361EE">
                  {Math.round(todaysHours * 10) / 10}
                </Typography>
                <Typography variant="caption">Hours</Typography>
              </StatItem>
              <StatItem>
                <Typography variant="h2" color="#FF006E">
                  {todaysSessionCount}
                </Typography>
                <Typography variant="caption">Sessions</Typography>
              </StatItem>
              <StatItem>
                <Typography variant="h2" color="#B5E48C">
                  {thisWeekCompletedTasks}
                </Typography>
                <Typography variant="caption">Tasks Done</Typography>
              </StatItem>
            </StatsRow>
          </Card>
          
          <ButtonContainer>
            <Button 
              title="Start Study Session" 
              onPress={() => {}}
              variant="primary" 
              fullWidth
              icon={<MaterialCommunityIcons name="timer" size={18} color="#FFFFFF" />}
            />
          </ButtonContainer>
        </Section>
      </ScrollView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg}px;
`;

const Header = styled.View`
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const Section = styled.View`
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const EmptyStateContainer = styled.View`
  align-items: center;
  padding: ${props => props.theme.spacing.xl}px;
`;

const LectureHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const LectureColorIndicator = styled.View<{ color: string }>`
  width: 4px;
  height: 40px;
  background-color: ${props => props.color};
  border-radius: 2px;
  margin-right: ${props => props.theme.spacing.md}px;
`;

const LectureInfo = styled.View`
  flex: 1;
`;

const LectureDetails = styled.View`
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.md}px;
`;

const TaskHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

interface PriorityBadgeProps {
  priority: 'urgent' | 'high' | 'medium' | 'low';
}

const PriorityBadge = styled.View<PriorityBadgeProps>`
  background-color: ${props => {
    switch (props.priority) {
      case 'urgent':
        return '#FF006E';
      case 'high':
        return '#FB5607';
      case 'medium':
        return '#FFBE0B';
      case 'low':
        return '#8338EC';
      default:
        return '#8338EC';
    }
  }};
  border-radius: ${props => props.theme.borderRadius.pill}px;
  padding-horizontal: ${props => props.theme.spacing.sm}px;
  padding-vertical: ${props => props.theme.spacing.xs}px;
`;

const DeadlineIndicator = styled.View<{ color?: string }>`
  background-color: ${props => props.color ? `${props.color}20` : 'transparent'};
  border: 1px solid ${props => props.color || props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.pill}px;
  padding-horizontal: ${props => props.theme.spacing.sm}px;
  padding-vertical: ${props => props.theme.spacing.xs}px;
`;

const ProgressSection = styled.View`
  margin-top: ${props => props.theme.spacing.md}px;
`;

const ProgressText = styled.View`
  margin-top: ${props => props.theme.spacing.xs}px;
`;

const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.md}px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const ButtonContainer = styled.View`
  margin-top: ${props => props.theme.spacing.md}px;
`;

export default HomeScreen;
// src/screens/Progress/ProgressScreen.tsx
import React, { useMemo } from 'react';
import { ScrollView, StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { format, startOfWeek, endOfWeek, isWithinInterval, subWeeks } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import { tasksState, studySessionsState, timerState } from '../../atoms';
import Typography from '../../components/UI/Typography';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import ProgressBar from '../../components/UI/ProgressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ProgressScreen = () => {
  const { isDarkMode } = useTheme();
  const tasks = useRecoilValue(tasksState);
  const studySessions = useRecoilValue(studySessionsState);
  const timer = useRecoilValue(timerState);
  
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  
  const stats = useMemo(() => {
    // Today's stats
    const todaySessions = studySessions.filter(s => 
      s.startTime.toDateString() === now.toDateString()
    );
    
    const todayHours = todaySessions.reduce((total, session) => total + session.duration, 0) / 60;
    
    // This week's stats
    const thisWeekSessions = studySessions.filter(s =>
      isWithinInterval(s.startTime, { start: weekStart, end: weekEnd })
    );
    
    const weekHours = thisWeekSessions.reduce((total, session) => total + session.duration, 0) / 60;
    
    // Task completion stats
    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    // Average session length
    const avgSessionLength = studySessions.length > 0 
      ? studySessions.reduce((total, session) => total + session.duration, 0) / studySessions.length
      : 0;
    
    // Most productive day
    const sessionsByDay = studySessions.reduce((acc, session) => {
      const day = session.startTime.toDateString();
      acc[day] = (acc[day] || 0) + session.duration;
      return acc;
    }, {} as Record<string, number>);
    
    const mostProductiveDay = Object.entries(sessionsByDay)
      .sort(([,a], [,b]) => b - a)[0];
    
    // Subject breakdown
    const subjectBreakdown = studySessions.reduce((acc, session) => {
      const subject = session.subject || 'General';
      acc[subject] = (acc[subject] || 0) + session.duration;
      return acc;
    }, {} as Record<string, number>);
    
    // Weekly progress (last 4 weeks)
    const weeklyData = Array.from({ length: 4 }, (_, i) => {
      const weekStartDate = subWeeks(weekStart, 3 - i);
      const weekEndDate = endOfWeek(weekStartDate, { weekStartsOn: 1 });
      
      const weekSessions = studySessions.filter(s =>
        isWithinInterval(s.startTime, { start: weekStartDate, end: weekEndDate })
      );
      
      const hours = weekSessions.reduce((total, session) => total + session.duration, 0) / 60;
      
      return {
        week: `Week ${i + 1}`,
        date: format(weekStartDate, 'MMM dd'),
        hours: Math.round(hours * 10) / 10,
      };
    });
    
    return {
      todayHours: Math.round(todayHours * 10) / 10,
      weekHours: Math.round(weekHours * 10) / 10,
      completedTasks,
      totalTasks,
      taskCompletionRate: Math.round(taskCompletionRate),
      avgSessionLength: Math.round(avgSessionLength),
      mostProductiveDay: mostProductiveDay 
        ? { date: mostProductiveDay[0], hours: Math.round(mostProductiveDay[1] / 60 * 10) / 10 }
        : null,
      subjectBreakdown,
      weeklyData,
      totalSessions: studySessions.length,
      currentStreak: timer.totalSessions,
    };
  }, [tasks, studySessions, timer, now, weekStart, weekEnd]);
  
  const achievements = [
    {
      id: 'first_session',
      title: 'First Steps',
      description: 'Complete your first study session',
      icon: '🎯',
      completed: stats.totalSessions > 0,
    },
    {
      id: 'week_warrior',
      title: 'Week Warrior',
      description: 'Study for 10 hours in a week',
      icon: '⚡',
      completed: stats.weekHours >= 10,
    },
    {
      id: 'task_master',
      title: 'Task Master',
      description: 'Complete 10 tasks',
      icon: '✅',
      completed: stats.completedTasks >= 10,
    },
    {
      id: 'consistency_king',
      title: 'Consistency King',
      description: 'Study for 7 days straight',
      icon: '🔥',
      completed: false, // Would need streak tracking
    },
    {
      id: 'focus_master',
      title: 'Focus Master',
      description: 'Complete 25 pomodoro sessions',
      icon: '🧘',
      completed: stats.totalSessions >= 25,
    },
  ];
  
  const completedAchievements = achievements.filter(a => a.completed);
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Typography variant="h2">Progress</Typography>
          <Typography variant="body1" color={isDarkMode ? '#AAAAAA' : '#757575'}>
            Track your study journey
          </Typography>
        </Header>
        
        {/* Overview Stats */}
        <Section>
          <Typography variant="h3">Today's Overview</Typography>
          <StatsGrid>
            <StatCard variant="filled">
              <StatIcon>📚</StatIcon>
              <Typography variant="h2" color="#4361EE">
                {stats.todayHours}
              </Typography>
              <Typography variant="caption">Hours Today</Typography>
            </StatCard>
            
            <StatCard variant="filled">
              <StatIcon>✅</StatIcon>
              <Typography variant="h2" color="#B5E48C">
                {stats.completedTasks}
              </Typography>
              <Typography variant="caption">Tasks Done</Typography>
            </StatCard>
            
            <StatCard variant="filled">
              <StatIcon>🎯</StatIcon>
              <Typography variant="h2" color="#FF006E">
                {stats.currentStreak}
              </Typography>
              <Typography variant="caption">Sessions</Typography>
            </StatCard>
          </StatsGrid>
        </Section>
        
        {/* Weekly Progress */}
        <Section>
          <Typography variant="h3">Weekly Progress</Typography>
          <Card variant="elevated">
            <WeeklyChart>
              {stats.weeklyData.map((week, index) => (
                <WeeklyBar key={index}>
                  <BarContainer>
                    <Bar height={Math.max(week.hours / 20 * 100, 5)} />
                  </BarContainer>
                  <Typography variant="caption" align="center">
                    {week.week}
                  </Typography>
                  <Typography variant="caption" align="center" color="#4361EE">
                    {week.hours}h
                  </Typography>
                </WeeklyBar>
              ))}
            </WeeklyChart>
            
            <WeekSummary>
              <Typography variant="body1">
                This week: <Typography variant="body1" weight="bold" color="#4361EE">
                  {stats.weekHours} hours
                </Typography>
              </Typography>
              <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                {stats.weekHours > 0 
                  ? `Average ${Math.round(stats.weekHours / 7 * 10) / 10} hours per day`
                  : 'No study time recorded this week'
                }
              </Typography>
            </WeekSummary>
          </Card>
        </Section>
        
        {/* Task Progress */}
        <Section>
          <Typography variant="h3">Task Completion</Typography>
          <Card variant="outlined">
            <TaskProgressHeader>
              <Typography variant="h4">
                {stats.completedTasks} of {stats.totalTasks} tasks completed
              </Typography>
              <Typography variant="h3" color="#4361EE">
                {stats.taskCompletionRate}%
              </Typography>
            </TaskProgressHeader>
            
            <ProgressBar progress={stats.taskCompletionRate} height={12} />
            
            <TaskBreakdown>
              <TaskStat>
                <Typography variant="caption">Urgent</Typography>
                <Typography variant="body2" color="#FF006E">
                  {tasks.filter(t => t.priority === 'urgent' && t.completed).length}/
                  {tasks.filter(t => t.priority === 'urgent').length}
                </Typography>
              </TaskStat>
              
              <TaskStat>
                <Typography variant="caption">High</Typography>
                <Typography variant="body2" color="#FF9800">
                  {tasks.filter(t => t.priority === 'high' && t.completed).length}/
                  {tasks.filter(t => t.priority === 'high').length}
                </Typography>
              </TaskStat>
              
              <TaskStat>
                <Typography variant="caption">Medium</Typography>
                <Typography variant="body2" color="#FFC107">
                  {tasks.filter(t => t.priority === 'medium' && t.completed).length}/
                  {tasks.filter(t => t.priority === 'medium').length}
                </Typography>
              </TaskStat>
              
              <TaskStat>
                <Typography variant="caption">Low</Typography>
                <Typography variant="body2" color="#8338EC">
                  {tasks.filter(t => t.priority === 'low' && t.completed).length}/
                  {tasks.filter(t => t.priority === 'low').length}
                </Typography>
              </TaskStat>
            </TaskBreakdown>
          </Card>
        </Section>
        
        {/* Subject Breakdown */}
        {Object.keys(stats.subjectBreakdown).length > 0 && (
          <Section>
            <Typography variant="h3">Study Time by Subject</Typography>
            <Card variant="filled">
              {Object.entries(stats.subjectBreakdown)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([subject, minutes]) => (
                  <SubjectRow key={subject}>
                    <Typography variant="body1">{subject}</Typography>
                    <SubjectTime>
                      <Typography variant="body2" color="#4361EE">
                        {Math.round(minutes / 60 * 10) / 10}h
                      </Typography>
                      <ProgressBar 
                        progress={(minutes / Math.max(...Object.values(stats.subjectBreakdown))) * 100} 
                        height={4}
                      />
                    </SubjectTime>
                  </SubjectRow>
                ))}
            </Card>
          </Section>
        )}
        
        {/* Achievements */}
        <Section>
          <Typography variant="h3">Achievements</Typography>
          <AchievementGrid>
            {achievements.map((achievement) => (
              <AchievementCard 
                key={achievement.id} 
                variant="outlined"
                completed={achievement.completed}
              >
                <AchievementIcon completed={achievement.completed}>
                  <Typography variant="h3">{achievement.icon}</Typography>
                </AchievementIcon>
                <Typography variant="body2" weight="medium">
                  {achievement.title}
                </Typography>
                <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                  {achievement.description}
                </Typography>
              </AchievementCard>
            ))}
          </AchievementGrid>
        </Section>
        
        {/* Quick Stats */}
        <Section>
          <Typography variant="h3">Quick Stats</Typography>
          <Card variant="outlined">
            <QuickStat>
              <Typography variant="body1">Total Study Sessions</Typography>
              <Typography variant="body1" color="#4361EE">{stats.totalSessions}</Typography>
            </QuickStat>
            
            <QuickStat>
              <Typography variant="body1">Average Session Length</Typography>
              <Typography variant="body1" color="#4361EE">{stats.avgSessionLength} min</Typography>
            </QuickStat>
            
            {stats.mostProductiveDay && (
              <QuickStat>
                <Typography variant="body1">Most Productive Day</Typography>
                <Typography variant="body2" color="#4361EE">
                  {format(new Date(stats.mostProductiveDay.date), 'MMM dd')} ({stats.mostProductiveDay.hours}h)
                </Typography>
              </QuickStat>
            )}
          </Card>
        </Section>
        
        {/* Action Buttons */}
        <Section>
          <Button
            title="View Detailed Reports"
            onPress={() => {}}
            variant="primary"
            fullWidth
            icon={<MaterialCommunityIcons name="chart-line" size={18} color="#FFFFFF" />}
          />
          <Button
            title="Export Data"
            onPress={() => {}}
            variant="outline"
            fullWidth
            icon={<MaterialCommunityIcons name="download" size={18} color="#4361EE" />}
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

const Section = styled.View`
  padding-horizontal: ${props => props.theme.spacing.lg}px;
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const StatsGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.sm}px;
`;

const StatCard = styled(Card)`
  flex: 1;
  align-items: center;
  padding: ${props => props.theme.spacing.md}px;
`;

const StatIcon = styled.Text`
  font-size: 24px;
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const WeeklyChart = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 120px;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const WeeklyBar = styled.View`
  flex: 1;
  align-items: center;
  margin-horizontal: ${props => props.theme.spacing.xs}px;
`;

const BarContainer = styled.View`
  height: 80px;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

interface BarProps {
  height: number;
}

const Bar = styled.View<BarProps>`
  width: 24px;
  height: ${props => props.height}%;
  background-color: #4361EE;
  border-radius: 4px;
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const WeekSummary = styled.View`
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.border};
  padding-top: ${props => props.theme.spacing.md}px;
`;

const TaskProgressHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const TaskBreakdown = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.md}px;
`;

const TaskStat = styled.View`
  align-items: center;
`;

const SubjectRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const SubjectTime = styled.View`
  align-items: flex-end;
  width: 60px;
`;

const AchievementGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm}px;
`;

interface AchievementCardProps {
  completed: boolean;
}

const AchievementCard = styled(Card)<AchievementCardProps>`
  width: ${(width - 48 - 8) / 2}px;
  align-items: center;
  opacity: ${props => props.completed ? 1 : 0.6};
`;

const AchievementIcon = styled.View<{ completed: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${props => props.completed ? props.theme.colors.primary : props.theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const QuickStat = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

export default ProgressScreen;
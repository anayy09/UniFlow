// src/screens/HomeTab/HomeScreen.tsx
import React from 'react';
import { StatusBar, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '../../context/ThemeContext';
import Typography from '../../components/UI/Typography';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import ProgressBar from '../../components/UI/ProgressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Typography variant="h1">Welcome to UniFlow</Typography>
          <Typography variant="body1">Your campus companion</Typography>
        </Header>
        
        <Section>
          <Typography variant="h3">Today's Schedule</Typography>
          <Card variant="elevated">
            <Typography variant="h4">Introduction to Psychology</Typography>
            <Typography variant="body2">10:00 AM - 11:30 AM</Typography>
            <Typography variant="caption">Room 302, Science Building</Typography>
            
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
          
          <Card variant="elevated">
            <Typography variant="h4">Calculus II</Typography>
            <Typography variant="body2">1:00 PM - 2:30 PM</Typography>
            <Typography variant="caption">Room 105, Math Building</Typography>
            
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
          
          <Button 
            title="View Full Schedule" 
            onPress={() => {}} 
            variant="text" 
            icon={<MaterialCommunityIcons name="calendar" size={18} color="#4361EE" />}
          />
        </Section>
        
        <Section>
          <Typography variant="h3">Upcoming Deadlines</Typography>
          <Card variant="outlined">
            <PriorityBadge priority="urgent">
              <Typography variant="caption" color="#FFFFFF">🔥 Urgent</Typography>
            </PriorityBadge>
            <Typography variant="h4">Psychology Essay</Typography>
            <Typography variant="body2">Due in 2 days</Typography>
            <ProgressBar progress={65} />
            <ProgressText>65% Complete</ProgressText>
          </Card>
          
          <Card variant="outlined">
            <PriorityBadge priority="high">
              <Typography variant="caption" color="#FFFFFF">🚀 High</Typography>
            </PriorityBadge>
            <Typography variant="h4">Math Problem Set</Typography>
            <Typography variant="body2">Due in 5 days</Typography>
            <ProgressBar progress={65} />
            <ProgressText>65% Complete</ProgressText>
          </Card>
          
          <Button 
            title="View All Tasks" 
            onPress={() => {}} 
            variant="text" 
            icon={<MaterialCommunityIcons name="checkbox-marked-outline" size={18} color="#4361EE" />}
          />
        </Section>
        
        <Section>
          <Typography variant="h3">Study Stats</Typography>
          <Card variant="filled">
            <Typography variant="h4">This Week</Typography>
            <StatsRow>
              <StatItem>
                <Typography variant="h2" color="#4361EE">12</Typography>
                <Typography variant="caption">Hours</Typography>
              </StatItem>
              <StatItem>
                <Typography variant="h2" color="#FF006E">8</Typography>
                <Typography variant="caption">Sessions</Typography>
              </StatItem>
              <StatItem>
                <Typography variant="h2" color="#B5E48C">5</Typography>
                <Typography variant="caption">Tasks Done</Typography>
              </StatItem>
            </StatsRow>
          </Card>
          
          <Button 
            title="Start Study Session" 
            onPress={() => {}} 
            variant="primary" 
            fullWidth
            icon={<MaterialCommunityIcons name="timer" size={18} color="#FFFFFF" />}
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
  padding: ${props => props.theme.spacing.lg}px;
`;

const Header = styled.View`
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const Section = styled.View`
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.md}px;
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
  align-self: flex-start;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

interface ProgressBarProps {
  progress: number;
}

const ProgressText = styled(Typography)`
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

export default HomeScreen;
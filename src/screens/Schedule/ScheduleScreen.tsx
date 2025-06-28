// src/screens/Schedule/ScheduleScreen.tsx
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import { lecturesState } from '../../atoms';
import Typography from '../../components/UI/Typography';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ScheduleScreen = () => {
  const { isDarkMode } = useTheme();
  const lectures = useRecoilValue(lecturesState);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Get the current week dates
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Filter lectures for selected date
  const todaysLectures = lectures.filter(lecture => 
    isSameDay(lecture.startTime, selectedDate)
  );
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Typography variant="h2">Schedule</Typography>
          <Typography variant="body1" color={isDarkMode ? '#AAAAAA' : '#757575'}>
            {format(selectedDate, 'MMMM dd, yyyy')}
          </Typography>
        </Header>
        
        {/* Week Calendar */}
        <WeekContainer>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {weekDays.map((day, index) => (
              <DayButton
                key={index}
                isSelected={isSameDay(day, selectedDate)}
                onPress={() => setSelectedDate(day)}
              >
                <Typography 
                  variant="caption" 
                  color={isSameDay(day, selectedDate) ? '#FFFFFF' : undefined}
                >
                  {format(day, 'EEE')}
                </Typography>
                <Typography 
                  variant="h4" 
                  color={isSameDay(day, selectedDate) ? '#FFFFFF' : undefined}
                >
                  {format(day, 'd')}
                </Typography>
              </DayButton>
            ))}
          </ScrollView>
        </WeekContainer>
        
        {/* Today's Lectures */}
        <Section>
          <SectionHeader>
            <Typography variant="h3">
              {isSameDay(selectedDate, new Date()) ? "Today's Classes" : "Classes"}
            </Typography>
            <Button
              title="Add Lecture"
              onPress={() => {}}
              variant="outline"
              size="small"
              icon={<MaterialCommunityIcons name="plus" size={16} color="#4361EE" />}
            />
          </SectionHeader>
          
          {todaysLectures.length === 0 ? (
            <EmptyState>
              <MaterialCommunityIcons 
                name="calendar-blank" 
                size={64} 
                color={isDarkMode ? '#AAAAAA' : '#CED4DA'} 
              />
              <Typography variant="h4" color={isDarkMode ? '#AAAAAA' : '#CED4DA'}>
                No classes scheduled
              </Typography>
              <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#CED4DA'}>
                {isSameDay(selectedDate, new Date()) 
                  ? "Enjoy your free day!" 
                  : "No classes on this date"
                }
              </Typography>
            </EmptyState>
          ) : (
            [...todaysLectures]
              .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
              .map((lecture) => (
                <Card key={lecture.id} variant="elevated">
                  <LectureHeader>
                    <LectureColorIndicator color={lecture.color} />
                    <LectureInfo>
                      <Typography variant="h4">{lecture.title}</Typography>
                      <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                        {lecture.professor}
                      </Typography>
                    </LectureInfo>
                    <TouchableOpacity>
                      <MaterialCommunityIcons 
                        name="dots-vertical" 
                        size={24} 
                        color={isDarkMode ? '#FFFFFF' : '#2B2D42'} 
                      />
                    </TouchableOpacity>
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
                      title="Edit"
                      onPress={() => {}}
                      variant="text"
                      size="small"
                      icon={<MaterialCommunityIcons name="pencil" size={16} color="#4361EE" />}
                    />
                    <Button
                      title="Details"
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
`;

const WeekContainer = styled.View`
  padding-horizontal: ${props => props.theme.spacing.lg}px;
  margin-bottom: ${props => props.theme.spacing.lg}px;
`;

interface DayButtonProps {
  isSelected: boolean;
}

const DayButton = styled.TouchableOpacity<DayButtonProps>`
  background-color: ${props => props.isSelected ? props.theme.colors.primary : 'transparent'};
  border-radius: ${props => props.theme.borderRadius.md}px;
  padding: ${props => props.theme.spacing.md}px;
  margin-right: ${props => props.theme.spacing.sm}px;
  align-items: center;
  min-width: 60px;
  border: 1px solid ${props => props.isSelected ? props.theme.colors.primary : props.theme.colors.border};
`;

const Section = styled.View`
  padding-horizontal: ${props => props.theme.spacing.lg}px;
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const EmptyState = styled.View`
  align-items: center;
  padding: ${props => props.theme.spacing.xxl}px;
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
  gap: ${props => props.theme.spacing.sm}px;
`;

export default ScheduleScreen;
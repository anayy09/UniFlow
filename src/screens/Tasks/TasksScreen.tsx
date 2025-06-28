// src/screens/Tasks/TasksScreen.tsx
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue, useRecoilState } from 'recoil';
import { format, differenceInDays, isToday, isTomorrow } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import { tasksState } from '../../atoms';
import { Task } from '../../types';
import Typography from '../../components/UI/Typography';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import ProgressBar from '../../components/UI/ProgressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type FilterType = 'all' | 'active' | 'completed' | 'overdue';

const TasksScreen = () => {
  const { isDarkMode } = useTheme();
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [filter, setFilter] = useState<FilterType>('all');
  
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, progress: task.completed ? 0 : 100 }
        : task
    ));
  };
  
  const toggleSubtaskCompletion = (taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks?.map(subtask =>
          subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
        ) || [];
        
        const completedSubtasks = updatedSubtasks.filter(s => s.completed).length;
        const progress = Math.round((completedSubtasks / updatedSubtasks.length) * 100);
        
        return {
          ...task,
          subtasks: updatedSubtasks,
          progress,
          completed: progress === 100,
        };
      }
      return task;
    }));
  };
  
  const getFilteredTasks = () => {
    const now = new Date();
    
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'overdue':
        return tasks.filter(task => 
          !task.completed && task.deadline && task.deadline < now
        );
      default:
        return tasks;
    }
  };
  
  const getDeadlineText = (deadline?: Date) => {
    if (!deadline) return null;
    
    const daysUntil = differenceInDays(deadline, new Date());
    
    if (isToday(deadline)) return 'Due today';
    if (isTomorrow(deadline)) return 'Due tomorrow';
    if (daysUntil < 0) return `Overdue by ${Math.abs(daysUntil)} day${Math.abs(daysUntil) > 1 ? 's' : ''}`;
    if (daysUntil <= 7) return `Due in ${daysUntil} day${daysUntil > 1 ? 's' : ''}`;
    
    return `Due ${format(deadline, 'MMM dd')}`;
  };
  
  const getDeadlineColor = (deadline?: Date) => {
    if (!deadline) return undefined;
    
    const daysUntil = differenceInDays(deadline, new Date());
    
    if (daysUntil < 0) return '#FF5252'; // Overdue - red
    if (daysUntil <= 1) return '#FF9800'; // Due soon - orange
    if (daysUntil <= 3) return '#FFC107'; // Due this week - yellow
    
    return undefined;
  };
  
  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return '🔥';
      case 'high': return '🚀';
      case 'medium': return '⚡';
      case 'low': return '🌱';
      default: return '📝';
    }
  };
  
  const filteredTasks = getFilteredTasks();
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Typography variant="h2">Tasks</Typography>
          <Typography variant="body1" color={isDarkMode ? '#AAAAAA' : '#757575'}>
            {tasks.filter(t => !t.completed).length} active tasks
          </Typography>
        </Header>
        
        {/* Filter Tabs */}
        <FilterContainer>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'all', label: 'All', count: tasks.length },
              { key: 'active', label: 'Active', count: tasks.filter(t => !t.completed).length },
              { key: 'completed', label: 'Completed', count: tasks.filter(t => t.completed).length },
              { key: 'overdue', label: 'Overdue', count: tasks.filter(t => !t.completed && t.deadline && t.deadline < new Date()).length },
            ].map(({ key, label, count }) => (
              <FilterTab
                key={key}
                isSelected={filter === key}
                onPress={() => setFilter(key as FilterType)}
              >
                <Typography 
                  variant="body2" 
                  color={filter === key ? '#FFFFFF' : undefined}
                >
                  {label} ({count})
                </Typography>
              </FilterTab>
            ))}
          </ScrollView>
        </FilterContainer>
        
        {/* Add Task Button */}
        <Section>
          <Button
            title="Add New Task"
            onPress={() => {}}
            variant="primary"
            fullWidth
            icon={<MaterialCommunityIcons name="plus" size={18} color="#FFFFFF" />}
          />
        </Section>
        
        {/* Tasks List */}
        <Section>
          {filteredTasks.length === 0 ? (
            <EmptyState>
              <MaterialCommunityIcons 
                name="checkbox-marked-circle-outline" 
                size={64} 
                color={isDarkMode ? '#AAAAAA' : '#CED4DA'} 
              />
              <Typography variant="h4" color={isDarkMode ? '#AAAAAA' : '#CED4DA'}>
                {filter === 'completed' ? 'No completed tasks' : 'No tasks found'}
              </Typography>
              <Typography variant="body2" color={isDarkMode ? '#AAAAAA' : '#CED4DA'}>
                {filter === 'all' 
                  ? "Add your first task to get started!"
                  : filter === 'completed'
                  ? "Complete some tasks to see them here"
                  : `No ${filter} tasks at the moment`
                }
              </Typography>
            </EmptyState>
          ) : (
            [...filteredTasks]
              .sort((a, b) => {
                // Sort by completion status, then priority, then deadline
                if (a.completed !== b.completed) {
                  return a.completed ? 1 : -1;
                }
                
                const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
                const aPriority = priorityOrder[a.priority];
                const bPriority = priorityOrder[b.priority];
                
                if (aPriority !== bPriority) {
                  return aPriority - bPriority;
                }
                
                if (a.deadline && b.deadline) {
                  return a.deadline.getTime() - b.deadline.getTime();
                }
                
                return 0;
              })
              .map((task) => (
                <TaskCard key={task.id} variant="elevated" completed={task.completed}>
                  <TaskHeader>
                    <TouchableOpacity onPress={() => toggleTaskCompletion(task.id)}>
                      <CheckboxContainer completed={task.completed}>
                        {task.completed && (
                          <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
                        )}
                      </CheckboxContainer>
                    </TouchableOpacity>
                    
                    <TaskInfo>
                      <TaskTitleRow>
                        <PriorityIndicator>{getPriorityIcon(task.priority)}</PriorityIndicator>
                        <Typography 
                          variant="h4" 
                          style={{ 
                            textDecorationLine: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.6 : 1,
                          }}
                        >
                          {task.title}
                        </Typography>
                      </TaskTitleRow>
                      
                      {task.description && (
                        <Typography 
                          variant="body2" 
                          color={isDarkMode ? '#AAAAAA' : '#757575'}
                          style={{ opacity: task.completed ? 0.6 : 1 }}
                        >
                          {task.description}
                        </Typography>
                      )}
                      
                      {task.deadline && (
                        <DeadlineText color={getDeadlineColor(task.deadline)}>
                          <MaterialCommunityIcons 
                            name="clock-outline" 
                            size={14} 
                            color={getDeadlineColor(task.deadline) || (isDarkMode ? '#AAAAAA' : '#757575')} 
                          />
                          <Typography 
                            variant="caption" 
                            color={getDeadlineColor(task.deadline)}
                          >
                            {getDeadlineText(task.deadline)}
                          </Typography>
                        </DeadlineText>
                      )}
                    </TaskInfo>
                    
                    <TouchableOpacity>
                      <MaterialCommunityIcons 
                        name="dots-vertical" 
                        size={24} 
                        color={isDarkMode ? '#FFFFFF' : '#2B2D42'} 
                      />
                    </TouchableOpacity>
                  </TaskHeader>
                  
                  {/* Progress */}
                  {!task.completed && task.progress > 0 && (
                    <ProgressSection>
                      <ProgressBar progress={task.progress} />
                      <Typography variant="caption" color={isDarkMode ? '#AAAAAA' : '#757575'}>
                        {task.progress}% Complete
                      </Typography>
                    </ProgressSection>
                  )}
                  
                  {/* Subtasks */}
                  {task.subtasks && task.subtasks.length > 0 && (
                    <SubtasksSection>
                      <Typography variant="body2" weight="medium">
                        Subtasks ({task.subtasks.filter(s => s.completed).length}/{task.subtasks.length})
                      </Typography>
                      
                      {task.subtasks.map((subtask) => (
                        <SubtaskRow key={subtask.id}>
                          <TouchableOpacity 
                            onPress={() => toggleSubtaskCompletion(task.id, subtask.id)}
                          >
                            <SubtaskCheckbox completed={subtask.completed}>
                              {subtask.completed && (
                                <MaterialCommunityIcons name="check" size={12} color="#FFFFFF" />
                              )}
                            </SubtaskCheckbox>
                          </TouchableOpacity>
                          
                          <Typography 
                            variant="body2" 
                            style={{ 
                              textDecorationLine: subtask.completed ? 'line-through' : 'none',
                              opacity: subtask.completed ? 0.6 : 1,
                            }}
                          >
                            {subtask.title}
                          </Typography>
                        </SubtaskRow>
                      ))}
                    </SubtasksSection>
                  )}
                  
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
                </TaskCard>
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

const FilterContainer = styled.View`
  padding-horizontal: ${props => props.theme.spacing.lg}px;
  margin-bottom: ${props => props.theme.spacing.lg}px;
`;

interface FilterTabProps {
  isSelected: boolean;
}

const FilterTab = styled.TouchableOpacity<FilterTabProps>`
  background-color: ${props => props.isSelected ? props.theme.colors.primary : props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.pill}px;
  padding: ${props => props.theme.spacing.sm}px ${props => props.theme.spacing.md}px;
  margin-right: ${props => props.theme.spacing.sm}px;
  border: 1px solid ${props => props.isSelected ? props.theme.colors.primary : props.theme.colors.border};
`;

const Section = styled.View`
  padding-horizontal: ${props => props.theme.spacing.lg}px;
  margin-bottom: ${props => props.theme.spacing.lg}px;
`;

const EmptyState = styled.View`
  align-items: center;
  padding: ${props => props.theme.spacing.xxl}px;
`;

interface TaskCardProps {
  completed: boolean;
}

const TaskCard = styled(Card)<TaskCardProps>`
  opacity: ${props => props.completed ? 0.7 : 1};
`;

const TaskHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const CheckboxContainer = styled.View<{ completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid ${props => props.completed ? props.theme.colors.primary : props.theme.colors.border};
  background-color: ${props => props.completed ? props.theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.theme.spacing.md}px;
  margin-top: 2px;
`;

const TaskInfo = styled.View`
  flex: 1;
`;

const TaskTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const PriorityIndicator = styled.Text`
  font-size: 16px;
  margin-right: ${props => props.theme.spacing.xs}px;
`;

const DeadlineText = styled.View<{ color?: string }>`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.xs}px;
`;

const ProgressSection = styled.View`
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const SubtasksSection = styled.View`
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const SubtaskRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.sm}px;
`;

const SubtaskCheckbox = styled.View<{ completed: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid ${props => props.completed ? props.theme.colors.primary : props.theme.colors.border};
  background-color: ${props => props.completed ? props.theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.theme.spacing.sm}px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm}px;
`;

export default TasksScreen;
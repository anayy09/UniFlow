// src/utils/helpers.ts
import { differenceInDays, isToday, isTomorrow, format } from 'date-fns';

/**
 * Get a human-readable deadline text
 */
export const getDeadlineText = (deadline: Date): string => {
  if (isToday(deadline)) return 'Due today';
  if (isTomorrow(deadline)) return 'Due tomorrow';
  
  const daysUntil = differenceInDays(deadline, new Date());
  
  if (daysUntil < 0) {
    return `Overdue by ${Math.abs(daysUntil)} day${Math.abs(daysUntil) > 1 ? 's' : ''}`;
  }
  
  if (daysUntil <= 7) {
    return `Due in ${daysUntil} day${daysUntil > 1 ? 's' : ''}`;
  }
  
  return `Due ${format(deadline, 'MMM dd')}`;
};

/**
 * Get color for deadline based on urgency
 */
export const getDeadlineColor = (deadline: Date): string | undefined => {
  const daysUntil = differenceInDays(deadline, new Date());
  
  if (daysUntil < 0) return '#FF5252'; // Overdue - red
  if (daysUntil <= 1) return '#FF9800'; // Due soon - orange
  if (daysUntil <= 3) return '#FFC107'; // Due this week - yellow
  
  return undefined;
};

/**
 * Get priority icon for tasks
 */
export const getPriorityIcon = (priority: 'urgent' | 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'urgent': return '🔥';
    case 'high': return '🚀';
    case 'medium': return '⚡';
    case 'low': return '🌱';
    default: return '📝';
  }
};

/**
 * Get priority color for tasks
 */
export const getPriorityColor = (priority: 'urgent' | 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'urgent': return '#FF006E';
    case 'high': return '#FB5607';
    case 'medium': return '#FFBE0B';
    case 'low': return '#8338EC';
    default: return '#8338EC';
  }
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate task progress based on subtasks
 */
export const calculateTaskProgress = (subtasks: Array<{ completed: boolean }>): number => {
  if (!subtasks || subtasks.length === 0) return 0;
  
  const completedCount = subtasks.filter(subtask => subtask.completed).length;
  return Math.round((completedCount / subtasks.length) * 100);
};

/**
 * Generate a random color for lectures
 */
export const generateRandomColor = (): string => {
  const colors = [
    '#4361EE', '#FF006E', '#B5E48C', '#FB5607', 
    '#FFBE0B', '#8338EC', '#3A86FF', '#06FFA5'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Get time range string for lectures
 */
export const getTimeRangeString = (startTime: Date, endTime: Date): string => {
  return `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
};

/**
 * Check if a date is in the current week
 */
export const isCurrentWeek = (date: Date): boolean => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return date >= oneWeekAgo && date <= now;
};

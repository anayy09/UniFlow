// src/atoms/index.ts
import { atom } from 'recoil';
import { Lecture, Task, StudySession, UserSettings } from '../types';

// Lectures atom
export const lecturesState = atom<Lecture[]>({
  key: 'lecturesState',
  default: [
    {
      id: '1',
      title: 'Introduction to Psychology',
      professor: 'Dr. Sarah Johnson',
      location: 'Room 302, Science Building',
      startTime: new Date(2025, 5, 30, 10, 0), // June 30, 2025, 10:00 AM
      endTime: new Date(2025, 5, 30, 11, 30), // June 30, 2025, 11:30 AM
      recurrence: 'weekly',
      color: '#4361EE',
      notes: 'Bring textbook chapters 1-3',
    },
    {
      id: '2',
      title: 'Calculus II',
      professor: 'Prof. Michael Chen',
      location: 'Room 105, Math Building',
      startTime: new Date(2025, 5, 30, 13, 0), // June 30, 2025, 1:00 PM
      endTime: new Date(2025, 5, 30, 14, 30), // June 30, 2025, 2:30 PM
      recurrence: 'weekly',
      color: '#FF006E',
      notes: 'Quiz on derivatives',
    },
    {
      id: '3',
      title: 'Computer Science Principles',
      professor: 'Dr. Emily Rodriguez',
      location: 'Room 201, Tech Building',
      startTime: new Date(2025, 6, 1, 9, 0), // July 1, 2025, 9:00 AM
      endTime: new Date(2025, 6, 1, 10, 30), // July 1, 2025, 10:30 AM
      recurrence: 'weekly',
      color: '#B5E48C',
    },
  ],
});

// Tasks atom
export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [
    {
      id: '1',
      title: 'Psychology Essay',
      description: 'Write a 1500-word essay on cognitive behavioral therapy',
      deadline: new Date(2025, 6, 1), // July 1, 2025
      priority: 'urgent',
      completed: false,
      progress: 65,
      subtasks: [
        { id: '1-1', title: 'Research sources', completed: true },
        { id: '1-2', title: 'Create outline', completed: true },
        { id: '1-3', title: 'Write introduction', completed: true },
        { id: '1-4', title: 'Write body paragraphs', completed: false },
        { id: '1-5', title: 'Write conclusion', completed: false },
        { id: '1-6', title: 'Proofread and edit', completed: false },
      ],
    },
    {
      id: '2',
      title: 'Math Problem Set',
      description: 'Complete problems 1-20 from Chapter 8',
      deadline: new Date(2025, 6, 4), // July 4, 2025
      priority: 'high',
      completed: false,
      progress: 35,
      subtasks: [
        { id: '2-1', title: 'Problems 1-5', completed: true },
        { id: '2-2', title: 'Problems 6-10', completed: true },
        { id: '2-3', title: 'Problems 11-15', completed: false },
        { id: '2-4', title: 'Problems 16-20', completed: false },
      ],
    },
    {
      id: '3',
      title: 'CS Project Proposal',
      description: 'Submit project proposal for final semester project',
      deadline: new Date(2025, 6, 7), // July 7, 2025
      priority: 'medium',
      completed: false,
      progress: 20,
      subtasks: [
        { id: '3-1', title: 'Choose project topic', completed: true },
        { id: '3-2', title: 'Research requirements', completed: false },
        { id: '3-3', title: 'Write proposal draft', completed: false },
        { id: '3-4', title: 'Submit proposal', completed: false },
      ],
    },
  ],
});

// Study sessions atom
export const studySessionsState = atom<StudySession[]>({
  key: 'studySessionsState',
  default: [
    {
      id: '1',
      startTime: new Date(2025, 5, 29, 14, 0),
      endTime: new Date(2025, 5, 29, 15, 30),
      duration: 90,
      subject: 'Psychology',
      breaks: 2,
    },
    {
      id: '2',
      startTime: new Date(2025, 5, 29, 16, 0),
      endTime: new Date(2025, 5, 29, 17, 0),
      duration: 60,
      subject: 'Mathematics',
      breaks: 1,
    },
  ],
});

// Current timer state
export const timerState = atom({
  key: 'timerState',
  default: {
    isRunning: false,
    timeRemaining: 25 * 60, // 25 minutes in seconds
    currentSession: 1,
    isBreak: false,
    totalSessions: 0,
  },
});

// User settings atom
export const userSettingsState = atom<UserSettings>({
  key: 'userSettingsState',
  default: {
    theme: 'system',
    notifications: true,
    pomodoroSettings: {
      workDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,
      sessionsBeforeLongBreak: 4,
    },
    doNotDisturbHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
  },
});

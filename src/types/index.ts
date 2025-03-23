export interface Lecture {
    id: string;
    title: string;
    professor: string;
    location: string;
    startTime: Date;
    endTime: Date;
    recurrence: 'none' | 'daily' | 'weekly';
    color: string;
    notes?: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline?: Date;
    priority: 'urgent' | 'high' | 'medium' | 'low';
    completed: boolean;
    subtasks?: SubTask[];
    progress: number;
    courseId?: string;
  }
  
  export interface SubTask {
    id: string;
    title: string;
    completed: boolean;
  }
  
  export interface StudySession {
    id: string;
    startTime: Date;
    endTime: Date;
    duration: number; // in minutes
    subject?: string;
    breaks: number;
  }
  
  export interface UserSettings {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    pomodoroSettings: {
      workDuration: number;
      breakDuration: number;
      longBreakDuration: number;
      sessionsBeforeLongBreak: number;
    };
    doNotDisturbHours: {
      enabled: boolean;
      start: string; // format: "HH:MM"
      end: string; // format: "HH:MM"
    };
  }
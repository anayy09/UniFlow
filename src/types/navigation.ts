import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  Home: undefined;
  Schedule: undefined;
  Tasks: undefined;
  Timer: undefined;
  Progress: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type ScheduleStackParamList = {
  ScheduleScreen: undefined;
  AddLecture: undefined;
  LectureDetails: { lectureId: string };
  EditLecture: { lectureId: string };
};

export type TasksStackParamList = {
  TasksScreen: undefined;
  AddTask: undefined;
  TaskDetails: { taskId: string };
  EditTask: { taskId: string };
};

export type TimerStackParamList = {
  TimerScreen: undefined;
  SessionHistory: undefined;
  TimerSettings: undefined;
};

export type ProgressStackParamList = {
  ProgressScreen: undefined;
  Achievements: undefined;
  Reports: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootTabParamList>;
  Settings: undefined;
  OnboardingFlow: undefined;
};
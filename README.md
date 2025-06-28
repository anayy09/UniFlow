# UniFlow - Campus Companion App

UniFlow is a comprehensive React Native application designed to help students manage their university life efficiently. It combines schedule management, task tracking, study timers, and progress monitoring in one unified platform.

## 🚀 Features

### 📅 Schedule Management
- **Weekly Calendar View**: Navigate through weeks and view your class schedule
- **Class Details**: Store professor information, location, notes, and timing
- **Color-Coded Classes**: Visual organization with customizable colors
- **Empty State Handling**: Clean interface for days with no classes

### ✅ Task Management
- **Smart Task Organization**: Filter by active, completed, overdue tasks
- **Priority System**: Urgent, High, Medium, Low priority levels with visual indicators
- **Progress Tracking**: Built-in progress bars and completion percentages
- **Subtask Support**: Break down complex tasks into smaller manageable pieces
- **Deadline Management**: Visual deadline indicators with color coding
- **Interactive Completion**: Tap to mark tasks and subtasks as complete

### ⏲️ Pomodoro Timer
- **Customizable Work/Break Cycles**: Configurable work and break durations
- **Long Break Support**: Extended breaks after a set number of sessions
- **Subject Selection**: Track time spent on different subjects
- **Session Statistics**: Daily session count and total hours
- **Background Timer**: Continue timing even when app is in background
- **Audio Notifications**: Alerts when sessions complete

### 📊 Progress Analytics
- **Study Statistics**: Daily, weekly, and overall study time tracking
- **Task Completion Rates**: Visual progress of task completion
- **Subject Breakdown**: Time spent analysis by subject
- **Weekly Trends**: 4-week study pattern visualization
- **Achievement System**: Unlock achievements for study milestones
- **Performance Insights**: Most productive days and average session lengths

### 🎨 Design & User Experience
- **Dark/Light Theme**: System-aware theme switching with manual override
- **Modern UI Components**: Consistent design language throughout
- **Smooth Animations**: React Native Reanimated for fluid interactions
- **Material Design Icons**: Comprehensive icon set for better UX
- **Responsive Layout**: Optimized for different screen sizes
- **Accessibility**: Screen reader support and proper contrast ratios

## 🛠️ Technical Stack

### Frontend
- **React Native 0.76.7**: Latest stable version for optimal performance
- **Expo 52**: Streamlined development and deployment
- **TypeScript**: Type-safe development with comprehensive type definitions
- **React Navigation 7**: Tab and stack navigation with deep linking support

### State Management
- **Recoil**: Facebook's experimental state management for React
- **AsyncStorage**: Persistent data storage for settings and preferences
- **Date-fns**: Comprehensive date manipulation and formatting

### Styling & UI
- **Styled Components**: CSS-in-JS with theme support
- **React Native Paper**: Material Design components
- **React Native Vector Icons**: Extensive icon library
- **Custom Theme System**: Centralized design tokens and color schemes

### Development Tools
- **Babel**: JavaScript transpilation with React Native preset
- **Metro**: React Native bundler with hot reloading
- **TypeScript Compiler**: Static type checking and IntelliSense
- **ESLint**: Code quality and style enforcement

## 📱 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- React Native development environment
- Expo CLI (optional but recommended)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UniFlow
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - For iOS: Press `i` in terminal or scan QR code with Expo Go
   - For Android: Press `a` in terminal or scan QR code with Expo Go
   - For Web: Press `w` in terminal

## 🏗️ Project Structure

```
src/
├── atoms/                  # Recoil state management
│   └── index.ts           # Global application state
├── components/            # Reusable UI components
│   └── UI/
│       ├── Button.tsx     # Custom button component
│       ├── Card.tsx       # Card container component
│       ├── ProgressBar.tsx # Progress visualization
│       └── Typography.tsx # Text styling component
├── context/               # React Context providers
│   └── ThemeContext.tsx   # Theme and dark mode management
├── navigation/            # Navigation configuration
│   ├── RootNavigator.tsx  # Stack navigator setup
│   └── TabNavigator.tsx   # Bottom tab navigation
├── screens/               # Application screens
│   ├── HomeTab/
│   │   └── HomeScreen.tsx # Dashboard overview
│   ├── Schedule/
│   │   └── ScheduleScreen.tsx # Class schedule management
│   ├── Tasks/
│   │   └── TasksScreen.tsx # Task and deadline tracking
│   ├── Timer/
│   │   └── TimerScreen.tsx # Pomodoro timer functionality
│   ├── Progress/
│   │   └── ProgressScreen.tsx # Analytics and statistics
│   └── Settings/
│       └── SettingsScreen.tsx # App configuration
├── types/                 # TypeScript type definitions
│   ├── index.ts          # Application data models
│   ├── navigation.ts     # Navigation parameter types
│   └── styled.d.ts       # Styled components type extensions
└── utils/
    └── theme.ts          # Design system and theme configuration
```

## 🎯 Usage Guide

### Adding Your First Class
1. Navigate to the **Schedule** tab
2. Tap **Add Lecture** button
3. Fill in class details (title, professor, location, time)
4. Choose a color for visual organization
5. Add optional notes or reminders

### Creating Tasks
1. Go to the **Tasks** tab
2. Tap **Add New Task**
3. Set title, description, and deadline
4. Choose priority level (Urgent, High, Medium, Low)
5. Break down into subtasks if needed
6. Track progress as you work

### Using the Pomodoro Timer
1. Open the **Timer** tab
2. Select your study subject
3. Customize work/break durations in settings
4. Tap **Start** to begin your focus session
5. Take breaks when prompted
6. Review your daily statistics

### Viewing Progress
1. Check the **Progress** tab for insights
2. View daily, weekly, and monthly statistics
3. Track task completion rates
4. Monitor time spent by subject
5. Unlock achievements for milestones

## 🎨 Customization

### Themes
UniFlow supports automatic theme switching based on system preferences, or manual selection:
- **Light Theme**: Clean, bright interface for daytime use
- **Dark Theme**: Easy on the eyes for low-light environments
- **System**: Automatically matches your device settings

### Pomodoro Settings
Customize your study sessions:
- Work duration (default: 25 minutes)
- Short break (default: 5 minutes)  
- Long break (default: 15 minutes)
- Sessions before long break (default: 4)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

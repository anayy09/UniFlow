# UniFlow Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation & Running
```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Or with specific options
npx expo start --clear    # Clear cache
npx expo start --web      # Open in web browser
npx expo start --tunnel   # Use tunnel for external access
```

### Development Workflow
1. **Phone**: Scan QR code with Expo Go app
2. **Web**: Press 'w' in terminal to open web version
3. **Android Emulator**: Press 'a' if you have Android Studio setup
4. **iOS Simulator**: Press 'i' if you have Xcode setup (Mac only)

## 📁 Project Structure

```
UniFlow/
├── App.tsx                          # Root app component
├── app.json                         # Expo configuration
├── package.json                     # Dependencies and scripts
├── README.md                        # Project documentation
├── src/
│   ├── atoms/
│   │   └── index.ts                 # Recoil state management
│   ├── components/
│   │   └── UI/                      # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── ProgressBar.tsx
│   │       └── Typography.tsx
│   ├── context/
│   │   └── ThemeContext.tsx         # Theme provider
│   ├── navigation/
│   │   ├── RootNavigator.tsx        # Main navigation
│   │   └── TabNavigator.tsx         # Bottom tab navigation
│   ├── screens/                     # All app screens
│   │   ├── HomeTab/
│   │   │   └── HomeScreen.tsx       # Dashboard overview
│   │   ├── Progress/
│   │   │   └── ProgressScreen.tsx   # Analytics & insights
│   │   ├── Schedule/
│   │   │   └── ScheduleScreen.tsx   # Weekly calendar
│   │   ├── Settings/
│   │   │   └── SettingsScreen.tsx   # App preferences
│   │   ├── Tasks/
│   │   │   └── TasksScreen.tsx      # Task management
│   │   └── Timer/
│   │       └── TimerScreen.tsx      # Pomodoro timer
│   ├── types/
│   │   ├── index.ts                 # Core type definitions
│   │   ├── navigation.ts            # Navigation types
│   │   └── styled.d.ts              # Styled-components types
│   └── utils/
│       ├── helpers.ts               # Utility functions
│       └── theme.ts                 # Theme configuration
└── assets/                          # Images and icons
```

## 🔧 Key Technologies

### Core Framework
- **React Native 0.76.7**: Latest stable version
- **Expo 52**: Development platform and tools
- **TypeScript**: Type safety and better DX

### State Management
- **Recoil**: Modern state management with atoms
- **AsyncStorage**: Local data persistence

### UI & Styling
- **Styled Components**: CSS-in-JS styling
- **React Native Paper**: Material Design components
- **Vector Icons**: Icon library
- **Custom Theme System**: Dark/Light mode support

### Navigation
- **React Navigation 7**: Latest navigation library
- **Bottom Tabs**: Main app navigation
- **Stack Navigation**: Screen transitions

### Date & Time
- **date-fns**: Modern date utility library
- **Custom Timer Logic**: Pomodoro implementation

## 🎯 Feature Overview

### 1. Dashboard (HomeScreen)
- Today's schedule overview
- Urgent tasks display
- Study statistics
- Quick action buttons

### 2. Schedule Management (ScheduleScreen)
- Weekly calendar view
- Lecture scheduling
- Time conflict detection
- Color-coded subjects

### 3. Task Tracking (TasksScreen)
- Task creation and management
- Priority levels (High, Medium, Low)
- Deadline tracking
- Progress visualization
- Subtask support

### 4. Pomodoro Timer (TimerScreen)
- Customizable work/break intervals
- Subject-specific sessions
- Session history tracking
- Background timer support

### 5. Progress Analytics (ProgressScreen)
- Study time tracking
- Task completion rates
- Weekly progress charts
- Achievement system

### 6. Settings (SettingsScreen)
- Theme switching (Light/Dark/System)
- Notification preferences
- Timer customization
- Data management

## 🛠️ Development Tips

### Adding New Features
1. Define types in `src/types/index.ts`
2. Add state atoms in `src/atoms/index.ts`
3. Create screen components in appropriate folders
4. Update navigation if needed

### State Management
```typescript
// Reading state
const tasks = useRecoilValue(tasksState);

// Writing state
const setTasks = useSetRecoilState(tasksState);

// Both read and write
const [tasks, setTasks] = useRecoilState(tasksState);
```

### Styling Best Practices
```typescript
// Use theme-aware styling
const StyledComponent = styled.View`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md}px;
`;

// Access theme in components
const { isDarkMode } = useTheme();
```

### Navigation
```typescript
// Navigate to screen
navigation.navigate('Tasks');

// Navigate with parameters
navigation.navigate('TaskDetails', { taskId: '123' });
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npx expo start --clear
   ```

2. **TypeScript errors**
   ```bash
   npx tsc --noEmit
   ```

3. **Package installation issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **iOS simulator not working**
   - Ensure Xcode is installed (Mac only)
   - Check iOS simulator is running

5. **Android emulator issues**
   - Ensure Android Studio is installed
   - Check AVD is running

### Performance Tips
- Use `React.memo()` for expensive components
- Implement proper list optimization with `FlatList`
- Avoid inline functions in render methods
- Use Recoil selectors for derived state

## 📱 Testing

### Device Testing
- Test on both iOS and Android
- Check different screen sizes
- Verify dark/light theme switching
- Test offline functionality

### Feature Testing Checklist
- [ ] Schedule: Add/edit/delete lectures
- [ ] Tasks: Create tasks with different priorities
- [ ] Timer: Start/pause/reset Pomodoro sessions
- [ ] Progress: Verify analytics calculations
- [ ] Settings: Theme switching works
- [ ] Navigation: All tabs accessible

## 🚀 Deployment

### Building for Production
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both
eas build --platform all
```

### App Store Submission
1. Update version in `app.json`
2. Build production version
3. Test thoroughly
4. Submit to respective stores

## 🤝 Contributing

1. Create feature branch from main
2. Make changes following coding standards
3. Test thoroughly on multiple devices
4. Submit pull request with description

## 📞 Support

For questions or issues:
1. Check this documentation
2. Review TypeScript errors
3. Check Expo documentation
4. Open issue with detailed description

---

**Happy coding! 🎉**

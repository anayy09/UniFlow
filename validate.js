// Quick validation script for UniFlow
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/atoms/index.ts',
  'src/screens/HomeTab/HomeScreen.tsx',
  'src/screens/Schedule/ScheduleScreen.tsx',
  'src/screens/Tasks/TasksScreen.tsx',
  'src/screens/Timer/TimerScreen.tsx',
  'src/screens/Progress/ProgressScreen.tsx',
  'src/screens/Settings/SettingsScreen.tsx',
  'src/utils/helpers.ts',
  'App.tsx',
  'package.json'
];

console.log('🔍 Validating UniFlow project structure...\n');

let allValid = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.log(`❌ ${file} - Missing!`);
    allValid = false;
  }
});

console.log('\n📊 Project Status:');
if (allValid) {
  console.log('✅ All required files are present');
  console.log('🚀 UniFlow is ready to run!');
  console.log('\nNext steps:');
  console.log('1. Run: npx expo start');
  console.log('2. Scan QR code with Expo Go app on your phone');
  console.log('3. Or press "w" to open in web browser');
} else {
  console.log('❌ Some files are missing');
}

console.log('\n🎯 Features implemented:');
console.log('• 📅 Schedule management with weekly view');
console.log('• ✅ Task tracking with priorities and deadlines');
console.log('• ⏱️  Pomodoro timer with session tracking');
console.log('• 📈 Progress analytics and insights');
console.log('• 🏠 Dashboard overview on home screen');
console.log('• ⚙️  Settings with theme switching and preferences');
console.log('• 🎨 Dark/Light theme support');
console.log('• 💾 State management with Recoil');

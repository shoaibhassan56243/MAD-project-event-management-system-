import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventManagementScreen from './components/EventManagementScreen';  
import EventList from './components/EventList';  
import AboutUsScreen from './components/AboutUsScreen';  
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Home Screen */}
          <Stack.Screen name="Home" component={EventManagementScreen} />

          {/* Events Screen */}
          <Stack.Screen name="Events" component={EventList} />

          {/* About Us Screen */}
          <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
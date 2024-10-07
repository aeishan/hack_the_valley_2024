import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'; // Import expo-font to load custom fonts
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './components/CameraScreen';
import UploadScreen from './components/UploadScreen';
import ResultScreen from './components/ResultScreen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

// Load the custom font
const getFonts = () => Font.loadAsync({
  'ProtestStrike-Regular': require('./assets/fonts/ProtestStrike-Regular.ttf'), // Path to your font
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); // State to track if fonts are loaded

  useEffect(() => {
    async function loadResources() {
      await getFonts();  // Load the custom font
      setFontsLoaded(true);  // Update state when fonts are ready
      SplashScreen.hideAsync();  // Hide the splash screen after fonts are loaded
    }

    loadResources();  // Call the function to load resources
  }, []);

  // If fonts aren't loaded yet, return nothing (keep the splash screen)
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Trash Ninja' }} 
        />
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ title: 'Take a Picture' }} 
        />
        <Stack.Screen 
          name="Upload" 
          component={UploadScreen} 
          options={{ title: 'Upload an Image' }} 
        />
        <Stack.Screen 
          name="Result" 
          component={ResultScreen} 
          options={{ title: 'Result' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

// Import your Screens
import DashboardScreen from './DashboardScreen';
import SearchScreen from './SearchScreen';
import SettingsScreen from './SettingsScreen';

// Import the Context Provider (Step A)
import { CalorieProvider } from './CalorieContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // Step B: Wrap the entire navigation structure in the Provider
    <CalorieProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Dashboard') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0056FF', // Matching your blue accent colour
            tabBarInactiveTintColor: 'gray',
            headerShown: false, // Hides the top header for a cleaner look
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CalorieProvider>
  );
}
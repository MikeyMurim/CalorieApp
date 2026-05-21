import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import DashboardScreen from './DashboardScreen';
import SearchScreen from './SearchScreen';
import ManualAddScreen from './ManualAddScreen';
import SettingsScreen from './SettingsScreen';
import { CalorieProvider } from './CalorieContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CalorieProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
              else if (route.name === 'Search API') iconName = focused ? 'search' : 'search-outline';
              else if (route.name === 'Custom Add') iconName = focused ? 'add-circle' : 'add-circle-outline';
              else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF', 
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Search API" component={SearchScreen} />
          <Tab.Screen name="Custom Add" component={ManualAddScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CalorieProvider>
  );
}
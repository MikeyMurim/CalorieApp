import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';

// Import the Context to read the global state
import { CalorieContext } from './CalorieContext';

export default function DashboardScreen() {
  const { dailyCalories } = useContext(CalorieContext);
  const DAILY_GOAL = 2500;

  // 1. Set up React Native's built-in animation engine (No Reanimated required!)
  const animatedWidth = useRef(new Animated.Value(0)).current;

  // 2. Trigger the animation whenever dailyCalories changes
  useEffect(() => {
    // Calculate percentage, capping it at 100% so it doesn't overflow the bar
    const percentage = Math.min((dailyCalories / DAILY_GOAL) * 100, 100);

    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 1200, // Smooth 1.2 second glide
      useNativeDriver: false, 
    }).start();
  }, [dailyCalories]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Dashboard</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Calorie Goal</Text>
        <Text style={styles.calorieText}>{dailyCalories} <Text style={styles.calorieSubText}>/ {DAILY_GOAL} kcal</Text></Text>
        
        {/* The Native Custom Progress Bar */}
        <View style={styles.progressBarBackground}>
          <Animated.View 
            style={[
              styles.progressBarFill, 
              {
                // Map the 0-100 percentage to a CSS width percentage
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                })
              }
            ]} 
          />
        </View>

        <Text style={styles.subText}>
          {DAILY_GOAL - dailyCalories > 0 
            ? `${DAILY_GOAL - dailyCalories} kcal remaining today` 
            : "🔥 Calorie Goal Reached!"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Apple-inspired styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA', 
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    marginTop: 40,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3, 
  },
  cardTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    fontWeight: '600'
  },
  calorieText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  calorieSubText: {
    fontSize: 20,
    color: '#A0A0A0',
  },
  progressBarBackground: {
    width: '100%',
    height: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0056FF', // Your accent blue
    borderRadius: 12,
  },
  subText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500'
  }
});
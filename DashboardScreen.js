import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';

// Import the Context to read the global state
import { CalorieContext } from './CalorieContext';

export default function DashboardScreen() {
  // FIXED: Reading 'calories' instead of 'dailyCalories'
  const { calories } = useContext(CalorieContext);
  const DAILY_GOAL = 2500;

  // Set up React Native's built-in animation engine
  const animatedWidth = useRef(new Animated.Value(0)).current;

  // Trigger the animation whenever calories changes
  useEffect(() => {
    // Calculate percentage, capping it at 100% so it doesn't overflow the bar
    const percentage = Math.min((calories / DAILY_GOAL) * 100, 100);

    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 1200, // Smooth 1.2 second glide
      useNativeDriver: false, 
    }).start();
  }, [calories]); // Watch the updated variable

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Dashboard</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Calorie Goal</Text>
        
        {/* Updated variable usage here */}
        <Text style={styles.calorieText}>
          {calories} <Text style={styles.calorieSubText}>/ {DAILY_GOAL} kcal</Text>
        </Text>
        
        <View style={styles.progressBarBackground}>
          <Animated.View 
            style={[
              styles.progressBarFill, 
              { width: animatedWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }
            ]} 
          />
        </View>

        <Text style={styles.subText}>
          {/* Updated variable usage here */}
          {DAILY_GOAL - calories > 0 
            ? `${DAILY_GOAL - calories} kcal remaining today` 
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
    marginBottom: 20,
  },
  calorieSubText: {
    fontSize: 18,
    color: '#999',
  },
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: '#E5E5EA',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF', // iOS Blue
    borderRadius: 6,
  },
  subText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  }
});
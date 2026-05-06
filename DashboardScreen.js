import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

// Import the Context to read the global state
import { CalorieContext } from './CalorieContext';

export default function DashboardScreen() {
  // Read the dailyCalories variable from your global state
  const { dailyCalories } = useContext(CalorieContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Dashboard</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Calories Today</Text>
        {/* Display the dynamic state variable here */}
        <Text style={styles.calorieText}>{dailyCalories} kcal</Text>
      </View>
    </SafeAreaView>
  );
}

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
    padding: 24,
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
    marginBottom: 8,
  },
  calorieText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0056FF', 
  },
});
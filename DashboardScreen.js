import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { CalorieContext } from './CalorieContext';

// A reusable sub-component for the new macro bars
const MacroBar = ({ label, current, goal, color }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const percentage = Math.min((current / (goal || 1)) * 100, 100);
    Animated.timing(animatedWidth, {
      toValue: percentage, duration: 1000, useNativeDriver: false, 
    }).start();
  }, [current, goal]);

  return (
    <View style={styles.macroContainer}>
      <View style={styles.macroTextRow}>
        <Text style={styles.macroLabel}>{label}</Text>
        <Text style={styles.macroValue}>{current} / {goal}g</Text>
      </View>
      <View style={styles.miniBarBackground}>
        <Animated.View style={[styles.miniBarFill, { backgroundColor: color, width: animatedWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
      </View>
    </View>
  );
};

export default function DashboardScreen() {
  const { 
    calories, calorieGoal, 
    protein, proteinGoal, 
    carbs, carbsGoal, 
    fats, fatsGoal 
  } = useContext(CalorieContext);

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const percentage = Math.min((calories / (calorieGoal || 1)) * 100, 100);
    Animated.timing(animatedWidth, {
      toValue: percentage, duration: 1200, useNativeDriver: false, 
    }).start();
  }, [calories, calorieGoal]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Dashboard</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Calories</Text>
        <Text style={styles.calorieText}>{calories} <Text style={styles.calorieSubText}>/ {calorieGoal} kcal</Text></Text>
        
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, { width: animatedWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Macronutrients</Text>
        <MacroBar label="Protein" current={protein} goal={proteinGoal} color="#FF9500" />
        <MacroBar label="Carbs" current={carbs} goal={carbsGoal} color="#34C759" />
        <MacroBar label="Fats" current={fats} goal={fatsGoal} color="#FF3B30" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', padding: 20 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 20, marginTop: 40 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 18, color: '#666', marginBottom: 10, fontWeight: '600' },
  calorieText: { fontSize: 42, fontWeight: 'bold', color: '#000', marginBottom: 15, textAlign: 'center' },
  calorieSubText: { fontSize: 18, color: '#999' },
  progressBarBackground: { width: '100%', height: 16, backgroundColor: '#E5E5EA', borderRadius: 8, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#007AFF', borderRadius: 8 },
  macroContainer: { marginBottom: 15 },
  macroTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  macroLabel: { fontSize: 16, fontWeight: '500', color: '#333' },
  macroValue: { fontSize: 14, color: '#888' },
  miniBarBackground: { width: '100%', height: 8, backgroundColor: '#E5E5EA', borderRadius: 4, overflow: 'hidden' },
  miniBarFill: { height: '100%', borderRadius: 4 }
});
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { CalorieContext } from './CalorieContext';

export default function SettingsScreen() {
  const { 
    resetAll, 
    calorieGoal, setCalorieGoal, 
    proteinGoal, setProteinGoal, 
    carbsGoal, setCarbsGoal, 
    fatsGoal, setFatsGoal 
  } = useContext(CalorieContext);

  const handleReset = () => {
    Alert.alert(
      "Start a New Day?",
      "This will reset all your tracked calories and macros to zero. This cannot be undone.",
      [{ text: "Cancel", style: "cancel" }, { text: "Reset", style: "destructive", onPress: () => resetAll() }]
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Settings</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Goals</Text>
          
          <View style={styles.inputRow}>
            <Text style={styles.label}>Calories (kcal)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={String(calorieGoal)} onChangeText={(val) => setCalorieGoal(Number(val) || 0)} />
          </View>
          
          <View style={styles.inputRow}>
            <Text style={styles.label}>Protein (g)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={String(proteinGoal)} onChangeText={(val) => setProteinGoal(Number(val) || 0)} />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Carbs (g)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={String(carbsGoal)} onChangeText={(val) => setCarbsGoal(Number(val) || 0)} />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Fats (g)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={String(fatsGoal)} onChangeText={(val) => setFatsGoal(Number(val) || 0)} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Management</Text>
          <Text style={styles.cardDescription}>Clear your current daily progress.</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset Daily Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 16 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 20, marginTop: 40 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 16, color: '#333' },
  input: { backgroundColor: '#F2F2F7', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, width: 100, textAlign: 'center', fontSize: 16, fontWeight: '600' },
  cardDescription: { fontSize: 14, color: '#666', marginBottom: 20 },
  resetButton: { backgroundColor: '#FF3B30', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  resetButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
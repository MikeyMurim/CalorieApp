import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CalorieContext } from './CalorieContext';

export default function SettingsScreen() {
  const { resetAll } = useContext(CalorieContext);

  const handleReset = () => {
    Alert.alert(
      "Start a New Day?",
      "This will reset all your tracked calories and macros to zero. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive",
          onPress: () => resetAll() 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Settings</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Data Management</Text>
        <Text style={styles.cardDescription}>
          Clear your current daily progress. This will wipe your local storage and reset your dashboard.
        </Text>
        
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset Daily Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    marginTop: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#FF3B30', // iOS standard destructive red
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
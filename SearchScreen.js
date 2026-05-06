import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  SafeAreaView 
} from 'react-native';

// Import the Context to access your global functions
import { CalorieContext } from './CalorieContext';

export default function SearchScreen() {
  // Step C: Access the addCalories function from your Context
  const { addCalories } = useContext(CalorieContext);

  // Local state to hold form inputs
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [carbs, setCarbs] = useState('');

  // Validation Logic (Week 3 Goal)
  const handleSave = () => {
    // 1. Check if the name is empty
    if (!foodName.trim()) {
      Alert.alert("Validation Error", "Please enter a food name.");
      return;
    }

    // 2. Check if calories is a valid, positive number
    const calorieValue = parseInt(calories);
    if (isNaN(calorieValue) || calorieValue <= 0) {
      Alert.alert("Validation Error", "Please enter a valid number for calories.");
      return;
    }

    // 3. Update the global state
    addCalories(calorieValue);
    
    // 4. Success feedback
    Alert.alert("Success", `${foodName} added! (${calorieValue} kcal)`);

    // 5. Clear the form fields for the next entry
    setFoodName('');
    setCalories('');
    setProtein('');
    setFats('');
    setCarbs('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Manual Entry</Text>
      <Text style={styles.subText}>Track your daily nourishment effortlessly.</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Food Name (e.g., Whole Milk)"
          value={foodName}
          onChangeText={setFoodName}
        />
        <TextInput
          style={styles.input}
          placeholder="Calories (kcal)"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />
        
        <View style={styles.macroRow}>
          <TextInput
            style={[styles.input, styles.macroInput]}
            placeholder="Protein (g)"
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.macroInput]}
            placeholder="Fats (g)"
            value={fats}
            onChangeText={setFats}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.macroInput]}
            placeholder="Carbs (g)"
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Entry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styling inspired by your Apple/Google Design goals
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA', // Light grey background from your wireframe
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 40, 
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3, // For Android shadow
  },
  input: {
    backgroundColor: '#F0F2F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroInput: {
    flex: 1,
    marginHorizontal: 4, // Spaces out the three macro boxes evenly
  },
  button: {
    backgroundColor: '#0056FF', // Your bright blue accent
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
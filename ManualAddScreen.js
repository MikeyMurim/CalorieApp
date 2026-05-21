import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { CalorieContext } from './CalorieContext';

export default function ManualAddScreen({ navigation }) {
  const { addCalories, addProtein, addCarbs, addFats } = useContext(CalorieContext);

  const [name, setName] = useState('');
  const [cal, setCal] = useState('');
  const [pro, setPro] = useState('');
  const [carb, setCarb] = useState('');
  const [fat, setFat] = useState('');

  const handleAdd = () => {
    if (!cal) {
      Alert.alert("Error", "Please at least enter a calorie amount.");
      return;
    }
    
    addCalories(Number(cal) || 0);
    addProtein(Number(pro) || 0);
    addCarbs(Number(carb) || 0);
    addFats(Number(fat) || 0);

    // Clear inputs and return to dashboard
    setName(''); setCal(''); setPro(''); setCarb(''); setFat('');
    navigation.navigate('Dashboard');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.headerTitle}>Custom Entry</Text>
      
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Food Name (Optional)" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Calories (kcal)" keyboardType="numeric" value={cal} onChangeText={setCal} />
        
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.halfInput]} placeholder="Protein (g)" keyboardType="numeric" value={pro} onChangeText={setPro} />
          <TextInput style={[styles.input, styles.halfInput]} placeholder="Carbs (g)" keyboardType="numeric" value={carb} onChangeText={setCarb} />
        </View>
        <TextInput style={[styles.input, {width: '48%'}]} placeholder="Fats (g)" keyboardType="numeric" value={fat} onChangeText={setFat} />

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 16 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 20, marginTop: 40 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  input: { backgroundColor: '#F2F2F7', padding: 14, borderRadius: 8, fontSize: 16, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
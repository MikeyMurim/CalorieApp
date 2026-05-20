import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { CalorieContext } from './CalorieContext'; 

export default function SearchScreen() {
  const { addCalories } = useContext(CalorieContext);

  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApiSearch = async () => {
    if (!foodName.trim()) {
      Alert.alert("Input Required", "Please enter a food term to search.");
      return;
    }

    setIsLoading(true);
    const targetUrl = `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=${encodeURIComponent(foodName)}`;
    
    const requestOptions = {
      method: 'GET',
      headers: {
        // Reads safely from your local hidden .env file
        'x-rapidapi-key': process.env.EXPO_PUBLIC_RAPIDAPI_KEY, 
        'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(targetUrl, requestOptions);
      
      if (!response.ok) {
        throw new Error(`RapidAPI validation dropped. Status: ${response.status}`);
      }

      const jsonPayload = await response.json();

      if (jsonPayload.hints && jsonPayload.hints.length > 0) {
        const primaryMatch = jsonPayload.hints[0].food;
        
        console.log("--- SECURE NETWORK API RE-INTEGRATION SUCCESSFUL ---");
        
        setFoodName(primaryMatch.label);
        setCalories(Math.round(primaryMatch.nutrients.ENERC_KCAL || 0).toString());
        setProtein(Math.round(primaryMatch.nutrients.PROCNT || 0).toString());
        setCarbs(Math.round(primaryMatch.nutrients.CHOCDF || 0).toString());
        setFats(Math.round(primaryMatch.nutrients.FAT || 0).toString());
        
      } else {
        Alert.alert("No Results", "No database match found. Feel free to type details manually.");
      }
    } catch (networkError) {
      console.error("Secure Engine Error Trace:", networkError);
      Alert.alert("Connection Failure", "Could not reach server gateway. Manual entry is enabled.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEntry = () => {
    if (!foodName.trim() || !calories.trim()) {
      Alert.alert("Validation Error", "Food name and structural calories are required inputs.");
      return;
    }

    const numericCalories = parseInt(calories, 10);
    const numericProtein = parseInt(protein || '0', 10);
    const numericCarbs = parseInt(carbs || '0', 10);
    const numericFats = parseInt(fats || '0', 10);

    if (isNaN(numericCalories) || isNaN(numericProtein) || isNaN(numericCarbs) || isNaN(numericFats)) {
      Alert.alert("Data Error", "Macros must be real numeric values.");
      return;
    }

    addCalories(numericCalories);
    Alert.alert("Logged Successfully", `${foodName} has been recorded.`);

    setFoodName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.headerArea}>
        <Text style={styles.mainTitle}>The Daily Log</Text>
        <Text style={styles.subSubtitle}>Query the food database securely or adjust metrics manually.</Text>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.fieldLabel}>FOOD NAME</Text>
        <View style={styles.searchRow}>
          <TextInput
            style={[styles.textField, { flex: 1, marginRight: 8 }]}
            placeholder="e.g. Avocado Toast"
            placeholderTextColor="#A0A0A0"
            value={foodName}
            onChangeText={setFoodName}
          />
          <TouchableOpacity 
            style={styles.apiSearchButton} 
            onPress={handleApiSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.apiButtonText}>Search API</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.fieldLabel}>ENERGY (KCAL)</Text>
        <View style={styles.fieldValueRow}>
          <TextInput
            style={styles.numericInput}
            placeholder="0"
            placeholderTextColor="#A0A0A0"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
          <Text style={styles.iconElement}>🔥</Text>
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.fieldLabel}>PROTEIN (G)</Text>
        <View style={styles.fieldValueRow}>
          <TextInput
            style={styles.numericInput}
            placeholder="0"
            placeholderTextColor="#A0A0A0"
            keyboardType="numeric"
            value={protein}
            onChangeText={setProtein}
          />
          <View style={[styles.macroPillIndicator, { backgroundColor: '#3A86FF' }]} />
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.fieldLabel}>CARBS (G)</Text>
        <View style={styles.fieldValueRow}>
          <TextInput
            style={styles.numericInput}
            placeholder="0"
            placeholderTextColor="#A0A0A0"
            keyboardType="numeric"
            value={carbs}
            onChangeText={setCarbs}
          />
          <View style={[styles.macroPillIndicator, { backgroundColor: '#FFB703' }]} />
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.fieldLabel}>FATS (G)</Text>
        <View style={styles.fieldValueRow}>
          <TextInput
            style={styles.numericInput}
            placeholder="0"
            placeholderTextColor="#A0A0A0"
            keyboardType="numeric"
            value={fats}
            onChangeText={setFats}
          />
          <View style={[styles.macroPillIndicator, { backgroundColor: '#FFB703' }]} />
        </View>
      </View>

      <TouchableOpacity style={styles.primaryActionButton} onPress={handleSaveEntry}>
        <Text style={styles.actionButtonText}>Save Entry  ✓</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 60, backgroundColor: '#FAFAFC' },
  headerArea: { marginBottom: 28 },
  mainTitle: { fontSize: 32, fontWeight: '800', color: '#111111' },
  subSubtitle: { fontSize: 15, color: '#666666', marginTop: 6 },
  inputCard: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16, borderWidth: 1, borderColor: '#EFEFEF' },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: '#222222', letterSpacing: 0.8, marginBottom: 6 },
  searchRow: { flexDirection: 'row', alignItems: 'center' },
  textField: { fontSize: 18, color: '#111111', paddingVertical: 4 },
  apiSearchButton: { backgroundColor: '#111111', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  apiButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  fieldValueRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  numericInput: { fontSize: 28, fontWeight: '500', color: '#111111', flex: 1, paddingVertical: 2 },
  iconElement: { fontSize: 22 },
  macroPillIndicator: { width: 4, height: 24, borderRadius: 2 },
  primaryActionButton: { backgroundColor: '#0052FF', borderRadius: 28, height: 56, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  actionButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' }
});
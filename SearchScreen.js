import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  Keyboard 
} from 'react-native';
import { CalorieContext } from './CalorieContext';

export default function SearchScreen({ navigation }) {
  // 1. Context API Hooks for Global State
  const { addCalories, addProtein, addCarbs, addFats } = useContext(CalorieContext);

  // 2. Local UI & Networking State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 3. Asynchronous Network Fetch
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    Keyboard.dismiss();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Secure call using environment variables
      const response = await fetch(
        `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=${encodeURIComponent(searchQuery)}`, 
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
          }
        }
      );

      const data = await response.json();
      
      if (data.hints && data.hints.length > 0) {
        setSearchResults(data.hints);
      } else {
        setSearchResults([]);
        setErrorMessage('No foods found. Try a different search.');
      }
    } catch (error) {
      console.error("API Fetch Error: ", error);
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Data Binding & Selection Handler (SWEBOK Ch 4: Defensive Coding)
  const handleSelectFood = (item) => {
    const nutrients = item.food.nutrients;
    
    // Graceful fallbacks using nullish coalescing or logical OR to prevent NaN crashes
    const kcals = Math.round(nutrients.ENERC_KCAL || 0);
    const protein = Math.round(nutrients.PROCNT || 0);
    const carbs = Math.round(nutrients.CHOCDF || 0);
    const fats = Math.round(nutrients.FAT || 0);

    // Update Global Source of Truth
    addCalories(kcals);
    addProtein(protein);
    addCarbs(carbs);
    addFats(fats);

    // Reset local state and navigate back to see the animated UI update
    setSearchQuery('');
    setSearchResults([]);
    navigation.navigate('Dashboard');
  };

  // 5. FlatList Render Item Component
  const renderFoodItem = ({ item }) => {
    const { food } = item;
    const { nutrients } = food;
    
    return (
      <TouchableOpacity 
        style={styles.resultCard} 
        onPress={() => handleSelectFood(item)}
      >
        <Text style={styles.foodTitle}>{food.label}</Text>
        <View style={styles.macroRow}>
          <Text style={styles.macroText}>🔥 {Math.round(nutrients.ENERC_KCAL || 0)} kcal</Text>
          <Text style={styles.macroText}>🥩 P: {Math.round(nutrients.PROCNT || 0)}g</Text>
          <Text style={styles.macroText}>🥖 C: {Math.round(nutrients.CHOCDF || 0)}g</Text>
          <Text style={styles.macroText}>🥑 F: {Math.round(nutrients.FAT || 0)}g</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Find Food</Text>
      
      {/* Search Input Area */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="e.g., 100g Chicken Breast"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Network Status & Error Handling */}
      {isLoading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Data-Bound List Rendering */}
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => item.food.foodId + index.toString()}
        renderItem={renderFoodItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// 6. UI Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1C1C1E',
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderColor: '#E5E5EA',
    borderWidth: 1,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 40,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
});
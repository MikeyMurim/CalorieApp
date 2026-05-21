import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Create the Context
export const CalorieContext = createContext();

// Define a safe, unique key for the device's hard drive
const STORAGE_KEY = '@nutrition_data';

export const CalorieProvider = ({ children }) => {
  // State for Calories and all Macros
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  
  // A safety flag to prevent saving empty data over your saved data during the first split-second of app launch
  const [isReady, setIsReady] = useState(false);

  // 2. THE LOAD PHASE: Runs exactly once when the app opens
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData !== null) {
          // Deserialization: Convert string back to a JavaScript object
          const parsedData = JSON.parse(storedData);
          setCalories(parsedData.calories || 0);
          setProtein(parsedData.protein || 0);
          setCarbs(parsedData.carbs || 0);
          setFats(parsedData.fats || 0);
        }
      } catch (error) {
        console.error("Failed to load local data: ", error);
      } finally {
        setIsReady(true); // Tell the app it is safe to start saving changes
      }
    };

    loadData();
  }, []);

  // 3. THE SAVE PHASE: Runs automatically whenever a macro changes
  useEffect(() => {
    // Only save if the initial load is complete
    if (isReady) {
      const saveData = async () => {
        try {
          // Serialization: Convert the macro object into a string
          const dataString = JSON.stringify({ calories, protein, carbs, fats });
          await AsyncStorage.setItem(STORAGE_KEY, dataString);
        } catch (error) {
          console.error("Failed to save local data: ", error);
        }
      };

      saveData();
    }
  }, [calories, protein, carbs, fats, isReady]);

  // Update Functions
  const addCalories = (amount) => setCalories((prev) => prev + amount);
  const addProtein = (amount) => setProtein((prev) => prev + amount);
  const addCarbs = (amount) => setCarbs((prev) => prev + amount);
  const addFats = (amount) => setFats((prev) => prev + amount);

  // Reset Function (Now this will automatically overwrite local storage with 0s)
  const resetAll = () => {
    setCalories(0);
    setProtein(0);
    setCarbs(0);
    setFats(0);
  };

  return (
    <CalorieContext.Provider
      value={{
        calories,
        protein,
        carbs,
        fats,
        addCalories,
        addProtein,
        addCarbs,
        addFats,
        resetAll,
      }}
    >
      {/* We can optionally hide the app behind a loading screen until isReady is true, but for now we just render children */}
      {children}
    </CalorieContext.Provider>
  );
};
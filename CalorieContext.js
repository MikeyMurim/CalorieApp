import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CalorieContext = createContext();
const STORAGE_KEY = '@nutrition_data';

export const CalorieProvider = ({ children }) => {
  // Current Intake
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  
  // Custom Goals (Default Values)
  const [calorieGoal, setCalorieGoal] = useState(2500);
  const [proteinGoal, setProteinGoal] = useState(150);
  const [carbsGoal, setCarbsGoal] = useState(300);
  const [fatsGoal, setFatsGoal] = useState(70);

  const [isReady, setIsReady] = useState(false);

  // LOAD PHASE
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setCalories(parsedData.calories || 0);
          setProtein(parsedData.protein || 0);
          setCarbs(parsedData.carbs || 0);
          setFats(parsedData.fats || 0);
          
          // Load goals (fallback to defaults if they haven't set them yet)
          setCalorieGoal(parsedData.calorieGoal || 2500);
          setProteinGoal(parsedData.proteinGoal || 150);
          setCarbsGoal(parsedData.carbsGoal || 300);
          setFatsGoal(parsedData.fatsGoal || 70);
        }
      } catch (error) {
        console.error("Failed to load local data: ", error);
      } finally {
        setIsReady(true);
      }
    };
    loadData();
  }, []);

  // SAVE PHASE
  useEffect(() => {
    if (isReady) {
      const saveData = async () => {
        try {
          const dataString = JSON.stringify({ 
            calories, protein, carbs, fats,
            calorieGoal, proteinGoal, carbsGoal, fatsGoal 
          });
          await AsyncStorage.setItem(STORAGE_KEY, dataString);
        } catch (error) {
          console.error("Failed to save local data: ", error);
        }
      };
      saveData();
    }
  }, [calories, protein, carbs, fats, calorieGoal, proteinGoal, carbsGoal, fatsGoal, isReady]);

  // Update Functions
  const addCalories = (amount) => setCalories((prev) => prev + amount);
  const addProtein = (amount) => setProtein((prev) => prev + amount);
  const addCarbs = (amount) => setCarbs((prev) => prev + amount);
  const addFats = (amount) => setFats((prev) => prev + amount);

  const resetAll = () => {
    setCalories(0);
    setProtein(0);
    setCarbs(0);
    setFats(0);
  };

  return (
    <CalorieContext.Provider
      value={{
        calories, protein, carbs, fats,
        calorieGoal, proteinGoal, carbsGoal, fatsGoal,
        setCalorieGoal, setProteinGoal, setCarbsGoal, setFatsGoal,
        addCalories, addProtein, addCarbs, addFats, resetAll,
      }}
    >
      {children}
    </CalorieContext.Provider>
  );
};
import React, { createContext, useState } from 'react';

// 1. Initialize the Context
export const CalorieContext = createContext();

// 2. Create the Provider Component
export const CalorieProvider = ({ children }) => {
  const [dailyCalories, setDailyCalories] = useState(0);

  // Function to add new calories to the total
  const addCalories = (amount) => {
    setDailyCalories(prev => prev + parseInt(amount || 0));
  };

  return (
    <CalorieContext.Provider value={{ dailyCalories, addCalories }}>
      {children}
    </CalorieContext.Provider>
  );
};
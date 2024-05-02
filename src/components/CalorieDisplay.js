import React from "react";
import './CalorieDislay.css';

const CalorieDisplay = ({ calories, food, calculateTotal}) => {
  return <div className="calorieDisplay">
    <h3>{food.toUpperCase()} is  {calories} calories!</h3> 
    <button onClick={calculateTotal}>Add to total count</button>
  </div>;
};

export default CalorieDisplay;

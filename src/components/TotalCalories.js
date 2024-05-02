import React from 'react'
import './TotalCalories.css'

const TotalCalories = ({total}) => {
  return (
      <div className="totalCalories-container">
      <h2>Your total calorie count for today is</h2>
      <div className="total">{total}</div>
      </div>
  )
}

export default TotalCalories
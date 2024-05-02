import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CalorieDisplay from "./components/CalorieDisplay";
import InputForm from "./components/InputForm";
import TotalCalories from "./components/TotalCalories";
import Confetti from "react-confetti";

function App() {

  const [isClicked, setIsClicked] = useState();
  const [input, setInput] = useState("");
  const [calories, setCalories] = useState("");
  const [food, setFood] = useState("")
  const [totalCalories, setTotalCalories] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false)

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiId = process.env.REACT_APP_API_ID;

  // let audio = new Audio('../public/sounds/happy-sound-effect-141434.mp3')

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const fetchFoodInfo = async () => {
    const response = await axios.get(
      `https://api.edamam.com/api/nutrition-data?app_id=${apiId}&app_key=${apiKey}&nutrition-type=logging&ingr=${input}`,
    );
    console.log(response.data);
    setCalories(response.data.calories);
  };

  const calculateTotal = () => {
    const total = totalCalories + calories;
    setTotalCalories(total);
    if (total >= 500) {
      console.log('well done!')
      setShowConfetti(true)
    };
    setIsClicked(false);
  }

  const buttonClickHandler = () => {
    if (input) {
      fetchFoodInfo();
      setIsClicked(true);
      setFood(input);
      setInput("");
    } else {
      alert("Input field must not be empty");
    }
  };

  useEffect(() => {
    showConfetti && setTimeout(() => {
  setShowConfetti(false)
}, 10000)
  }, [showConfetti])

  return (
    <div className="app-container">
      {showConfetti && <Confetti />}
      <h1>Calorie-Meter</h1>
      <InputForm
        setIsClicked={setIsClicked}
        input={input}
        inputChangeHandler={inputChangeHandler}
        buttonClickHandler={buttonClickHandler}
      />
      {isClicked && <CalorieDisplay calories={calories} food={food} calculateTotal={calculateTotal} />}
      <TotalCalories total={totalCalories} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dailyMenuActions } from './store/dailyMenu-Slice';
import axios from "axios";
import "./App.css";
import CalorieDisplay from "./components/CalorieDisplay";
import InputForm from "./components/InputForm";
import TotalCalories from "./components/TotalCalories";
import Confetti from "react-confetti";

function App() {

  const [isClicked, setIsClicked] = useState(false);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null)
  const [calories, setCalories] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiId = process.env.REACT_APP_API_ID;

  // const dispatch = useDispatch()
  //const dailyMenu = useSelector(state => state.dailyMenu)

  //console.log(dailyMenu)
  // let audio = new Audio('../public/sounds/happy-sound-effect-141434.mp3')

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };


  useEffect(() => {
    const fetchFoodInfo = async () => {
    try {
      const response = await axios.get(
      `https://api.edamam.com/api/nutrition-data?app_id=${apiId}&app_key=${apiKey}&nutrition-type=logging&ingr=${query}`,
      );
      if (response && response.data) {
        console.log(response.data.ingredients[0].text);
        setCalories(response.data.calories);
      } else {
        setError(true)
      }
   
    } catch (error) {
      console.log(error.message)
    }  
    };
    fetchFoodInfo()
  }, [query])
  

  const calculateTotal = () => {
    const total = totalCalories + calories;
    setTotalCalories(total);
    if (total >= 500) {
      console.log('showing confetti')
      setShowConfetti(true)
    };
    setIsClicked(false);
  }

  const buttonClickHandler = () => {

    //validate input field
    let regex = /^[a-zA-Z]+$/;

    if (!regex.test(input) || input.length <= 2) {
      alert('Please enter a word')
      setInput('')
      return;
    };
      setQuery(input);
      setIsClicked(true);
      setInput("");

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
        input={input}
        inputChangeHandler={inputChangeHandler}
        buttonClickHandler={buttonClickHandler}
      />
      {isClicked && <CalorieDisplay calories={calories} food={query} calculateTotal={calculateTotal} />}
      <TotalCalories total={totalCalories} />
    </div>
  );
}

export default App;

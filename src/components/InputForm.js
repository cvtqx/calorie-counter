import "./inputForm.css";

const InputForm = ({ input, inputChangeHandler, buttonClickHandler }) => {
  return (
    <form className="inputForm">
      <input
        type="text"
        id="foodItem"
        name="foodItem"
        placeholder="Type food name"
        value={input}
        onChange={inputChangeHandler}
      ></input>
      <button type="button" onClick={buttonClickHandler}>
        How many calories is that?
      </button>
    </form>
  );
};

export default InputForm;

import React from "react";
import customSetVal from "./custom-setVal";

const ClickCounter = () => {
  let [counter, setCounter] = React.useState(0);
  let [text, setText] = React.useState("");

  const compName = "ClickCounter";
  const setCounter_INTERNAL = customSetVal(setCounter, compName, "counter");
  const setText_INTERNAL = customSetVal(setText, compName, "text");
  setCounter = setCounter_INTERNAL;
  setText = setText_INTERNAL;

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setText(e.target.value);
    }
  };

  return (
    <div>
      <input onKeyDown={handleKeyDown} />
      <span>Text = {text}</span>
      <br />
      <button onClick={() => setCounter(counter + 1)}>Click me</button>
      <span>Counter = {counter}</span>
    </div>
  );
};

export default ClickCounter;

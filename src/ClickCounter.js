import React from "react";

const ClickCounter = () => {
  let [counter, setCounter] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Click me</button>
      <span>Counter = {counter}</span>
    </div>
  );
};

export default ClickCounter;

import React from "react";

const TextChanger = () => {
  let [text, setText] = React.useState("");

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setText(e.target.value);
    }
  };

  return (
    <div>
      <input onKeyDown={handleKeyDown} />
      <span>Text = {text}</span>
    </div>
  );
};

export default TextChanger;

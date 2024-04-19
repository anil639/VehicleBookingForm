import React from "react";

const Question = ({ number, children }) => {
  let questionText;
  switch (number) {
    case 1:
      questionText = "What's your name?";
      break;
    case 2:
      questionText = "Choose Number of wheels.";
      break;
    case 3:
      questionText = "What type of vehicle do you need?";
      break;
    case 4:
      questionText = "specific model ?";
      break;
    case 5:
      questionText = "Select the dates for vehicle usage:";
      break;
    default:
      questionText = "Question";
  }
  return (
    <div>
      <h2>{questionText}</h2>
      {children}
    </div>
  );
};

export default Question;

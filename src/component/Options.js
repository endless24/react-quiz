import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAsnswer = answer !== null;
  return (
    <div className="optins">
      {question.options.map((option, index) => (
        <button
          // using tenary operator to the css on the options
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAsnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAsnswer}
          onClick={() => dispatch({ type: "newAswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

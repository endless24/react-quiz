import React from "react";

function startScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To The react quiz</h2>
      <h3>{numQuestions} questions to text your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default startScreen;

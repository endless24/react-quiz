import React from "react";
import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <>
      <h4>{question.question}</h4>
      {/* rendering options component */}
      <Options question={question} dispatch={dispatch} answer={answer} />
    </>
  );
}

export default Question;

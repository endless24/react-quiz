import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function NextQuestion() {
  const { dispatch, answer, index, numQuestions } = useQuiz();
  if (answer === null) return null;
  //checking if the index is less than the number of questions
  if (index < numQuestions - 1)
    return (
      //next button
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          next
        </button>
      </div>
    );
  // finished button
  if (index === numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          finish
        </button>
      </div>
    );
}

export default NextQuestion;

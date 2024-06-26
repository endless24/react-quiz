import React from "react";
import Options from "./Options";
import { useQuiz } from "../contexts/QuizContext";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);

  return (
    <>
      <h4>{question.question}</h4>
      {/* rendering options component */}
      <Options question={question} />
    </>
  );
}

export default Question;

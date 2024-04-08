import React from "react";

function Progress({ index, numQuestions, points, maxPossiblePoint, answer }) {
  return (
    <header className="progress">
      {/* progress bar */}
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoint}
      </p>
    </header>
  );
}

export default Progress;

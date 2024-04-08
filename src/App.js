import { useEffect, useReducer } from "react";

import Header from "./component/Header";
import Main from "./component/Main";
import Loader from "./component/Loader";
import Error from "./component/Error";
import StartScreen from "./component/StartScreen";
import Question from "./component/Question";
import NextQuestion from "./component/NextQuestion";
import Progress from "./component/Progress";
import FinishScreen from "./component/FinishScreen";
import Footer from "./component/Footer";
import Timer from "./component/Timer";
// import "./index.css";
const SEC_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // created index to loop through questions
  index: 0,
  // created answer to loop through option that was clicked
  answer: null,
  //created point state to store user points
  points: 0,
  // created to calculate the hightscore
  highscore: 0,
  //quiz timer
  secondsRemaining: null,
  // 'loading', 'error','ready','active','finished'
  status: "loading",
};

//reducer function
function reducer(state, action) {
  //using the switch to set the states
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        //calculating section per each
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };

    case "newAswer":
      //calculatin the current state to the next state
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        //calculating the points
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    //use it to go to the next question
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    // return {
    //   ...state,
    //   status: "ready",
    //   index: 0,
    //   answer: null,
    //   points: 0,
    //   highscore: 0,
    // };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  //created useReducer to store the data to the state
  const [state, dispatch] = useReducer(reducer, initialState);

  //fetching data from API and calling the event with dispatch
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  //getting the length of available question
  const numQuestions = questions.length;
  //calculating the total points of all the question
  const maxPossiblePoint = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}

        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoint={maxPossiblePoint}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoint}
            highscore={highscore}
            dispatch={dispatch}
            index={index}
            numQuestions={numQuestions}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

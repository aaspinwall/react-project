import { createStore } from "redux";
import data from "./data";
let reducer = (state, action) => {
  if (action.type === "add") {
    return { ...state, counter: state.counter + 1 };
  }
  if (action.type === "answer") {
    return {
      ...state,
      userAnswers: [...state.userAnswers].concat(action.newAnswer),
      correctAnswers: [...state.correctAnswers].concat(action.correctAnswer),
      counter: state.counter + 1,
    };
  }
  if (action.type === "clear") {
    let score = 0;
    state.userAnswers.forEach((element, i) => {
      if (element === state.correctAnswers[i]) {
        score += 1;
      }
    });
    return {
      ...state,
      userScores: {
        ...state.userScores,
        [action.gameName]: Math.floor(
          (score / state.correctAnswers.length) * 100
        ),
      },
      counter: 0,
      userAnswers: [],
      correctAnswers: [],
    };
  }
  return state;
};

const store = createStore(
  reducer,
  {
    counter: 0,
    userAnswers: [],
    correctAnswers: [],
    userScores: {},
    storedData: { data },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

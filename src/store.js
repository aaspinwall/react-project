import { createStore } from "redux";
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
  return state;
};

const store = createStore(
  reducer,
  { counter: 0, questionNumber: 0, userAnswers: [], correctAnswers: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

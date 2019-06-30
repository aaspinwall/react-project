import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ConnectedCard from "./ConnectedCard";

const sampleData = [
  {
    name: "Country capitals",
    questions: [
      {
        id: 0,
        question: "What is the capital of Thailand?",
        answers: ["Hanoi", "Comcolor", "Bokbok", "Kuala Lumpur", "Bangkok"],
        correctAnswer: "Bangkok",
      },
      {
        id: 1,
        question: "What is the capital of Canada?",
        answers: ["Denver", "Birmingham", "London", "Ottawa", "Vancouver"],
        correctAnswer: "Ottawa",
      },
      {
        id: 2,
        question: "What is the capital of Somalia?",
        answers: [
          "Queenstown",
          "Mogadishu",
          "Pankor",
          "Blabmanwakar",
          "Drakar",
        ],
        correctAnswer: "Ottawa",
      },
    ],
  },
];

class NewQuestion extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const cnt = this.props.counter;
    const questions = sampleData[0].questions.length;
    const questionScreen = (
      <ConnectedCard
        gameName={sampleData[0].name}
        questionData={sampleData[0].questions[cnt]}
        progress={this.props.counter}
        questions={questions}
      />
    );
    const answersScreen = (
      <div>
        {this.props.answers.map((ans, i) => {
          return (
            <div>
              {ans} and {this.props.correctAnswers[i]}
            </div>
          );
        })}
      </div>
    );

    return cnt < questions ? questionScreen : answersScreen;
  }
}

let mapStateToProps = st => {
  return {
    answers: st.userAnswers,
    correctAnswers: st.correctAnswers,
    counter: st.counter,
  };
};

const mapDispatchToProps = dispatch => ({
  handleAnswer: evt =>
    dispatch({ type: "answer", newAnswer: evt.target.innerText }),
});

const GameManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuestion);

export default GameManager;

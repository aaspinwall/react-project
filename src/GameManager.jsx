import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ConnectedCard from "./ConnectedCard";

class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const data = this.props.data;
    const cnt = this.props.counter;
    const questions = data.questions.length;
    const questionScreen = (
      <ConnectedCard
        gameName={data.name}
        questionData={data.questions[cnt]}
        progress={this.props.counter}
        questions={questions}
      />
    );
    const Results = styled.div`
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 1rem 10%;
      text-align: center;
      > h3 {
        background: grey;
        color: white;
        margin: 0;
        padding: 1rem;
      }
      > button {
        padding: 0.5rem;
        border-radius: 5px;
        margin: 1rem 40%;
        background: blue;
        color: white;
        border: none;
      }
      > div {
        padding: 1rem 0;
        > div:first-child {
          font-weight: bold;
        }
      }
    `;
    const Ans = styled.div`
      color: ${props => (props.ans ? "green" : "red")};
    `;
    const answersScreen = (
      <Results>
        <h3>Results</h3>
        <h4>Kind of gets it</h4>
        {this.props.answers.map((ans, i) => {
          return (
            <div>
              <div>{data.questions[i].question}</div>
              <div>Answer: {ans}</div>
              <Ans ans={ans === this.props.correctAnswers[i]}>
                Your answer: {this.props.correctAnswers[i]}
              </Ans>
            </div>
          );
        })}
        <button onClick={this.props.clearAnswers}>Play again</button>
      </Results>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleAnswer: evt =>
    dispatch({ type: "answer", newAnswer: evt.target.innerText }),
  clearAnswers: () =>
    dispatch({
      type: "clear",
      gameName: ownProps.data.name,
    }),
});

const GameManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuestion);

export default GameManager;

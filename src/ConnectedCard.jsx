import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class ProgressBar extends React.Component {
  render() {
    const BarBody = styled.span`
      position: relative;
      padding: 0;
      top: 0;
      height: 10px;
      background: transparent;
      border: black 2px solid;
      transition: width 0.3s ease-in-out;
      > span {
        background: green;
        left: 0;
        top: 0;
        position: absolute;
        width: ${props => props.progress + "%"};
        height: 100%;
      }
    `;
    return (
      <BarBody progress={this.props.progress}>
        <span />
      </BarBody>
    );
  }
}

class SampleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "Your answer" };
  }
  handleClick = e => {
    this.setState({ selected: e.target.innerText });
  };
  componentDidMount() {
    /*  console.log(this.props.questionData); */
  }
  render() {
    const GameWrapper = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;

      > span {
        margin: 0 20%;
      }

      > div {
        padding: 1rem;
        border: 2px solid black;
        margin: 1rem 20%;
        transition: background-color 0.4s ease-in-out;
        transition: color 0.3s ease-in-out;
      }
      > div:hover {
        background: black;
        color: white;
      }

      > div:last-child {
        background: blue;
        color: white;
        margin: 1rem 40%;
        border: none;
      }
    `;

    let name = this.props.gameName;
    let data = this.props.questionData;
    let answer = this.props.questionData.correctAnswer;

    return (
      <GameWrapper>
        <h3>{name}</h3>
        <ProgressBar
          progress={Math.floor(
            (this.props.progress / this.props.questions) * 100
          )}
        />
        <h4>{data.question}</h4>
        {data.answers.map(value => {
          return <div onClick={this.handleClick}>{value}</div>;
        })}
        <div onClick={this.props.handleAnswer}>{this.state.selected}</div>
      </GameWrapper>
    );
  }
}

let mapStateToProps = st => {
  return {
    answers: st.answers,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleAnswer: evt =>
    dispatch({
      type: "answer",
      newAnswer: evt.target.innerText,
      correctAnswer: ownProps.questionData.correctAnswer,
    }),
});

const ConnectedCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleCard);

export default ConnectedCard;

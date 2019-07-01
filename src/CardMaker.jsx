import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { choiceArray: [] };
  }

  render() {
    const choice = (
      <div>
        <label>Choice {console.log(this.props)}</label>
        <input onChange={this.props.handleChoice} />
        <button>Remove</button>
      </div>
    );
    const choiceArray = [];
    return (
      <div>
        <label>Question {this.props.i}</label>
        <input
          onChange={this.props.handleQuestion}
          type='text'
          name={this.props.i}
        />
        <button
          onClick={() =>
            this.setState({ choiceArray: this.state.choiceArray.concat("") })
          }
        >
          Add Choice
        </button>
        {this.state.choiceArray.map((element, i) => {
          return (
            <div>
              <label>Choice {i}</label>
              <input onChange={this.props.handleChoice} name={i} />
              <button>Remove</button>
            </div>
          );
        })}
      </div>
    );
  }
}

class CardMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", questions: [] };
  }
  handleTitle = e => {
    this.setState({ name: e.target.value });
  };
  addCard = () => {
    this.setState({ questions: [...this.state.questions].concat({}) });
  };
  handleQuestion = e => {
    let number = parseInt(e.target.name);
    let value = e.target.value;

    this.setState(
      {
        questions: this.state.questions.map((item, i) => {
          return number === i ? { question: value } : item;
        }),
      },
      () => console.log(this.state.questions)
    );
  };
  handleChoice = e => {
    let number = parseInt(e.target.name);
    let value = e.target.value;
    console.log(e.target);
  };
  render() {
    return (
      <div>
        <div>Create a deck</div>
        <label>Game name:</label>
        <input type='text' onChange={this.handleTitle} />
        <button onClick={this.addCard}>Add card</button>
        <div>
          {this.state.questions.map((q, i) => {
            return (
              <NewCard
                i={i}
                handleQuestion={this.handleQuestion}
                handleChoice={this.handleChoice}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default CardMaker;

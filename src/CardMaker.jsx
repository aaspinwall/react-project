import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import data from "./data";
import { save, load } from "./localStorage";
import { storedData } from "./App";

const Card = styled.div``;

class CardMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: [""], title: "", results: [{}] };
  }
  addCard = () => {
    this.setState(
      {
        cards: [...this.state.cards].concat(""),
        results: [...this.state.results].concat({}),
      },
      () => console.log("added", this.state.results)
    );
  };
  getData = data => {
    this.setState(
      {
        results: this.state.results.map((e, i) => {
          return i === data.id ? data : e;
        }),
      },
      () => console.log("results", this.state.results)
    );
  };
  submit = () => {
    let res = { name: this.state.title, questions: this.state.results };
    let count = Object.keys(storedData).length;
    console.log();
    storedData["game" + count + 1] = res;
    save(storedData);
  };
  render() {
    return (
      <Card>
        <h3>Create a deck</h3>
        <label>Title</label>
        <input onChange={e => this.setState({ title: e.target.value })} />
        {this.state.cards.map((card, i) => (
          <NewCard title={this.state.title} sendToParent={this.getData} i={i} />
        ))}
        <button onClick={this.addCard}>Add card</button>
        <button onClick={this.submit}>Submit</button>
      </Card>
    );
  }
}

class NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: "", answers: [""], correctAnswer: "", cards: {} };
  }
  componentDidMount() {}

  handleTitle = e => {
    this.setState({ question: e.target.value }, () => this.sendToParent());
  };
  handleQuestion = e => {
    let name = parseInt(e.target.name);
    let value = e.target.value;
    this.setState(
      {
        answers: this.state.answers.map((item, i) => {
          return i === name ? value : item;
        }),
      },
      () => this.sendToParent()
    );
  };

  removeChoice = e => {
    e.preventDefault();
    let name = parseInt(e.target.name);
    this.setState(
      {
        answers: this.state.answers.filter((item, i) => {
          return name !== i;
        }),
      },
      () => this.sendToParent()
    );
  };
  addField = e => {
    e.preventDefault();
    this.setState(
      {
        answers: [...this.state.answers].concat(""),
      },
      () => this.sendToParent()
    );
  };
  sendToParent() {
    let res = {
      id: this.props.i,
      question: this.state.question,
      answers: this.state.answers,
      correctAnswer: this.state.correctAnswer,
    };
    this.props.sendToParent(res);
  }
  render() {
    const ChoiceBlock = styled.div``;
    return (
      <form>
        <label>Question: </label>
        <input
          type='text'
          onChange={this.handleTitle}
          value={this.state.name}
        />
        <div>
          {this.state.answers.map((q, i) => {
            return (
              <div>
                <label>Choice {i + 1} </label>
                <input
                  onChange={this.handleQuestion}
                  type='text'
                  name={i}
                  value={q}
                />
                <label>Mark as answer: </label>
                <input
                  type='radio'
                  name='answer'
                  onClick={() =>
                    this.setState(
                      { correctAnswer: this.state.answers[i] },
                      () => this.sendToParent()
                    )
                  }
                />
                <button onClick={this.removeChoice} name={i}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={this.addField}>Add choice</button>
      </form>
    );
  }
}

export default CardMaker;

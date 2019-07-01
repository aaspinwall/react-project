import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class CardMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: [""] };
  }
  addCard = () => {
    this.setState({ cards: [...this.state.cards].concat("") });
  };
  render() {
    return (
      <div>
        <h3>Create a deck</h3>
        <label>Title</label>
        <input />
        {this.state.cards.map(card => (
          <NewCard />
        ))}
        <button onClick={this.addCard}>Add card</button>
      </div>
    );
  }
}

class NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", questions: [""], answer: "", cards: {} };
  }
  componentDidMount() {}

  handleTitle = e => {
    this.setState({ name: e.target.value });
  };
  handleQuestion = e => {
    let name = parseInt(e.target.name);
    let value = e.target.value;
    this.setState({
      questions: this.state.questions.map((item, i) => {
        return i === name ? value : item;
      }),
    });
    console.log(e.target);
  };

  removeChoice = e => {
    e.preventDefault();
    let name = parseInt(e.target.name);
    this.setState({
      questions: this.state.questions.filter((item, i) => {
        return name !== i;
      }),
    });
    console.log(name);
  };
  addField = e => {
    e.preventDefault();
    this.setState({
      questions: [...this.state.questions].concat(""),
    });
  };
  submit = e => {
    e.preventDefault();
    let st = this.state;
    let qArray = [];
    for (const key in st) {
      if (parseInt(key) >= 0) {
        qArray.push(st[key]);
        this.setState({ [key]: "" });
      }
    }
    this.setState(
      {
        name: "",
        cards: [this.state.cards].concat(this.state.questions),
        questions: [""],
      },
      () => console.log(this.state)
    );
  };
  render() {
    return (
      <form>
        <label>Question: </label>
        <input
          type='text'
          onChange={this.handleTitle}
          value={this.state.name}
        />
        <div>
          {this.state.questions.map((q, i) => {
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
                    this.setState({ answer: this.state.questions[i] })
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
        <button onClick={this.submit}>Submit</button>
      </form>
    );
  }
}

export default CardMaker;

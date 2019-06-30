import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class CardMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", questions: [""], qlen: 1, cards: {} };
  }
  componentDidMount() {}

  handleTitle = e => {
    this.setState({ name: e.target.value });
  };
  handleQuestion = e => {
    let name = parseInt(e.target.name);
    this.setState(
      {
        [name]: e.target.value,
      },
      () => console.log(this.state)
    );
  };
  removeChoice = e => {
    this.setState({
      questions: this.state.questions.filter(
        (q, i) => i === parseInt(e.target.name)
      ),
    });
    console.log(e.target);
  };
  addField = e => {
    this.setState({
      qlen: this.state.qlen + 1,
      questions: [...this.state.questions].concat(""),
    });
  };
  submit = () => {
    let st = this.state;
    let qArray = [];
    for (const key in st) {
      if (parseInt(key) >= 0) {
        qArray.push(st[key]);
        this.setState({ [key]: "" });
      }
    }
    this.setState({
      name: "",
      questions: [""],
      qlen: 1,
      cards: { card1: qArray },
    });
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <div>Create a deck</div>
        <label>Deck Name: </label>
        <input onChange={this.handleTitle} value={this.state.name} />
        <div>
          {this.state.questions.map((q, i) => {
            return (
              <div>
                <label>Choice {i + 1} </label>
                <input
                  onChange={this.handleQuestion}
                  type='text'
                  name={i}
                  value={this.state[i]}
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
      </div>
    );
  }
}

export default CardMaker;

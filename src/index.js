/*
 * File: index.js
 * Desc: all react tic-tac-toe functionality
 */

// import key React libs
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import assets
import './index.css';

// Note: defines smallest components to larger ones

// Square renders a button for each square -- needs an onClick event handler
// Also likely to change this to a Functional stateless component that uses props
const Square = props => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}{' '}
      {/* if this is null, nothing will display, else the prop will display */}
    </button>
  );
};

// Board class to render the series of squares and the status
// Create Local State here
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // make an Array
      xIsNext: true // boolean to hold whose turn it is
    };
  }

  handleClick(i) {
    // make copy of state to practice immutability
    //const squares = this.state.squares.slice(); // spread is better
    const squares = [...this.state.squares];
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // check for a winner of the game
    const winner = calculateWinner(this.state.squares);
    let status;

    // conditional rendering -- refactor to be a ternary operator
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'Mr. X' : 'Ms O'}`;
    }
    // conditional rendering -- refactor to be a ternary operator
    // eslint-disable-next-line no-unused-expressions
    // nesterd ternary is a bit much
    // winner
    //   ? (status = `tWinner: ${winner}`)
    //   : `Next player: ${this.state.xIsNext ? 'tMr. X' : 'tMr. O'}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// Game here is like an <App /> - renders a <Board>
class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

/* Render the <Game /> as like an <App /> */
ReactDOM.render(<Game />, document.getElementById('mount-point'));

// todo: move this to a helpers.js file and export the function + import it here
// (better for project structure as well as testability!)
// collection of squares thay win the game  -- ex: [0,1,2] is the top row
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

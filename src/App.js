import React, { Component } from 'react';

import Card from './card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ['','','','','','','','',''],
      turn: 'x',
      gameover: false
    }
  }

  play = (cell, player) => {
    if(this.state.board[cell] === '') {
      let newBoard = this.state.board;
      newBoard[cell] = player;
      if(this.checkGameState(newBoard)) {
        this.setState({ board: newBoard, gameover: true });
      } else {
        let newTurn = (player === 'x')?'o':'x';
        this.setState({ board: newBoard, turn: newTurn });
      }
    }
  };

  checkGameState = (gameBoard) => {
    let p = this.state.turn;
    let win = true;

    // loop through all rows
    for(let i = 0; i < gameBoard.length; i += 3) {
      for(let r = i; r < i+3; r++) {
        if(gameBoard[r] === p)
          win = true;
        else {
          win = false;
          break;
        }
      } // end of second loop means finished checking a row
      // if win is true => means a winning row
      console.log("checked row: " + i + ", player: " + p + ", win state: " + win);
      if(win) return win;
    }

    // loop through all columns
    for(let i = 0; i < 3; i++) {
      for(let c = i; c <= i+6; c += 3) {
        if(gameBoard[c] === p)
          win = true;
        else {
          win = false;
          break;
        }
      } // end of second loop means finished checking a column
      // if win is true => means a winning column
      if(win) return win;
    }

    // the diagonal condition
    if(gameBoard[4] === p) {
      if((gameBoard[0] === p && gameBoard[8] === p) ||
          (gameBoard[2] === p && gameBoard[6] === p))
        return true;
    }

    return false;
  };

  playagain = () => {
    this.setState({board: ['','','','','','','','',''], turn: 'x', gameover: false});
  };

  render() {
    return (
      <div>
        <div className="row game">
          {this.state.board.map((elem, index) => <Card card={ elem } turn={ this.state.turn } cell={ index } play={this.play} />)}
        <div className="info">Player '{ this.state.turn }' turn</div>
        </div>
        <div className={ (this.state.gameover) ? "gameover show": "gameover" }>
          <div>Player {this.state.turn} Won</div>
          <div className="playagain" onClick={this.playagain.bind(this)}><i className="fa fa-refresh"></i> Play Again</div>
        </div>
      </div>
    );
  }
}

export default App;

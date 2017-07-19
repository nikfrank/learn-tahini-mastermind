import React, { Component } from 'react';
import { fromJS } from 'immutable';
import './Game.css';

class Game extends Component {
  static get namespace(){
    return 'mastermind-game';
  }

  static get actions(){
    return {};
  }

  static get reducer(){
    return {};
  }

  static get initState(){
    return fromJS({
      code: [ 0, 2, 1, 3 ],
      guess: [ 0, 0, 0, 0 ],
    });
  }
  
  render() {
    const guess = this.props.subState.get('guess');
    
    return (
      <div className="Game">
        <div className="Game-header">
          <h2>Mastermind Game</h2>
        </div>
        
        <div className="Game-board">
          <div className="Game-guess-row">
            {
              guess.map( (dot, i)=> (
                <div key={i+''+dot} className={`guess-dot dot-${dot}`}></div>
              ) )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

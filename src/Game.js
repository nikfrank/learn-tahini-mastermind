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
    return fromJS({});
  }
  
  render() {
    return (
      <div className="Game">
        <div className="Game-header">
          <h2>Mastermind Game</h2>
        </div>
        <div>
          Here will go the game nu.
        </div>
      </div>
    );
  }
}

export default Game;
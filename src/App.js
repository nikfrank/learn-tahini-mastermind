import React, { Component } from 'react';
import { fromJS } from 'immutable';
import './App.css';

class App extends Component {
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
      <div className="App">
        <div className="App-header">
          <h2>Mastermind Game</h2>
        </div>
        <div>
          Here will go the game nu.
        </div>
      </div>
    );
  }
}

export default App;

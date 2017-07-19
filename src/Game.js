import React, { Component } from 'react';
import { fromJS } from 'immutable';
import './Game.css';

class Game extends Component {
  static get namespace(){
    return 'mastermind-game';
  }

  static get actions(){
    return {
      incGuessDot: (dotIndex) => ({
        type: 'changeGuessDot',
        payload: { dotIndex, diff: 1 },
      }),
      
      decGuessDot: (dotIndex) => ({
        type: 'changeGuessDot',
        payload: { dotIndex, diff: -1 },
      }),

      guess: ()=> ({ type: 'guess' }),
    };
  }

  static get reducer(){
    return {
      changeGuessDot: (state, { payload })=>
        state.updateIn(['guess', payload.dotIndex], dot=>
          (dot + 6 + payload.diff) % 6 ),

      guess: (state)=>
        state.set('guess', fromJS([ 0, 0, 0, 0 ]) ),
    };
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
                <div className="guess-col" key={i}>
                  <button onClick={()=> this.props.incGuessDot(i)}>
                    <i>▲</i>
                  </button>
                  <div key={i+''+dot} className={`guess-dot dot-${dot}`}></div>
                  <button onClick={()=> this.props.decGuessDot(i)}>
                    <i>▼</i>
                  </button>
                </div>
              ) )
            }
            <button className="guess-button" onClick={this.props.guess}>
              Guess!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

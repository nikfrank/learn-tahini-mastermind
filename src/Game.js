import React, { Component } from 'react';
import { fromJS } from 'immutable';
import './Game.css';

import score from './score';

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

      setCode: code => ({
        type: 'setCode',
        payload: { code },
      }),
    };
  }

  static get reducer(){
    return {
      changeGuessDot: (state, { payload })=>
        state.updateIn(['guess', payload.dotIndex], dot=>
          (dot + 6 + payload.diff) % 6 ),

      guess: (state)=>
        // here calculate the score
        // push it along withe guess to .guesses
        // ( could render score, no need to duplicate calculation! )
        state.update('guesses', guesses => guesses.push( fromJS({
          code: state.get('guess'),
          score: fromJS( score( state.get('code'), state.get('guess') ) ),
        }) )
        ).set('guess', fromJS([ 0, 0, 0, 0 ]) ),

      setCode: (state, { payload })=>
        state.set('code', fromJS( payload.code ) ),
    };
  }

  static get initState(){
    return fromJS({
      code: [],
      guess: [ 0, 0, 0, 0 ],
      guesses: [],
    });
  }

  componentDidMount(){
    this.props.setCode( this.props.randomCodeGenerator() );
  }
  
  render() {
    const guess = this.props.subState.get('guess');
    const guesses = this.props.subState.get('guesses', []);
    
    return (
      <div className="Game">
        <div className="Game-header">
          <h2>Mastermind Game</h2>
        </div>
        
        <div className="Game-board">
          {
            guesses.reverse().map( (guess, gi)=> (
              <div key={gi} className="Game-scored-guess">
                {
                  guess.get('code').map( (dot, di)=> (
                    <div key={di+''+dot} className={`guessed-dot dot-${dot}`}></div>
                  ) )
                }
                <div className="Game-row-score">
                  {
                    Array(guess.getIn(['score', 0])).fill(1).map( (o, bi)=> (
                      <div key={bi} className="score-dot score-dot-black"></div>
                    ) )
                  }
                  {
                    Array(guess.getIn(['score', 1])).fill(1).map( (o, bi)=> (
                      <div key={bi} className="score-dot score-dot-pink"></div>
                    ) )
                  }
                  {
                    Array(4 - guess.getIn(['score', 0]) - guess.getIn(['score', 1]))
                      .fill(1).map( (o, bi)=> (
                        <div key={bi} className="score-dot score-dot-white"></div>
                      ) )
                  }
                </div>
              </div>
            ) )
          }
        </div>

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
    );
  }
}

export default Game;

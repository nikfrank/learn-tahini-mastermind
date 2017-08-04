// import the core lib, base component class
import React, { Component } from 'react';

// import immutable converter
// (fromJS is a function (POJO)=> immutableObjectVersion)
// POJO := Plain Old Javascript Object
import { fromJS } from 'immutable';

// this dumps the css into the DOM. Won't work in React Native
import './Game.css';


// declare our component on top of the React base Component class
class Game extends Component {

  // tahini namespace (per component)
  // this keepos our actions separate
  static get namespace(){
    return 'mastermind-game';
  }

  
  // tahini actionCreators are made available as
  // this.props.actionCreatorName
  // eg: this.props.incGuessDot(1) will dispatch
  //     the action to increment the second dot
  static get actions(){
    return {
      incGuessDot: (dotIndex) => ({
        type: 'changeGuessDot',
        payload: { dotIndex, diff: 1 },
      }),


      // the return value of this function is the action
      // the function is an actionCreator
      // the type here declares which reducer to use
      decGuessDot: (dotIndex) => ({
        type: 'changeGuessDot',
        payload: { dotIndex, diff: -1 },
      }),

      guess: ()=> ({ type: 'guess' }),
    };
  }



  // tahini reducer
  // these compute the mutation triggered by some action
  // the type on the action chooses the reducer to use
  // redux will call the reducer, and apply the mutation
  static get reducer(){
    return {
      changeGuessDot: (state, { payload })=>
        state.updateIn(['guess', payload.dotIndex], dot=>
          (dot + 6 + payload.diff) % 6 ),

      guess: (state)=>
        state.set('guess', fromJS([ 0, 0, 0, 0 ]) ),
    };
  }


  // tahini initState
  // used manually when we compose the component
  // still is convenient to declare on the component
  static get initState(){
    return fromJS({
      code: [ 0, 2, 1, 3 ],
      guess: [ 0, 0, 0, 0 ],
    });
  }


  // React lifecycle functions
  // read more
  // https://facebook.github.io/react/docs/state-and-lifecycle.html

  componentDidMount(){
    // run after the first time the component is made
    // this is the component instance
  }

  componentWillReceiveProps( nuProps ){
    // run before this.props is updates to nuProps
    // this is the component instance
  }
  
  // ...
  

  
  // instance functions
  // these are custom functions an instance might call
  // sometimes to handle pure custom logic

  onSomeEvent = ( ...args )=> {
    // this is the instance of the component, as expected
    // but only because of the way we declared it (w the =)
  }
  
  // ...

  

  // this is the crux of react
  // in theory:
  // View = Render( State )
  // in practice, render() will grab the state from context (this)
  // react will call this for us only when needed
  render() {

    // commonly, we'll pull values out of the state into consts
    const guess = this.props.subState.get('guess');


    // the return value is the JSX tree which react will
    // synchronize into the DOM (JSX lives in the VirtualDOM)

    // whenever we return JSX from a function, it must have ONE
    // root component - sometimes this means we need to wrap two
    // components (imagine an input and a button) with a div

    // our CustomComponents are PascalCase
    // default components from html are lowercase (div, span, p, ...)
    return (
      <div className="Game">
        <div className="Game-header">
          <h2>Mastermind Game</h2>
        </div>
        
        <div className="Game-board">
          <div className="Game-guess-row">
            {
              // this curly is a breakout
              // we've broken out of JSX back into js
              // then the map => will one-line return (JSX) wrapped in parens
              
              // because we're doing a map
              // the result div needs a key unique over the loop
              // react uses the key to tell when to rerender each component

              // you can see here that props can be strings (like html)
              // or can be computed in breakouts
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
              // don't comment in JSX even in breakouts
              // it's confusing, and your JSX should explain itself!
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

// export the class so someone else can compose it with tahini
// then render that into the root node or the routing
export default Game;

// read the FACEBOOK DOCS!
// https://facebook.github.io/react/docs/rendering-elements.html

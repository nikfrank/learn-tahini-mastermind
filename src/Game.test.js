import React from 'react';
import Game from './Game';

import { mount } from 'enzyme';
import { fromJS } from 'immutable';

import {
  bootStores,
  connectDeviceFactory,

  getNextState,
  toJS,
} from 'tahini';


const codeGen = ()=> [ 0, 2, 1, 3 ];

it('renders the current guess', () => {
  const state = fromJS({
    guess: [ 2, 3, 4, 5 ]
  });

  const p = mount(<Game subState={state}
                        setCode={jest.fn()}
                        randomCodeGenerator={codeGen}/>);

  const dots = p.find('.guess-dot');
  
  state.get('guess').forEach( (dot, i)=>
    expect( dots.at(i).hasClass('dot-'+dot) ).toEqual(true)
  );
});


it('provides up and down buttons for each dot', () => {
  const state = fromJS({
    guess: [ 2, 3, 4, 5 ]
  });

  const incGuessDot = jest.fn();
  const decGuessDot = jest.fn();

  const p = mount(<Game subState={state}
                        setCode={jest.fn()}
                        randomCodeGenerator={codeGen}
                        incGuessDot={incGuessDot}
                        decGuessDot={decGuessDot} />);

  const cols = p.find('.guess-col');

  cols.forEach( (col, i)=> {
    // click buttons, each expect call with index
    const buttons = col.find('button');

    const prevIncs = incGuessDot.mock.calls.length;
    buttons.at(0).simulate('click');
    expect( incGuessDot.mock.calls.length ).toEqual( prevIncs + 1 );

    const prevDecs = decGuessDot.mock.calls.length;
    buttons.at(1).simulate('click');
    expect( decGuessDot.mock.calls.length ).toEqual( prevDecs + 1 );
  });

  expect( incGuessDot.mock.calls.length ).toEqual( cols.length );
  expect( decGuessDot.mock.calls.length ).toEqual( cols.length );
});

it('provides a guess button', () => {
  const state = fromJS({
    guess: [ 2, 3, 4, 5 ]
  });

  const guess = jest.fn();

  const p = mount(<Game subState={state}
                        setCode={jest.fn()}
                        randomCodeGenerator={codeGen}
                        guess={guess}/>);

  const guessButton = p.find('.guess-button');

  expect( guessButton.length ).toEqual( 1 );

  guessButton.at(0).simulate('click');

  expect( guess.mock.calls.length ).toEqual( 1 );
});


it('user can set code to what he wants', () => {
  const stores = bootStores();
  
  const { getDevice } = connectDeviceFactory( stores );
  const { appStore } = stores;

  const dataPath = [];
  const GameD = getDevice(Game, dataPath, Game.initState);

  const p = mount(<GameD randomCodeGenerator={codeGen}/>);

  const state = appStore.getState();

  expect( state.get('guess') ).toEqual( Game.initState.get('guess') );
  

  return Promise
    .resolve()

    .then( ()=> p.find('.guess-col').at(0).find('button').at(0) )
    .then( getNextState(
      appStore,
      incButton => incButton.simulate('click')
    ) ).then(toJS)
    .then( state => {
      expect( state.guess[0] ).toEqual( 1 )
    })

    .then( ()=> p.find('.guess-col').at(3).find('button').at(1) )
    .then( getNextState(
      appStore,
      decButton => decButton.simulate('click')
    ) ).then(toJS)
    .then( state => {
      expect( state.guess[3] ).toEqual( 5 )
    });
});



it('user can guess as he pleases', () => {
  const stores = bootStores();
  
  const { getDevice } = connectDeviceFactory( stores );
  const { appStore } = stores;

  const dataPath = [];
  const GameD = getDevice(Game, dataPath, Game.initState);

  const p = mount(<GameD randomCodeGenerator={codeGen}/>);

  const state = appStore.getState();

  expect( state.get('guess') ).toEqual( Game.initState.get('guess') );
  

  return Promise
    .resolve()

    .then( ()=> p.find('.guess-col').at(0).find('button').at(1) )
    .then( getNextState(
      appStore,
      decButton => decButton.simulate('click')
    ) ).then(toJS)
    .then( state => {
      expect( state.guess[0] ).toEqual( 5 )
    })

    .then( ()=> p.find('button.guess-button').at(0) )
    .then( getNextState(
      appStore, guessButton => guessButton.simulate('click')
    ) ).then(toJS)
    .then( state => {
      expect( state.guess ).toEqual( [ 0, 0, 0, 0 ] );
      expect( state.guesses.length ).toEqual( 1 );
      expect( state.guesses[0].code ).toEqual( [ 5, 0, 0, 0 ] );
      expect( state.guesses[0].score ).toEqual( [ 0, 1 ] ); // code is [ 0, 2, 1, 3 ]

      expect( p.find('.Game-scored-guess').length ).toEqual( 1 );
      
      expect( p.find('.score-dot-black').length ).toEqual( 0 );
      expect( p.find('.score-dot-pink').length ).toEqual( 1 );
      expect( p.find('.score-dot-white').length ).toEqual( 3 );
    });
});


it('user can reset the game by hitting the header', () => {
  const stores = bootStores();
  
  const { getDevice } = connectDeviceFactory( stores );
  const { appStore } = stores;

  const dataPath = [];
  const GameD = getDevice(Game, dataPath, Game.initState);

  const p = mount(<GameD randomCodeGenerator={codeGen}/>);

  const state = appStore.getState();

  expect( state.get('guess') ).toEqual( Game.initState.get('guess') );
  

  return Promise
    .resolve()

    .then( ()=> p.find('.guess-col').at(0).find('button').at(1) )
    .then( getNextState(
      appStore,
      decButton => decButton.simulate('click')
    ) ).then(toJS)
    .then( state => {
      expect( state.guess[0] ).toEqual( 5 )
    })

    .then( ()=> p.find('button.guess-button').at(0) )
    .then( getNextState(
      appStore, guessButton => guessButton.simulate('click')
    ) ).then(toJS)
    .then( state => {
      expect( state.guess ).toEqual( [ 0, 0, 0, 0 ] );
      expect( state.guesses.length ).toEqual( 1 );
      expect( state.guesses[0].code ).toEqual( [ 5, 0, 0, 0 ] );
      expect( state.guesses[0].score ).toEqual( [ 0, 1 ] ); // code is [ 0, 2, 1, 3 ]

      expect( p.find('.Game-scored-guess').length ).toEqual( 1 );
      
      expect( p.find('.score-dot-black').length ).toEqual( 0 );
      expect( p.find('.score-dot-pink').length ).toEqual( 1 );
      expect( p.find('.score-dot-white').length ).toEqual( 3 );
    })

    .then( ()=> p.find('.Game-header') )
    .then( getNextState(
      appStore,
      header => header.simulate('click')
    ) ).then(toJS)
    .then( state => {
      expect( state.guesses.length ).toEqual( 0 )
    })
});

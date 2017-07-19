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


it('renders the current guess', () => {
  const state = fromJS({
    guess: [ 2, 3, 4, 5 ]
  });

  const p = mount(<Game subState={state}/>);

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

  const p = mount(<GameD />);

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
    })
  
});

import React from 'react';
import Game from './Game';

import { mount } from 'enzyme';
import { fromJS } from 'immutable';

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
  
});


it('user can set code to what he wants', () => {
  
});

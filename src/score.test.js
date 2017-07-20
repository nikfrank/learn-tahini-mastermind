import score from './score';
import { fromJS } from 'immutable';

const cases = [
  { code: [ 0, 0, 0, 0 ], guess: [ 0, 0, 0, 0 ], result: [ 4, 0 ] },
  { code: [ 0, 0, 0, 0 ], guess: [ 0, 0, 0, 1 ], result: [ 3, 0 ] },
  { code: [ 0, 0, 0, 0 ], guess: [ 0, 0, 1, 1 ], result: [ 2, 0 ] },
  { code: [ 0, 0, 0, 0 ], guess: [ 0, 1, 1, 1 ], result: [ 1, 0 ] },
  { code: [ 0, 0, 0, 0 ], guess: [ 1, 1, 1, 1 ], result: [ 0, 0 ] },

  
];


cases.forEach( ({ code, guess, result })=> {
  it('calculates the score correctly for case '+result.join(), () => {
    expect( score( fromJS(code), fromJS(guess) ) ).toEqual( result );
  });
});

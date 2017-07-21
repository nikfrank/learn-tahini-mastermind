import score from './score';
import { fromJS } from 'immutable';

const cases = [
  { code: [ 0, 0, 0, 0 ], guess: [ 0, 0, 0, 0 ], result: [ 4, 0 ] },
  { code: [ 0, 0, 0, 0 ], guess: [ 0, 0, 0, 1 ], result: [ 3, 0 ] },
  { code: [ 0, 0, 0, 0 ], guess: [ 0, 0, 1, 1 ], result: [ 2, 0 ] },
  { code: [ 0, 0, 0, 0 ], guess: [ 0, 1, 1, 1 ], result: [ 1, 0 ] },
  { code: [ 0, 0, 0, 0 ], guess: [ 1, 1, 1, 1 ], result: [ 0, 0 ] },

  
  { code: [ 0, 1, 2, 3 ], guess: [ 4, 0, 0, 0 ], result: [ 0, 1 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 4, 0, 0, 0 ], result: [ 0, 1 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 1, 4, 4, 4 ], result: [ 0, 1 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 4, 0, 2, 2 ], result: [ 0, 1 ] },
  { code: [ 0, 1, 1, 1 ], guess: [ 4, 0, 0, 0 ], result: [ 0, 1 ] },
  { code: [ 0, 1, 1, 1 ], guess: [ 1, 4, 4, 4 ], result: [ 0, 1 ] },
  
  { code: [ 0, 1, 2, 3 ], guess: [ 1, 0, 0, 0 ], result: [ 0, 2 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 1, 0, 0, 0 ], result: [ 0, 2 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 1, 4, 4, 1 ], result: [ 0, 2 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 4, 0, 2, 4 ], result: [ 0, 2 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 1, 0, 2, 2 ], result: [ 0, 2 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 2, 0, 2, 0 ], result: [ 0, 2 ] },
  { code: [ 0, 1, 1, 1 ], guess: [ 1, 0, 0, 0 ], result: [ 0, 2 ] },
  
  { code: [ 0, 1, 2, 3 ], guess: [ 1, 0, 3, 0 ], result: [ 0, 3 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 1, 0, 3, 1 ], result: [ 0, 3 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 1, 0, 2, 4 ], result: [ 0, 3 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 1, 0, 1, 4 ], result: [ 0, 3 ] },

  { code: [ 0, 1, 2, 3 ], guess: [ 1, 0, 3, 2 ], result: [ 0, 4 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 1, 0, 2, 1 ], result: [ 0, 4 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 1, 0, 1, 0 ], result: [ 0, 4 ] },


  { code: [ 0, 1, 2, 3 ], guess: [ 0, 0, 1, 0 ], result: [ 1, 1 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 0, 0, 2, 0 ], result: [ 1, 1 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 4, 1, 0, 4 ], result: [ 1, 1 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 1, 1, 4, 4 ], result: [ 1, 1 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 0, 0, 4, 4 ], result: [ 1, 1 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 0, 4, 1, 4 ], result: [ 1, 1 ] },
  { code: [ 0, 1, 1, 1 ], guess: [ 1, 1, 4, 4 ], result: [ 1, 1 ] },

  { code: [ 0, 1, 2, 3 ], guess: [ 0, 2, 1, 4 ], result: [ 1, 2 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 0, 2, 4, 1 ], result: [ 1, 2 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 2, 0, 1, 0 ], result: [ 1, 2 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 0, 0, 1, 2 ], result: [ 1, 2 ] },
  { code: [ 0, 1, 1, 1 ], guess: [ 1, 0, 1, 2 ], result: [ 1, 2 ] },
  
  { code: [ 0, 1, 2, 3 ], guess: [ 0, 2, 3, 1 ], result: [ 1, 3 ] },
  
  { code: [ 0, 1, 2, 3 ], guess: [ 0, 1, 3, 1 ], result: [ 2, 1 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 0, 1, 3, 1 ], result: [ 2, 1 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 3, 1, 1, 0 ], result: [ 2, 1 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 0, 1, 1, 2 ], result: [ 2, 1 ] },
  { code: [ 0, 1, 1, 1 ], guess: [ 1, 1, 1, 2 ], result: [ 2, 1 ] },
  
  { code: [ 0, 1, 2, 3 ], guess: [ 0, 1, 3, 2 ], result: [ 2, 2 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 0, 1, 2, 1 ], result: [ 2, 2 ] },
  { code: [ 0, 1, 1, 2 ], guess: [ 2, 1, 1, 0 ], result: [ 2, 2 ] },
  { code: [ 0, 1, 0, 1 ], guess: [ 0, 1, 1, 0 ], result: [ 2, 2 ] },
  { code: [ 0, 1, 1, 1 ], guess: [ 1, 0, 1, 1 ], result: [ 2, 2 ] },
  
];


cases.forEach( ({ code, guess, result })=> {
  it('calculates the score correctly for case '+result.join(), () => {
    expect( score( fromJS(code), fromJS(guess) ) ).toEqual( result );
  });
});

export default (code, guess)=>{
  const exactMatches = code.map((dot, i) => dot === guess.get(i));

  const restCode = code.filter( (c, i)=> !exactMatches.get(i) ).sort();
  const restGuess = guess.filter( (g, i)=> !exactMatches.get(i) ).sort();

  let lastFind = -1;
  let misses = 0;

  for( let i=0; i < restCode.size; i++){
    const foundIndex = restGuess.slice(lastFind + 1)
                                .indexOf( restCode.get(i) );

    if( foundIndex > -1 ){
      lastFind += foundIndex + 1;
      misses++;
    }
  }
  
  return [ exactMatches.filter(i => i).size, misses ];
};

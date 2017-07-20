export default (code, guess)=>{
  const exactMatches = code.map((dot, i) => dot === guess.get(i));
  
  return [ exactMatches.filter(i => i).size, 0 ];
};

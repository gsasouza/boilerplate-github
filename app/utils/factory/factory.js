const Factory = require('rosie').Factory;

function randomInt(numDigMax, numDigMin) {
  const max = Math.pow(10, numDigMax);
  const min = Math.pow(10, numDigMin);
  return Math.floor(Math.random() * (max)) + min;
}

Factory
  .define('user')
  .attr('username', () => randomInt(10, 5).toString())
  .attr('password', () => randomInt(10, 5).toString())
  .attr('name', () => randomInt(10, 5).toString());


export default Factory;

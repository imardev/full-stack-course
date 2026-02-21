function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setValue(funct, value) {
  funct(value);
}
export { getRandomInt, setValue };

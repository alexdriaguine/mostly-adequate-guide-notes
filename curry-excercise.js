  const _ = require('ramda')

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

const wordsUncurried = str => _.split(' ', str)

const words = _.split(' ')

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

const sentences = _.map(words)

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

const filterQsUncurried = xs => {
  return _.filter(x => {
    return x.match(/q/i)
  }, xs)
}

const match = what => str => str.match(what)
const filterQs = _.filter(match(/q/i))


// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
const _keepHighest = (x, y) => {
  return x >= y ? x : y;
};


// REFACTOR THIS ONE:
const maxUnRefactored = (xs) => {
  return _.reduce(function(acc, x) {
    return _keepHighest(acc, x);
  }, -Infinity, xs);
};

const max = _.reduce(_keepHighest, -Infinity)


// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
const slice = first => second => arr => arr.slice(first, second)


// Bonus 2:
// ============
// Use slice to define a function "take" that takes n elements from the beginning of the string. Make it curried.
// // Result for "Something" with n=4 should be "Some"
const take = howMany => arr => arr.filter((item, index) => index < howMany)

module.exports = {
  words,
  sentences,
  filterQs,
  max,
  slice,
  take
}
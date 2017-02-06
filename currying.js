const curry = require('lodash/curry')

function add(x) {
  return function(y) {
    return x + y
  }
}

const increment = add(1)
const addTen = add(10)

increment(1) // => 2
addTen(2) // => 12

const match = curry((what, str) => str.match(what))
const replace = curry((what, replacement, str) => str.replace(what, replacement))
const filter = curry((f, arr) => arr.filter(f))
const map = curry((f, arr) => arr.map(f))

console.log(match(/\s+/g, 'hello world'))

const hasSpaces = match(/\s+/g)
console.log(hasSpaces('Hello World'))
console.log(hasSpaces('spaceless'))

console.log(filter(hasSpaces, ['tori spelling', 'no_spaces']))
const findSpaces = filter(hasSpaces)
console.log(findSpaces(['has spaces', 'no_spaces']))

const noVowels = replace(/[aeuouy]/ig)
const censored = noVowels('*')

console.log(censored('Chocolate Rain'))

const getFoo = x => x.foo
const bar = {
  foo: 'Hello'
}
console.log(getFoo(bar))

const allTheFoos = map(getFoo)

const bars = [
  bar,
  {
    foo: 'Bye'
  }
]

console.log(allTheFoos(bars))

const _filter = x => x > 5

const filter2 = filterFn => arr => arr.filter(filterFn)
const max5 = filter2(_filter)
const arr = [1, 2, 5, 6, 7, 8]
console.log(max5(arr))


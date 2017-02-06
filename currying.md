# Currying
The concept is simple, you can call a function with fewer arguments than it expects, and
it returns a function that takes the remaining arguments.

This function takes one argument and returns a function. Calling this function with both arguments 
is a bit of a pain, so we can use a speciel helper function from lodash called curry.

The returned function remembers the first argument via closures.

```javascript
function add(x) {
  return function(y) {
    return x + y
  }
}

const increment = add(1)
const addTen = add(10)

increment(1) // => 2
addTen(2) // => 12
```

```javascript
const curry = require('lodash/curry')

const match = curry((what, str) => str.match(what))
const replace = curry((what, replacement, str) => str.replace(what, replacement))
const filter = curry((f, arr) => arr.filter(f))
const map = curry((f, arr) => arr.map(f))

match(/\s+/g, 'hello world') // [' ']

const hasSpaces = match(/\s+/g)
hasSpaces('Hello World') // [' ']
hasSpaces('spaceless') // null

filter(hasSpaces, ['tori spelling', 'no_spaces']) // ['tori spelling']
const findSpaces = filter(hasSpaces)
findSpaces(['has spaces', 'no_spaces']) // ['has spaces']

const noVowels = replace(/[aeuouy]/ig)
const censored = noVowels('*')

censored('Chocolate Rain') // Ch*c*l*t* R**n
```

This is the ability to "pre-load" a function with an argument or two in order to receive a new functin
that remembers those arguments.

Currying is useful for many things, we can make new functions by giving the base functions some arguments.
We can also transforn any function that works on single elements into a function that works on arrays.

```javascript
const getFoo = x => x.foo
const bar = {
  foo: 'Hello'
}
getFoo(bar) // Hello

const allTheFoos = map(getFoo)

const bars = [
  bar,
  {
    foo: 'Bye'
  }
]

allTheFoos(bars) // ['Hello', 'Bye']

```
Giving a function fewer arguments than it expects is typically called partial application.
Partially applying a function can remove boilerplate code.
We typically dont define functions that work on arrays, because we can use the Higher order functions
like map, sort and filter.

Pure functions take 1 input and returns 1 output. Currying does exactly this.
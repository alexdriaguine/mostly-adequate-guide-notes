# Pure functions
A pure functions is a function that, given the same input, will always return the same output and does not have any observable side effects.

Take slice and splice. Two functions that do the exact same thing - but in a different way.   
Slice is pure because it returns the same output per input every time.  
Splice is impure, it mutates the array

```javascript
const xs = [1, 2, 3, 4, 6]

// pure
xs.slice(0, 3) // => [1, 2, 3]
xs.slice(0, 3) // => [1, 2, 3]
xs.slice(0, 3) // => [1, 2, 3]

// impure
xs.splice(0, 3) // => [1, 2, 3]
xs.splice(0, 3) // => [4, 5]
xs.splice(0, 3) // => []
```

Functional programming dislikes methods like splice that mutates data.  
Mutating functions are not reliable as functions that return the same result every time.

Another example

```javascript
// impure
let minimum = 21
const checkAge = age => {
  return age >= minimum
}

// pure
const checkAge = age => {
  const minimum = 21
  return age >= minimum
}
```
The impure function depoends on the mutable variable minimum. It depends on system state.  
The pure form on the other hand is completely self sufficient. 

## Sife effects
We'll be referring to effect as anything that occurs in our computation other than the calculation of a result.  
There is nothing bad abound effects and we will be using them all over the place. Its the side part that sucks.  

A side effect is a change of system state or observable interaction with the outside world that occurs during the calculation of a result.  
Side effects may include
* changing the file system
* inserting a record into a database
* making an http call
* mutations
* printint to the screen / logging
* obtaining user input
* queriuing the DOM
* accessing system state  

And the list goes on and on and one.   
It is not forbidden to use them, rather we want to cntain them and run them in a controlled way.  
Side effectsd disqualify a function from being pure. 

## 8th grade math
> A function is a special relationship between values: Each of its input values gives back exactly one output value  
In other words, it just a relation between two values, the input and the output.  
Functions can be described as a set of pairs with the position (input, output): [(1,2), (3,6), (5,10)] (It appears this function doubles its input). 

Since functions are simply mappings of input to output, one could simply jot down object literals and run the with [] instead of ()

```javascript
const toLowerCase = {
  'A': 'a',
  'B': 'b',
  'C': 'c',
  'D': 'd',
  'E': 'e',
  'F': 'f',
}

toLowerCase['C'] // => 'c'

const isPrime = {
  1: false,
  2: true,
  3: true,
  4: false,
  5: true,
  6: false,
}

isPrime[3] // => true
```
Of course this approach is not viable, but this approach illustrates a different way to think about functions.  


Pure functions are mathematical functions and they are what FP is all about.

## The case for purity
### Cacheable
Pure functions can always be cached by input. Often done using a technique called memoization. 

```javascript
const squareNumber = memoize(x => x * x)

squareNumber(4) // => 16
squareNumber(4) // => 16, returns cache for input 4

squareNumber(5) // => 25
squareNumber(5) // => 25, return cache for input 5

// a simplified implementation of memoize
function memoize(f) {
  const cache = {}

  return function() {
    const arg_str = JSON.stringify(arguments)
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments)
    return cache[arg_str]
  }
}
```

You can transform some impure functions into pure ones by delaying evalution
We dont actually make the http call, instead we return a function that will doso when called. This function
is pure because it will always return the same output given the same input: the function that will make the
particular http call given the url and params

```javascript
const pureHttpCall = memoize((url, params) => {
  return function() {
    return $.getJSON(url, params)
  }
})
```

### Portable / Self-Documenting
Pure functions are completely self conitained. A functions deps are explicit and therefor easier to see and understand. 
The example here demonstrates that the pure function must be hones about its deps and tell us exacly what its up to.   
We also forced to "inject" the dpenendencies, pass them as arguments. This makes the function more flexible, since 
we can take it in to another app and just pass the stuf it needs to work.  
In JS, portability could mean serializing and sending functions over a socket. 

```javascript
// impure
const signUp = attrs => {
  const user = saveUser(attrs)
  welcomeUser(user)
}

const saveUser = attrs => {
  const user = Db.save(user)
  ...
}

const welcomeUser = user => {
  Email(user,...)
  ...
}

// pure
const signUp = (Db, Email, attrs) => {
  return function() {
    const user = saveUser(Db, attrs)
    welcomeUser(Email, user)
  }
}

const saveUser = (Db, attrs) => {
  ...
}

const welcomeUser = (Email, user) => {
  ...
}
```

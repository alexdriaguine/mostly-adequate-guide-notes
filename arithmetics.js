/**
 * Chapter 1
 * arithmetics
 */

const add = (a, b) => a + b
const multiply = (a, b) => a * b

const a = 4
const b = 2
const c = 0

const result = add(
  multiply(b, add(a, c)), 
  multiply(a, b)
) // => 16


/**
 * Laws of arithmetics
 */
 
const x = 1
const y = 2
const z = 3

// associative, (1 + 2) + 3 === 1 + (2 + 3)
const associative = add(add(x, y), z) === add(x, add(y, z)) // => 6 === 6 

// commutative, 1 + 2 === 2 + 1
const commutative = add(x, y) === add(y, x) // => 3 === 3 


// identity, 1 + 0 === 1
const identity = add(x, 0) === x // => 1 + 0 === 1 

// distributive, 1 * (2 + 3) === 1 * 2 + 1 * 3
const distributive = multiply(x, add(y,z)) === add(multiply(x, y), multiply(x, z)) // => 


// Apply these rules to the original add
const original = add(multiply(b, add(a, c)), multiply(a, b)) // => 16

// Apply identity property to remove the extra add
// add(a, c) == a since c = 0
const withIdentity = add(multiply(b, a), multiply(a, b)) // => 16

// Apply distributive property
// b * a + a * b = b * (a + a)
const withDistributive = multiply(b, add(a, a)) // => 16
# Arithmetic laws
add and multiply described in a functional way
notice since functions can take functions as arguments
this works in js

```javascript
const add = (a, b) => a + b
const multiply = (a, b) => a * b

const a = 4
const b = 2
const c = 0

const result = add(
  multiply(b, add(a, c)), 
  multiply(a, b)
) // => 16
```

Basics of arithmetic rules
```javascript 
const x = 1
const y = 2
const z = 3
```
#### Associative
```javascript
// associative, (1 + 2) + 3 === 1 + (2 + 3)
const associative = add(add(x, y), z) === add(x, add(y, z)) // => 6 === 6 
```

#### Commutative
```javascript
// commutative, 1 + 2 === 2 + 1
const commutative = add(x, y) === add(y, x) // => 3 === 3 
```

#### Identity
```javascript
// identity, 1 + 0 === 1
const identity = add(x, 0) === x // => 1 + 0 === 1 
```

#### Distributive
```javascript
// distributive, 1 * (2 + 3) === 1 * 2 + 1 * 3
const distributive = multiply(x, add(y,z)) === add(multiply(x, y), multiply(x, z)) 
```

#### Applying these rules to make the original computation more simple
```javascript
// Apply these rules to the original add
const original = add(multiply(b, add(a, c)), multiply(a, b)) // => 16
```
```javascript
// Apply identity property to remove the extra add
// add(a, c) == a since c = 0
const withIdentity = add(multiply(b, a), multiply(a, b)) // => 16
```
```javascript

// Apply distributive property
// b * a + a * b = b * (a + a)
const withDistributive = multiply(b, add(a, a)) // => 16
```
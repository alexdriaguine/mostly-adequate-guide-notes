# First class functions
Functions can be treated like any other data type.  
They may be stored in arrays, passed around as arguments, assigned to variables and what not

```javascript
const hi = name => {
  return `Hi ${name}`
}
```

Wrapper around hi here is redundant.  
Functions are callable, when hi has () at the end it returns a value, but when not it simply returns the function.   
This is obnoxious, verbose and bad practice to surround a function just to delay evaluation  

```javascript
const badGreeting = name => {
  return hi(name)
}


console.log(hi) // => function(name) {...}
console.log(hi('Alex')) // => "Hi Alex"

// This is better, just assign the function to a variable
const betterGreeting = hi

console.log(betterGreeting('Alex')) // => "Hi Alex"



// another ignorant example
const ajaxCall = json => console.log(json)

const getServerStuf = callback => {
  return ajaxCall(json => callback(json))
}

// better
const getServerStufs = ajaxCall

getServerStufs({ foo: 'baz'})

// this line
return ajaxCall(json => callback(json))

// is the same as this line
return ajaxCall(callback)

// so refactor getServerStuf
const getServerStuf = callback => ajaxCall(callback)

// which is equivalent to this
const getServerStuf = ajaxCall

```

Another example of redudant shit

```javascript
const Controller = (() => {
  const index = posts => {
    return Views.index(posts)
  }

  const show = post => {
    return Views.show(posts)
  }

  const create = attrs => {
    return Db.create(attrs)
  }

  const destroy = post) {
    return Db.destroy(post)
  }

  return {
    index,
    show,
    create,
    update,
    destroy,
  }
})
```
Could be rewritten

```javascript
const Controller = {
  index: Views.index,
  show: Views.show,
  create: Db.create,
  update: Db.update,
  destroy: Db.destroy,
}
```

## Why favor first class functions?
It is easy to add layers of indirection that provide no added value and only increase the amount of redundant code to maintain and search through.  
In addition, such a needlessly wrapped function must be changed, we must also change our wrapper function as well

```javascript
httpGet('/post/2', json => {
  return renderPost(json)
})
```

If httpGet needs to change and take a possible error, both signatures would need to be changed

```javascript
httpGet('/post/2', (json, err) => {
  return renderPost(json, err)
})
```

A first class function, less would need to change

```javascript
// renderPost is called from withing httpGet with however many arguments it wants
httpGet('/post/2', renderPost)
```
Besides removal of unnessecary functions, we must name and reference arguments.  
Having multiple names for the same concept is a common source of confusion.  
There is also the issue of generic code. Take these two functions that do exactly the same thing.

```javascript
const validArticles = articles => {
  return articles.filter(article => {
    return article !== null && article !== undefined
  })
}

// this is more relevant for future projects
const compact = xs => {
  return xs.filter(x => {
    return x !== null && x !== undefined
  })
}

// or even more nice with es6 implicit return

const compact = xs => xs.filter(x => x !== null && x !== undefined)
```

Just like with OO-code, you must be aware of this coming to bite you in the ass.  
If an underlying function uses this and we call it first class, we are subject to leaky abstractions wrath.  
Having Db bound to itself, it is free to access its prototypical garbage code.  
Avoid using this! There is no need when writing functional code. But when interfacing with library code,
you might want to bind stuf

```javascript
import fs from 'fs'

// scary
fs.readFile('freaky_friday.txt', Db.save)

// less so
fs.readFile('freaky_friday.txt', Db.save.bind(Db))
```
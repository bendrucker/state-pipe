# state-pipe [![Build Status](https://travis-ci.org/bendrucker/state-pipe.svg?branch=master)](https://travis-ci.org/bendrucker/state-pipe) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/state-pipe.svg)](https://greenkeeper.io/)

> Declare a set of pipes and transformations for passing observable state in an application


## Install

```
$ npm install --save state-pipe
```


## Usage

```js
var StatePipe = require('state-pipe')
var pipe = StatePipe({
  'foo.bar': [times10, 'fooDest']
})

function times10 (value) {
  return value * 10
}

var state = Struct({
  foo: Struct({
    bar: Observ(1)
  }),
  fooDest: Observ()
})


state.fooDest()
//=> 10

state.foo.bar.set(2)
state.fooDest()
//=> 20
```

## API

#### `StatePipe(data)` -> `function`

Returns an unlisten function.

##### data

*Required*  
Type: `object`

Key-value mappings between state properties. The keys represent the source observables while the values can be:

* a string (the destination observable)
* an array where the last entry is the destination observable and the previous entries are functions that will transform the source value


## License

MIT © [Ben Drucker](http://bendrucker.me)

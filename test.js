'use strict'

var test = require('tape')
var Struct = require('observ-struct')
var Observ = require('observ')
var StatePipe = require('./')

test(function (t) {
  var pipe = StatePipe({
    'foo.bar': 'fooDest',
    'bar.baz': 'barDest'
  })

  var state = Struct({
    foo: Struct({
      bar: Observ(1)
    }),
    bar: Struct({
      baz: Observ(2)
    }),
    fooDest: Observ(),
    barDest: Observ()
  })

  var unlisten = pipe(state)

  t.equal(state.fooDest(), 1)
  t.equal(state.barDest(), 2)

  state.foo.bar.set(10)
  state.bar.baz.set(20)

  t.equal(state.fooDest(), 10)
  t.equal(state.barDest(), 20)

  unlisten()

  state.foo.bar.set(100)
  state.bar.baz.set(200)

  t.equal(state.fooDest(), 10)
  t.equal(state.barDest(), 20)

  t.end()
})

'use strict'

var pipe = require('value-pipe')
var map = require('map-values')
var values = require('object-values')
var all = require('call-all-fns')
var get = require('value-get')
var watch = require('observ/watch')
var array = require('cast-array')
var last = require('array-last')

module.exports = StatePipe

function StatePipe (data) {
  return pipe(listen, values, all)

  function listen (state) {
    return map(data, function (fns, key) {
      return watch(get(key, state), Transform(state, fns))
    })
  }
}

function Transform (state, fns) {
  fns = array(fns)

  return pipe(
    pipe(fns.slice(0, -1)),
    get(last(fns), state).set
  )
}

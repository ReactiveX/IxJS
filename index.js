'use strict';

var Iterable = require('./iterable');
var AsyncIterable = require('./asynciterable');

Iterable.addToObject({
  defer: require('./iterable/defer'),
  from: require('./iterable/from'),
  generate: require('./iterable/generate'),
  of: require('./iterable/of'),
  range: require('./iterable/range'),
  repeatValue: require('./iterable/repeatvalue'),
  zip: require('./iterable/zip')
});

Iterable.addToPrototype({
  concat: require('./iterable/concat'),
  count: require('./iterable/count'),
  every: require('./iterable/every'),
  filter: require('./iterable/filter'),
  flatMap: require('./iterable/flatmap'),
  includes: require('./iterable/includes'),
  map: require('./iterable/map'),
  reduce: require('./iterable/reduce'),
  scan: require('./iterable/scan'),
  skip: require('./iterable/skip'),
  skipLast: require('./iterable/skiplast'),
  skipWhile: require('./iterable/skipwhile'),
  some: require('./iterable/some'),
  take: require('./iterable/take'),
  takeLast: require('./iterable/takelast'),
  takeWhile: require('./iterable/takewhile'),
  tap: require('./iterable/tap'),
  zip: require('./iterable/zip')
});

AsyncIterable.addToObject({
  from: require('./asynciterable/from')
});

AsyncIterable.addToPrototype({
  filter: require('./asynciterable/filter'),
  map: require('./asynciterable/map')
});

module.exports = {
  Iterator: require('./iterator'),
  Iterable: Iterable,
  AsyncIterator: require('./asynciterator'),
  AsyncIterable: AsyncIterable
};

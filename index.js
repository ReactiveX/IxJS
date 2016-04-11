'use strict';

var Iterable = require('./iterable');
var AsyncIterable = require('./asynciterable');

Iterable.addToObject({
  from: require('./iterable/from'),
  of: require('./iterable/of'),
  range: require('./iterable/range'),
  repeatValue: require('./iterable/repeatvalue')
});

Iterable.addToPrototype({
  every: require('./iterable/every'),
  filter: require('./iterable/filter'),
  flatMap: require('./iterable/flatmap'),
  includes: require('./iterable/includes'),
  map: require('./iterable/map'),
  reduce: require('./iterable/reduce'),
  scan: require('./iterable/scan'),
  skip: require('./iterable/skip'),
  some: require('./iterable/some'),
  take: require('./iterable/take'),
  takeLast: require('./iterable/takelast'),
  tap: require('./iterable/tap')
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

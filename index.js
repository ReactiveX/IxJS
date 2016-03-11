'use strict';

var Iterable = require('./iterable');

Iterable.addToObject({
  from: require('./iterable/from'),
  of: require('./iterable/of'),
  range: require('./iterable/range')
});

Iterable.addToPrototype({
  every: require('./iterable/every'),
  filter: require('./iterable/filter'),
  flatMap: require('./iterable/flatmap'),
  includes: require('./iterable/includes'),
  map: require('./iterable/map'),
  reduce: require('./iterable/reduce'),
  scan: require('./iterable/scan'),
  some: require('./iterable/some'),
  takeLast: require('./iterable/takelast'),
  tap: require('./iterable/tap')
});

module.exports = {
  Iterator: require('./iterator'),
  Iterable: Iterable,
};

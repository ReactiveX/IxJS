'use strict';

var Benchmark = require('benchmark');

// Libraries
var lodash = require('lodash');
var iterable = require('..').Iterable;

var n = 1000000;
var a = new Array(n);
for(var i = 0; i < a.length; ++i) {
	a[i] = i;
}

function add1(x) {
	return x + 1;
}

function add5(x) {
  return x + 5;
}

function even(x) {
	return x % 2 === 0;
}

function sum(x, y) {
	return x + y;
}

var suite = Benchmark.Suite('filter -> map -> reduce ' + n + ' integers');

suite
  .add('ixjs', function () {
    return iterable(a).filter(even).map(add1).map(add5).reduce(sum, 0);
  })
	.add('lodash', function() {
		return lodash(a).filter(even).map(add1).map(add5).reduce(sum, 0);
	})
	.add('Array', function() {
		return a.filter(even).map(add1).map(add5).reduce(sum, 0);
	})
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
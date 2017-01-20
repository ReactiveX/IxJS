'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var inherits = require('inherits');

function BufferIterator(it, count, skip) {
  Iterator.call(this, it);
  this._count = count;
  this._skip = skip;
  this._q = [];
  this._i = 0;
  this._hv = false;
}

inherits(BufferIterator, Iterator);

BufferIterator.prototype.next = function () {
  while (1) {
    this._hv && this._i++; 
    
    var next = this._it.next();
    if (next.done) {
      return this._q.length > 0 ?
        { done: false, value: this._q.shift() } :
        { done: true, value: undefined };
    }
    
    this._hv = true;
    
    this._i % this._skip === 0 && this._q.push([]);
    for (var i = 0; i < this._q.length; i++) { this._q[i].push(next.value); }
    if (this._q.length > 0 && this._q[0].length === this._count) {
      return { done: false, value: this._q.shift() };
    }    
  }
};

function BufferIterable(source, count, skip) {
  Iterable.call(this, source);
  this._count = count;
  this._skip = skip;
}

inherits(BufferIterable, Iterable);

BufferIterable.prototype[$iterator$] = function () {
  return new BufferIterator(this._source[$iterator$](), this._count, this._skip);
};

module.exports = function buffer (source, count, skip) {
  skip === undefined (skip = count);
  return new BufferIterable(source, count, skip);
};
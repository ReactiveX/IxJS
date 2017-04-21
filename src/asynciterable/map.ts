'use strict';

//import { AsyncIterableX } from '../asynciterable';
import { AsyncIteratorX } from '../asynciterator';
import { bindCallback } from '../internal/bindcallback';

export class AsyncMapIterator<TSource, TResult> extends AsyncIteratorX<TResult> {
  private _it: AsyncIterator<TSource>;
  private _fn: (value: TSource, index: number) => TResult;
  private _i: number;

  constructor(
      it: AsyncIterator<TSource>,
      fn: (value: TSource, index: number) => TResult,
      thisArg?: any) {
    super();
    this._it = it;
    this._fn = bindCallback(fn, thisArg, 2);
    this._i = 0;
  }

  _next() {
    this._it.next().then(next => {
      if (next.done) { return this._settle('return', undefined); }
      this._settle('normal', this._fn(next.value, this._i++));
    }).catch(error => {
      this._settle('throw', error);
    });
  }
}

// function AsyncMapIterator(it, fn) {
//   AsyncIterator.call(this);
//   this._it = it;
//   this._fn = fn;
//   this._i = 0;
// }

// inherits(AsyncMapIterator, AsyncIterator);

// AsyncMapIterator.prototype._next = function () {
//   var self = this;
//   this._it.next().then(function (next) {
//     if (next.done) { return self._settle('return', next.value); }
//     self._settle('normal', self._fn(next.value, self._i++));
//   }).catch(function (error) {
//     self._settle('throw', error);
//   });
// };

// function innerMap(fn, self) {
//   return function (x, i) { return fn.call(this, self._fn(x, i), i); };
// }

// function AsyncMapIterable(source, fn, thisArg) {
//   AsyncIterable.call(this);
//   this._source = source;
//   this._fn = bindCallback(fn, thisArg, 2);
// }

// inherits(AsyncMapIterable, AsyncIterable);

// AsyncMapIterable.prototype[$asyncIterator$] = function () {
//   return new AsyncMapIterator(this._source[$asyncIterator$](), this._fn);
// };

// AsyncMapIterable.prototype.internalMap = function (fn, thisArg) {
//   return new AsyncMapIterable(this._source, innerMap(fn, this), thisArg);
// };

// module.exports = function map (source, fn, thisArg) {
//   return source instanceof AsyncMapIterable ?
//     source.internalMap(fn, thisArg) :
//     new AsyncMapIterable(source, fn, thisArg);
// };

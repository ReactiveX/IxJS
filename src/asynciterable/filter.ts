'use strict';

import { AsyncIterableX } from '../asynciterable';
import { AsyncIteratorX } from '../asynciterator';
import { bindCallback } from '../internal/bindcallback';

export class AsyncFilterIterator<TSource> extends AsyncIteratorX<TSource> {
  private _it: AsyncIterator<TSource>;
  private _fn: (value: TSource, index: number) => boolean;
  private _i: number;

  constructor(
    it: AsyncIterator<TSource>,
    fn: (value: TSource, index: number) => boolean,
    thisArg?: any) {
    super();
    this._it = it;
    this._fn = bindCallback(fn, thisArg, 2);
    this._i = 0;
  }

  _next() {
    function recurse(self: AsyncFilterIterator<TSource>) {
      self._it.next().then(next => {
        if (next.done) { self._settle('return', next.value); return; }
        if (self._fn(next.value, self._i++)) {
          self._settle('normal', next.value);
        } else {
          recurse(self);
        }
      }).catch(error => {
        self._settle('throw', error);
      });
    }

    recurse(this);
  }
}

export class AsyncFilterIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _fn: (value: TSource, index: number) => boolean;
  private _thisArg?: any;

  constructor(
    source: AsyncIterable<TSource>,
    fn: (value: TSource, index: number) => boolean,
    thisArg?: any) {
    super();
    this._source = source;
    this._fn = fn;
    this._thisArg = thisArg;
  }

  [Symbol.asyncIterator]() {
    return new AsyncFilterIterator<TSource>(this._source[Symbol.asyncIterator](), this._fn, this._thisArg);
  }
}

export function filter<TSource>(
    source: AsyncIterable<TSource>,
    fn: (value: TSource, index: number) => boolean,
    thisArg?: any): AsyncIterableX<TSource> {
  return new AsyncFilterIterable<TSource>(source, fn, thisArg);
}
'use strict';

import { Iterable, IIterable } from '../iterable';
import { Iterator, IIterator } from '../iterator';
import { bindCallback } from '../internal/bindcallback';

class MapIterator extends Iterator {
  private _it: IIterator;
  private _fn: (value: any, index: number) => any;
  private _i: number;

  constructor(it: IIterator, fn: (value: any, index: number) => any) {
    super();
    this._it = it;
    this._fn = fn;
    this._i = 0;
  }

  next() {
    const next = this._it.next();
    if (next.done) { return { done: true, value: next.value }; }
    return { done: false, value: this._fn(next.value, this._i++) };    
  }
}

class MapIterable extends Iterable {
  private _source: IIterable;
  private _fn: (value: any, index: number) => any;
  
  constructor(source: IIterable, fn: (value: any, index: number) => any, thisArg?: any) {
    super();
    this._source = source;
    this._fn = bindCallback(fn, thisArg, 2);
  }

  private innerMap(fn: (value: any, index: number) => any): any {
    const self = this;
    return function (x, i) { return fn.call(this, self._fn(x, i), i); };
  }

  [Symbol.iterator]() {
    return new MapIterator(this._source[Symbol.iterator](), this._fn);
  }

  internalMap(fn: (value: any, index: number) => any, thisArg?: any): MapIterable {
    return new MapIterable(this._source, this.innerMap(fn), thisArg);
  }
}

export function map(
    source: IIterable, 
    fn: (value: any, index: number) => any, 
    thisArg?: any): Iterable {
  return source instanceof MapIterable ?
    source.internalMap(fn, thisArg) :
    new MapIterable(source, fn, thisArg);
}
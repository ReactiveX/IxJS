'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class ScanIterator<TAccumulate, TSource> extends Iterator<TAccumulate | TSource> {
  private _it: IIterator<TSource>;
  private _fn: (acc: TAccumulate | TSource, x: TSource, index: number) => TAccumulate;
  private _hs: boolean;
  private _i: number;
  private _v: TAccumulate | TSource;

  constructor(
      it: IIterator<TSource>, 
      fn: (acc: TAccumulate, x: TSource, index: number) => TAccumulate,
      seed?: TAccumulate) {
    super();
    this._it = it;
    this._fn = fn;
    this._i = 0;
    this._hs = arguments.length == 3;
    this._v = seed;
  }

  next() {
    let next = this._it.next();
    if (next.done) { return { done: true, value: undefined}; }
    if (!this._hs) {
      this._v = next.value;
    } else {
      this._v = this._fn(this._v, next.value, ++this._i);
    }

    return { done: false, value: this._v };    
  }
}

export class ScanIterable<TAccumulate, TSource> extends Iterable<TAccumulate | TSource> {
  private _source: IIterable<TSource>;
  private _fn: (acc: TAccumulate | TSource, x: TSource, index: number) => TAccumulate;
  private _v: any;
  private _hv: boolean;

  constructor(
      source: IIterable<TSource>, 
      fn: (acc: TAccumulate, x: TSource, index: number) => TAccumulate, 
      seed?: TAccumulate) {
    super();
    this._source = source;
    this._fn = fn;
    this._v = seed;
    this._hv = arguments.length === 3;
  }

  [Symbol.iterator]() {
    return this._hv ?
      new ScanIterator<TAccumulate, TSource>(this._source[Symbol.iterator](), this._fn, this._v) :
      new ScanIterator<TAccumulate, TSource>(this._source[Symbol.iterator](), this._fn);
  }
}

function scan<TAccumulate, TSource>(
      source: IIterable<TSource>, 
      fn: (acc: TAccumulate | TSource, x: TSource, index: number) => TAccumulate, 
      seed?: TAccumulate): Iterable<TAccumulate | TSource> {
    if (arguments.length === 3) {
      return new ScanIterable(source, fn, seed);
    } else {
      return new ScanIterable(source, fn);
    }
};

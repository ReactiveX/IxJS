/*
'use strict';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class TapIterator<T> extends IteratorX<T> {
  private _it: Iterator<T>;
  private _obs: PartialObserver<T>;
  private _i: 0;

  constructor(it: Iterator<T>, obs: PartialObserver<T>) {
    super();
    this._it = it;
    this._obs = obs;
    this._i = 0;
  }

  _next() {
    let next;
    try {
      next = this._it.next();
    } catch (e) {
      return this._obs.error(e);
    }
    if (next.done) {
      this._obs.complete();
      return next;
    }
    this._obs.next(next.value);
    return { done: false, value: next.value };
  }
}

export class TapIterable<T> extends IterableX<T> {
  private _source: Iterable<T>;
  private _obs: PartialObserver<T>;

  constructor(source: Iterable<T>, obs: PartialObserver<T>) {
    super();
    this._source = source;
    this._obs = obs;
  }

  [Symbol.iterator]() {
    return new TapIterator<T>(this._source[Symbol.iterator](), this._obs);
  }
}

export function tap<T>(source: Iterable<T>, obs: PartialObserver<T>): Iterable<T> {
  return new TapIterable<T>(source, obs);
}
*/
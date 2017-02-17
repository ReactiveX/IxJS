'use strict';

import { IIterable, IIterator, PartialObserver } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class TapIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _obs: PartialObserver<T>;
  private _i: 0;

  constructor(it: IIterator<T>, obs: PartialObserver<T>) {
    super();
    this._it = it;
    this._obs = obs;
    this._i = 0;
  }

  next() {
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

export class TapIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _obs: PartialObserver<T>;

  constructor(source: IIterable<T>, obs: PartialObserver<T>) {
    super();
    this._source = source;
    this._obs = obs;
  }

  [Symbol.iterator]() {
    return new TapIterator<T>(this._source[Symbol.iterator](), this._obs);
  }
}

export function tap<T>(source: IIterable<T>, obs: PartialObserver<T>): Iterable<T> {
  return new TapIterable<T>(source, obs);
}
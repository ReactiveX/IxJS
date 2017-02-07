'use strict';

import { IIterable, Iterable } from '../iterable';
import { IIterator, Iterator } from '../iterator';
import { doneIterator } from '../internal/doneiterator';

class GenerateIterator<T> extends Iterator<T> {
  private _i: T;
  private _condFn: (value: T) => boolean;
  private _iterFn: (value: T) => T;
  
}

function GenerateIterator(i, condFn, iterFn, resFn) {
  this._i = i;
  this._confFn = condFn;
  this._iterFn = iterFn;
  this._resFn = resFn;
  this._hasRes = false;
  Iterator.call(this);
}

inherits(GenerateIterator, Iterator);

GenerateIterator.prototype.next = function () {
  this._hasRes && (this._i = this._iterFn(this._i));
  if (!this._condFn(this._i)) { return doneIterator; }
  this._hasRes = true;
  return { done: false, value: this._resFn(this._i) };
};

function GenerateIterable(i, condFn, iterFn, resFn) {
  this._i = i;
  this._condFn = condFn;
  this._iterFn = iterFn;
  this._resFn = resFn;
  Iterable.call(this);
}

inherits(GenerateIterable, Iterable);

GenerateIterable.prototype[Symbol.iterator] = function () {
  return new GenerateIterator(this._i, this._condFn, this._iterFn, this._resFn);
};

export function generate (i, condFn, iterFn, resFn) {
  return new GenerateIterable(i, condFn, iterFn, resFn);
}

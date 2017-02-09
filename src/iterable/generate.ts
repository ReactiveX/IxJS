'use strict';

import { IIterable, Iterable } from '../iterable';
import { IIterator, Iterator } from '../iterator';
import { doneIterator } from '../internal/doneiterator';

class GenerateIterator extends Iterator {
  private _i: any;
  private _condFn: (value: any) => boolean;
  private _iterFn: (value: any) => any;
  private _resFn: (value: any) => any;
  private _hasRes: boolean;

  constructor(i: any, condFn: (value: any) => boolean, iterFn: (value: any) => any, resFn: (value: any) => any) {
    super();
    this._i = i;
    this._condFn = condFn;
    this._iterFn = iterFn;
    this._resFn = resFn;
    this._hasRes = false;
  }

  next() {
    this._hasRes && (this._i = this._iterFn(this._i));
    if (!this._condFn(this._i)) { return doneIterator; }
    this._hasRes = true;
    return { done: false, value: this._resFn(this._i) };
  }
}

class GenerateIterable extends Iterable {
  private _i: any;
  private _condFn: (value: any) => boolean;
  private _iterFn: (value: any) => any;
  private _resFn: (value: any) => any;

  constructor(i: any, condFn: (value: any) => boolean, iterFn: (value: any) => any, resFn: (value: any) => any) {
    super();
    this._i = i;
    this._condFn = condFn;
    this._iterFn = iterFn;
    this._resFn = resFn;
  }

  [Symbol.iterator]() {
    return new GenerateIterator(this._i, this._condFn, this._iterFn, this._resFn);
  }
}

export function generate(
    i: any, 
    condFn: (value: any) => boolean, 
    iterFn: (value: any) => any, 
    resFn: (value: any) => any): IIterable {
  return new GenerateIterable(i, condFn, iterFn, resFn);
}

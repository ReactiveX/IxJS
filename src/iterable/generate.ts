'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

const doneIterator = { done: true, value: undefined };

class GenerateIterator<TState, TResult> extends Iterator<TResult> {
  private _i: TState;
  private _condFn: (value: TState) => boolean;
  private _iterFn: (value: TState) => TState;
  private _resFn: (value: TState) => TResult;
  private _hasRes: boolean;

  constructor(
      i: TState, 
      condFn: (value: TState) => boolean, 
      iterFn: (value: TState) => TState, 
      resFn: (value: TState) => TResult) {
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

class GenerateIterable<TState, TResult> extends Iterable<TResult> {
  private _i: TState;
  private _condFn: (value: TState) => boolean;
  private _iterFn: (value: TState) => TState;
  private _resFn: (value: TState) => TResult;

  constructor(
      i: TState, 
      condFn: (value: TState) => boolean, 
      iterFn: (value: TState) => TState, 
      resFn: (value: TState) => TResult) {
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

export function generate<TState, TResult>(
      i: TState, 
      condFn: (value: TState) => boolean, 
      iterFn: (value: TState) => TState, 
      resFn: (value: TState) => TResult): Iterable<TResult> {
  return new GenerateIterable(i, condFn, iterFn, resFn);
}

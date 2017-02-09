'use strict';

import { IIterable, Iterable } from '../iterable';
import { IIterator, Iterator } from '../iterator';
import { bindCallback } from '../internal/bindcallback';
import { toLength } from '../internal/tolength';
import { isIterable } from '../internal/isiterable';
import { doneIterator } from '../internal/doneiterator';

class FromIterator extends Iterator {
  private _source: any;
  private _it: IIterator;
  private _isIterable: boolean;
  private _fn?: (value: any, index: number) => any;
  private _i: number;

  constructor(source, fn?) {
    super();
    const iterable = isIterable(source);
    this._source = source;
    this._isIterable = iterable;
    this._it = iterable ? source[Symbol.iterator]() : null;
    this._fn = fn;
    this._i = 0;    
  }

  next() {
    let value;
    if (this._isIterable) {
      let next = this._it.next();
      if (next.done) { return { done: true, value: next.value }; }
      value = next.value;
      if (this._fn) {
        value = this._fn(value, this._i++);
      }
      return { done: false, value: value };
    } else {
      let length = toLength(this._source.length);
      if (this._i < length) {
        value = this._source[this._i];
        if (this._fn) {
          value = this._fn(value, this._i);
        }
        this._i++;
        return { done: false, value: value };
      }
      return doneIterator;
    }    
  }
}

export class FromIterable extends Iterable {
  private _source: IIterable;
  private _fn?: (value: any, index: number) => any;

  constructor(source: IIterable, fn?: (value: any, index: number) => any, thisArg?: any) {
    super();
    this._source = source;
    this._fn = bindCallback(fn, thisArg, 2);
  }

  [Symbol.iterator]() {
    return new FromIterator(this._source, this._fn);
  }
}

export function from(
    source: IIterable, 
    fn?: (value: any, index: number) => any, 
    thisArg?: any): IIterable {
  return new FromIterable(source, fn, thisArg);
}
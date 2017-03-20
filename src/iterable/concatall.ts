'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { ArrayIterator } from './arrayiterable';

export class ConcatAllIterator<T> extends Iterator<T> {
  private _it: IIterator<IIterable<T>>;
  private _innerIt: IIterator<T>;

  constructor(it: IIterator<IIterable<T>>) {
    super();
    this._it = it;
    this._innerIt = null;
  }

  next() {
    let outerNext;
    while (1) {
      if (!this._innerIt) {
        outerNext = this._it.next();
        if (outerNext.done) { return outerNext; }
        
        let innerItem = outerNext.value;
        this._innerIt = innerItem[Symbol.iterator]();
      }
      
      let innerNext = this._innerIt.next();
      if (innerNext.done) {
        this._innerIt = null;
      } else {
        return { done: false, value: innerNext.value };
      }
    }    
  }
}

export class ConcatAllIterable<T> extends Iterable<T> {
  private _source: IIterable<IIterable<T>>;

  constructor(source: IIterable<IIterable<T>>) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new ConcatAllIterator<T>(this._source[Symbol.iterator]());
  }
}

export function concatAll<T>(source: IIterable<IIterable<T>>): Iterable<T> {
  return new ConcatAllIterable(source);
}
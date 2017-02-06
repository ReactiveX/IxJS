'use strict';

import { Iterable, IIterable } from '../iterable';
import { Iterator, IIterator } from '../iterator';
import { doneIterator } from '../internal/doneiterator';
import { ArrayIterable } from './arrayiterable';
import { FromIterable } from './from';
import { isIterable } from '../internal/isiterable';

class ConcatIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _innerIt: IIterator<T>;

  constructor(it: IIterator<T>) {
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
        !isIterable(innerItem) || (innerItem = new FromIterable(innerItem));
        this._innerIt = innerItem[Symbol.iterator]();
      }
      
      var innerNext = this._innerIt.next();
      if (innerNext.done) {
        this._innerIt = null;
      } else {
        return { done: false, value: innerNext.value };
      }
    }    
  }
}

export class ConcatIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;

  constructor(source) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new ConcatIterator(this._source[Symbol.iterator]());
  }
}

export function concat<T>(source: IIterable<T>, ...args: Array<IIterable<T>>): IIterable<T> {
  const input = [source].concat(args);
  return new ConcatIterable<T>(new ArrayIterable<T>(input));
}

export function concatStatic<T>(...args: Array<IIterable<T>>): IIterable<T> {
  return new ConcatIterable<T>(new ArrayIterable<T>(args));
}
'use strict';

import { Iterable, IIterable } from '../iterable';
import { Iterator, IIterator } from '../iterator';
import { doneIterator } from '../internal/doneiterator';
import { ArrayIterable } from './arrayiterable';
import { from } from './from';
import { isIterable } from '../internal/isiterable';

class ConcatIterator extends Iterator {
  private _it: IIterator;
  private _innerIt: IIterator;

  constructor(it: IIterator) {
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
        !isIterable(innerItem) || (innerItem = from(innerItem));
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

export class ConcatIterable extends Iterable {
  private _source: IIterable;

  constructor(source) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new ConcatIterator(this._source[Symbol.iterator]());
  }
}

export function concat(source: IIterable, ...args: Array<IIterable>): IIterable {
  const input = [source].concat(...args);
  return new ConcatIterable(new ArrayIterable(input));
}

export function concatStatic(...args: Array<IIterable>): IIterable {
  return new ConcatIterable(new ArrayIterable(args));
}
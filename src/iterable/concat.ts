'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
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
  private _source: any;

  constructor(...args) {
    super();
    this._source = new ArrayIterable(args);
  }

  [Symbol.iterator]() {
    return new ConcatIterator(this._source[Symbol.iterator]());
  }
}

export function concat<T>(source: IIterable<T>, ...args: Array<IIterable<T>>) {

}

export function concatStatic<T>(...args: Array<IIterable<T>): Iterable<T> {

}
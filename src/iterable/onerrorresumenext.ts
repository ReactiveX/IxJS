'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { ArrayIterator } from './arrayiterable';

export class OnErrorResumeNextIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _innerIt: IIterator<T>;
  
  constructor(...it: IIterator<T>[]) {
    super();
    this._it = new ArrayIterator(it);
    this._innerIt = null;
  }

  next() {
    let outerNext;
    while(1) {
      if (!this._innerIt) {
        outerNext = this._it.next();
        if (outerNext.done) { return outerNext; }
        
        let innerItem = outerNext.value;
        this._innerIt = innerItem[Symbol.iterator]();
      }

      let innerNext;
      try {
        innerNext = this._innerIt.next();
      } catch (e) {
        this._innerIt = null;
      }

      if (innerNext) {
        if (innerNext.done) {
          this._innerIt = null;
        } else {
          return { done: false, value: innerNext.value };
        }
      }
    }
  }
}

export class OnErrorResumeNextIterable<T> extends Iterable<T> {
  private _source: IIterable<T>[];

  constructor(...source: IIterable<T>[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    let len = this._source.length, results = new Array(len), i = 0;
    for(; i < len; i++) {
      results.push(this._source[i][Symbol.iterator]());
    }
    return new OnErrorResumeNextIterator<T>(...results);
  }
}

export function onErrorResumeNext<T>(source: IIterable<T>, ...args: IIterable<T>[]): Iterable<T> {
  return new OnErrorResumeNextIterable<T>(...[source].concat(args));
}

export function onErrorResumeNextStatic<T>(...source: IIterable<T>[]): Iterable<T> {
  return new OnErrorResumeNextIterable<T>(...source);
}
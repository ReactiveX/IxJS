/*
'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';
import { ArrayIterator } from './arrayiterable';

export class OnErrorResumeNextIterator<T> extends IteratorX<T> {
  private _it: Iterator<Iterator<T>>;
  private _innerIt: Iterator<T> | null;

  constructor(...it: Iterator<T>[]) {
    super();
    this._it = new ArrayIterator(it);
    this._innerIt = null;
  }

  _next() {
    let outerNext;
    while(1) {
      if (!this._innerIt) {
        outerNext = this._it.next();
        if (outerNext.done) { return outerNext; }
        this._innerIt = outerNext.value[Symbol.iterator]();
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

export class OnErrorResumeNextIterable<T> extends IterableX<T> {
  private _source: Iterable<T>[];

  constructor(...source: Iterable<T>[]) {
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

export function onErrorResumeNext<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return new OnErrorResumeNextIterable<T>(...[source].concat(args));
}

export function onErrorResumeNextStatic<T>(...source: Iterable<T>[]): Iterable<T> {
  return new OnErrorResumeNextIterable<T>(...source);
}
*/
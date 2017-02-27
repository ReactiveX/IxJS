'use strict';

import { IIterable, IIterator, PartialObserver } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { MapIterable } from './map';

export class ZipIterator<T> extends Iterator<T> {
  private _it: IIterator<T>[];
  
  constructor(...it: IIterator<T>[]) {
    super();
    this._it = it;
  }

  next() {
    let len = this._it.length, results = [], next;
    for (var i = 0; i < len; i++) {
      next = this._it[i].next();
      if (next.done) { return next; }
      results.push(next.value);
    }
    return { done: false, value: results };    
  }
}

export class ZipIterable<T> extends Iterable<T> {
  private _source: IIterable<T>[];

  constructor(...source: IIterable<T>[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    let results = [], len = this._source.length, i = 0;
    for(; i < len; i++) {
      results.push(this._source[i][Symbol.iterator]());
    }
    return new ZipIterator<T>(...results);
  }
}

export function zip<T>(source: IIterable<T>, ...args: IIterable<T>[]): Iterable<T> {
  return zipStatic<T>(...[source].concat(...args));
}

export function zipStatic<T>(...args: IIterable<T>[]): Iterable<T> {
  return new ZipIterable<T>(...args);
}

export function zipWith<T, TResult>(
    source: IIterable<T>,
    fn: (...args: T[]) => TResult,
    ...args: IIterable<T>[]): Iterable<TResult> {
  return new MapIterable<T[], TResult>(new ZipIterable<T>(...[source].concat(...args)), zipArgs => fn(...zipArgs));
}

export function zipWithStatic<T, TResult>(
    fn: (...args: T[]) => TResult, 
    ...args: IIterable<T>[]): Iterable<TResult> {
  return new MapIterable<T[], TResult>(new ZipIterable<T>(...args), zipArgs => fn(...zipArgs));
}
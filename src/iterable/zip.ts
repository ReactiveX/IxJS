/*
'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';
import { MapIterable } from './map';

export class ZipIterator<T> extends IteratorX<T> {
  private _it: Iterator<T>[];

  constructor(...it: Iterator<T>[]) {
    super();
    this._it = it;
  }

  _next() {
    let len = this._it.length, results = new Array(len), next;
    for (var i = 0; i < len; i++) {
      next = this._it[i].next();
      if (next.done) { return <any>next; }
      results.push(next.value);
    }
    return { done: false, value: results };
  }
}

export class ZipIterable<T> extends IterableX<T> {
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
    return new ZipIterator<T>(...results);
  }
}

export function zip<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return zipStatic<T>(...[source].concat(...args));
}

export function zipStatic<T>(...args: Iterable<T>[]): Iterable<T> {
  return new ZipIterable<T>(...args);
}

export function zipWith<T, TResult>(
    source: Iterable<T>,
    fn: (...args: T[]) => TResult,
    ...args: Iterable<T>[]): Iterable<TResult | undefined> {
  return new MapIterable(new ZipIterable(...[source].concat(...args)), zipArgs => fn(...zipArgs));
}

export function zipWithStatic<T, TResult>(
    fn: (...args: T[]) => TResult,
    ...args: Iterable<T>[]): Iterable<TResult | undefined> {
  return new MapIterable<T[], TResult>(new ZipIterable<T>(...args), zipArgs => fn(...zipArgs));
}
*/
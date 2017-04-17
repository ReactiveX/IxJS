'use strict';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';
import { ArrayIterable } from './arrayiterable';

export class CatchAllIterator<T> extends IteratorX<T> {
  private _it: ArrayIterable<Iterable<T>>;
  private _error: any;
  private _hasError: boolean;

  constructor(...it: Iterable<T>[]) {
    super();
    this._it = new ArrayIterable(it);
    this._error = null;
    this._hasError = false;
  }

  protected *create() {
    for (let outer of this._it) {
      try {
        // TODO: doesn't look like we're doing anything with the errors here...
        // TODO: Make sure this is right!
        for (let inner of outer) {
          yield inner;
        }
      } catch (e) {
        this._error = e;
        break;
      }
    }
  }
}

export class CatchAllIterable<T> extends IterableX<T> {
  private _source: Iterable<T>[];

  constructor(...source: Iterable<T>[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new CatchAllIterator<T>(...this._source.map(x => x));
  }
}

export function catchAll<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return new CatchAllIterable<T>(...[source].concat(args));
}

export function catchAllStatic<T>(...source: Iterable<T>[]): Iterable<T> {
  return new CatchAllIterable<T>(...source);
}


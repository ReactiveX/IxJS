'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';
import { ArrayIterable } from './arrayiterable';

export class CatchAllIterator<T> extends IteratorX<T> {
  private _it: ArrayIterable<Iterable<T>>;

  constructor(...it: Iterable<T>[]) {
    super();
    this._it = new ArrayIterable(it);
  }

  protected *create() {
    let error = null;

    for (let outer of this._it) {
      error = null;
      let it = outer[Symbol.iterator]();

      while (true) {
        let next = null;
        try {
          next = it.next();
          if (next.done) { break; }
        } catch (e) {
          error = e;
          break;
        }

        yield next.value;
      }

      if (error !== null) { break; }
    }

    if (error !== null) { throw error; }
  }
}

export class CatchAllIterable<T> extends IterableX<T> {
  private _source: Iterable<T>[];

  constructor(...source: Iterable<T>[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new CatchAllIterator<T>(...this._source);
  }
}

export function catchAll<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return new CatchAllIterable<T>(...[source].concat(args));
}

export function catchAllStatic<T>(...source: Iterable<T>[]): Iterable<T> {
  return new CatchAllIterable<T>(...source);
}

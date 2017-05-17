'use strict';

import { IterableX } from '../iterable';

class CatchIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<Iterable<TSource>>;

  constructor(source: Iterable<Iterable<TSource>>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    let error = null;

    for (let outer of this._source) {
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

export function _catchAll<TSource>(source: Iterable<Iterable<TSource>>): IterableX<TSource> {
  return new CatchIterable<TSource>(source);
}

export function _catch<TSource>(source: Iterable<TSource>, ...args: Iterable<TSource>[]): IterableX<TSource> {
  return new CatchIterable<TSource>([source, ...args]);
}

export function _catchStatic<TSource>(...source: Iterable<TSource>[]): IterableX<TSource> {
  return new CatchIterable<TSource>(source);
}

'use strict';

import { IterableX } from '../iterable';

class CatchIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<Iterable<TSource>>;

  constructor(source: Iterable<Iterable<TSource>>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    let error = null, hasError = false;

    for (let outer of this._source) {
      error = null;
      hasError = false;
      let it = outer[Symbol.iterator]();

      while (true) {
        let next = null;
        try {
          next = it.next();
          if (next.done) { break; }
        } catch (e) {
          error = e;
          hasError = true;
          break;
        }

        yield next.value;
      }

      if (hasError) { break; }
    }

    if (hasError) { throw error; }
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

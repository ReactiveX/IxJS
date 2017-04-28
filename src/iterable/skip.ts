'use strict';

export function* skip<T>(
    source: Iterable<T>,
    count: number): Iterable<T> {
    let next, it = source[Symbol.iterator]();
    for (let i = 0; i < count; i++) {
      next = it.next();
      if (next.done) { return; }
    }

    while (!(next = it.next()).done) {
      yield next.value;
    }
}
'use strict';

import { PartialObserver } from '../observer';

export function* tap<T>(source: Iterable<T>, observer: PartialObserver<T>): Iterable<T> {
  const it = source[Symbol.iterator]();
  while (1) {
    let next;
    try {
      next = it.next();
    } catch (e) {
      if (observer.error) { observer.error(e); }
      throw e;
    }

    if (next.done) {
      if (observer.complete) { observer.complete(); }
      break;
    }

    if (observer.next) { observer.next(next.value); }
    yield next.value;
  }
}
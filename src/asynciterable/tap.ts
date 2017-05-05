'use strict';

import { PartialObserver } from '../observer';

export async function* tap<T>(source: AsyncIterable<T>, observer: PartialObserver<T>): AsyncIterable<T> {
  const it = source[Symbol.asyncIterator]();
  while (1) {
    let next;
    try {
      next = await it.next();
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
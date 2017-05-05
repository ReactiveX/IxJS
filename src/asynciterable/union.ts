'use strict';

import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

export async function* union<T>(
    left: AsyncIterable<T>,
    right: AsyncIterable<T>,
    comparer: (x: T, y: T) => boolean = defaultComparer): AsyncIterable<T> {
  let it, leftDone = false, rightDone = false, map = [];
  while (1) {
    if (!it) {
      if (rightDone) {
        break;
      }

      if (!leftDone) {
        it = left[Symbol.asyncIterator]();
        leftDone = true;
      } else {
        it = right[Symbol.asyncIterator]();
        rightDone = true;
      }
    }

    let next = await it.next();
    if (next.done) {
      it = null;
    } else {
      let current = next.value;
      if (arrayIndexOf(map, current, comparer) !== -1) {
        map.push(current);
        yield current;
      }
    }
  }
}
'use strict';

import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

export function* union<T>(
    left: Iterable<T>,
    right: Iterable<T>,
    comparer: (x: T, y: T) => boolean = defaultComparer): Iterable<T> {
  let it, leftDone = false, rightDone = false, map = [];
  while (1) {
    if (!it) {
      if (rightDone) {
        break;
      }

      if (!leftDone) {
        it = left[Symbol.iterator]();
        leftDone = true;
      } else {
        it = right[Symbol.iterator]();
        rightDone = true;
      }
    }

    let next = it.next();
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
'use strict';

import { arrayIndexOf } from '../internal/arrayindexof';

export function* union<T>(
    left: Iterable<T>,
    right: Iterable<T>,
    cmp: (x: T, y: T) => boolean = (x, y) => x === y): Iterable<T> {
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
      if (arrayIndexOf(map, current, cmp) !== -1) {
        map.push(current);
        yield current;
      }
    }
  }
}
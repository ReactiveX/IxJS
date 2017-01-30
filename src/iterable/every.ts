'use strict';

import { $iterator$ } from '../symbol';

export function every<T>(source: Iterator<T>, comparer) {
  let it = source[$iterator$], next, i = 0;
  while (!(next = it.next()).done) {
    if (!comparer(next, i++)) { return false; }
  }
  return true;
};

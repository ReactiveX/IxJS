'use strict';

import { IIterable } from '../iterable';

function some<T>(source: IIterable<T>, comparer?: (value: T, index:number) => boolean): boolean {
  let it = source[$iterator$](), next, i = 0;
  while (!(next = it.next()).done) {
    if (comparer(next, i++)) { return true; }
  }
  return false;
}
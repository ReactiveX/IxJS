'use strict';

import { bindCallback } from '../internal/bindcallback';

export function *flatMap<TSource, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource) => Iterable<TResult>,
    thisArg?: any): Iterable<TResult> {
  let sel = bindCallback(fn, thisArg, 1);
  for (let outerItem of source) {
    for (let innerItem of sel(outerItem)) {
      yield innerItem;
    }
  }
}
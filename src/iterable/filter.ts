'use strict';

import { bindCallback } from '../internal/bindcallback';

export function* filter<T>(
      source: Iterable<T>,
      predicate: (value: T, index: number) => boolean,
      thisArg?: any): Iterable<T> {
  let fn = bindCallback(predicate, thisArg, 2), i = 0;
  for (let item of source) {
    if (fn(item, i++)) {
      yield item;
    }
  }
}
'use strict';

import { bindCallback } from '../internal/bindcallback';

export function* map<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (value: TSource, index: number) => TResult,
    thisArg?: any): Iterable<TResult> {
  const fn = bindCallback(selector, thisArg, 2);
  let i = 0;
  for (let item of source) {
    yield fn(item, i++);
  }
}
'use strict';

import { bindCallback } from '../internal/bindcallback';

export function forEach<TSource>(
    source: Iterable<TSource>,
    callback: (value: TSource, index: number) => void,
    thisArg?: any): void {
  let i = 0;
  const fn = bindCallback(callback, thisArg, 2);
  for (let item of source) {
    fn(item, i++);
  }
}
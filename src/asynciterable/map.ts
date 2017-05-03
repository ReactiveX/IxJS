'use strict';

import { bindCallback } from '../internal/bindcallback';

export async function* map<TSource, TResult>(
    source: AsyncIterable<TSource>,
    selector: (value: TSource, index: number) => TResult,
    thisArg?: any): AsyncIterable<TResult> {
  const fn = bindCallback(selector, thisArg, 2);
  let i = 0;
  for await (let item of source) {
    yield fn(item, i++);
  }
}
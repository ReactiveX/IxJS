'use strict';

import { bindCallback } from '../internal/bindcallback';

export async function* filterAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean,
    thisArg?: any): AsyncIterable<TSource> {
  const fn = bindCallback(predicate, thisArg, 2);
  let i = 0;
  for await (let item of source) {
    if (fn(item, i++)) {
      yield item;
    }
  }
}
'use strict';

import { bindCallback } from '../internal/bindcallback';

export async function* flatMap<TSource, TResult>(
    source: AsyncIterable<TSource>,
    fn: (value: TSource) => AsyncIterable<TResult>,
    thisArg?: any): AsyncIterable<TResult> {
  let sel = bindCallback(fn, thisArg, 1);
  for await (let outerItem of source) {
    for await (let innerItem of sel(outerItem)) {
      yield innerItem;
    }
  }
}
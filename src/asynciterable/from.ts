'use strict';

import { bindCallback } from '../internal/bindcallback';
import { toLength } from '../internal/tolength';
import { isIterable } from '../internal/isiterable';

export async function* from<TSource, TResult>(
    source: Iterable<TSource> | ArrayLike<TSource>,
    fn?: (value: TSource, index: number) => TResult,
    thisArg?: any): AsyncIterable<TResult> {
  const iterable = isIterable(source);
  const boundFn = bindCallback(fn, thisArg, 2);
  let i = 0;
  if (iterable) {
    for (let item of <Iterable<TSource>>source) {
      yield boundFn ? boundFn(item, i++) : item;
    }
  } else {
    let length = toLength((<ArrayLike<TSource>>source).length);
    while (i < length) {
      let val = (<ArrayLike<TSource>>source)[i];
      yield boundFn ? boundFn(val, i++) : val;
    }
  }
}
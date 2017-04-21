'use strict';

import { DeferIterable } from './defer';
import { EmptyIterable } from './empty';

export function _case<TSource, TResult>(
    fn: () => TSource,
    sources: Map<TSource, Iterable<TResult>>,
    defaultSource: Iterable<TResult> = new EmptyIterable<TResult>()): Iterable<TResult> {
  return new DeferIterable<TResult>(() => {
    const key = fn();
    return sources.has(key) ? sources.get(key)! : defaultSource;
  });
}
'use strict';

import { IterableX } from '../iterable';
import { defer } from './defer';
import { empty } from './empty';

export function _case<TSource, TResult>(
    fn: () => TSource,
    sources: Map<TSource, Iterable<TResult>>,
    defaultSource: Iterable<TResult> = empty<TResult>()): IterableX<TResult> {
  return defer<TResult>(() => {
    const key = fn();
    return sources.has(key) ? sources.get(key)! : defaultSource;
  });
}
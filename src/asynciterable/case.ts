'use strict';

import { AsyncIterableX } from '../asynciterable';
import { defer } from './defer';
import { empty } from './empty';

export function _case<TSource, TResult>(
    fn: () => TSource,
    sources: Map<TSource, AsyncIterable<TResult>>,
    defaultSource: AsyncIterable<TResult> = empty<TResult>()): AsyncIterableX<TResult> {
  return defer<TResult>(() => {
    const key = fn();
    return sources.has(key) ? sources.get(key)! : defaultSource;
  });
}
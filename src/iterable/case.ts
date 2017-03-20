'use strict';

import { IIterable } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { DeferIterable } from './defer';
import { EmptyIterable } from './empty';

export function _case<TSource, TResult>(
    fn: () => TSource, 
    sources: Map<TSource, IIterable<TResult>>,
    defaultSource: IIterable<TResult> = new EmptyIterable<TResult>()): Iterable<TResult> {
  return new DeferIterable(() => {
    const key = fn();
    return sources.has(key) ? sources.get(key) : defaultSource;
  });
}
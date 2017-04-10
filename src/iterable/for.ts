'use strict';


import { ConcatAllIterable } from './concatall';
import { MapIterable } from './map';

export function _for<TSource, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource) => Iterable<TResult>): Iterable<TResult> {
  return new ConcatAllIterable(new MapIterable(source, fn));
}
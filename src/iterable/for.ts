'use strict';

import { IIterable } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { ConcatAllIterable } from './concatall';
import { MapIterable } from './map';

export function _for<TSource, TResult>(
    source: IIterable<TSource>,
    fn: (value: TSource) => IIterable<TResult>): Iterable<TResult> {
  return new ConcatAllIterable(new MapIterable(source, fn));
}
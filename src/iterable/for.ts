'use strict';

import { concatAll } from './concat';
import { map } from './map';

export function* _for<TSource, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource) => Iterable<TResult>): Iterable<TResult> {
  return concatAll(map(source, fn));
}
'use strict';

import { concatAll } from './concat';
import { map } from './map';

export async function* _for<TSource, TResult>(
    source: AsyncIterable<TSource>,
    fn: (value: TSource) => AsyncIterable<TResult>): AsyncIterable<TResult> {
  return concatAll(map(source, fn));
}
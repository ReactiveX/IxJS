'use strict';

import { AsyncIterableX } from '../asynciterable';
import { repeatValue } from '../iterable/repeatvalue';
import { _catchAll } from './catch';

export function retry<TSource>(source: AsyncIterable<TSource>, count: number = -1): AsyncIterableX<TSource> {
  return _catchAll<TSource>(repeatValue<AsyncIterable<TSource>>(source, count));
}
'use strict';

import { AsyncIterableX } from '../asynciterable';
import { repeat } from './repeat';
import { _catchAll } from './catch';

export function retry<TSource>(source: AsyncIterable<TSource>, count: number = -1): AsyncIterableX<TSource> {
  return _catchAll<TSource>([repeat<TSource>(source, count)]);
}
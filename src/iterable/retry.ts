'use strict';

import { IterableX } from '../iterable';
import { repeat } from './repeat';
import { _catchAll } from './catch';

export function retry<TSource>(source: Iterable<TSource>, count: number = -1): IterableX<TSource> {
  return _catchAll<TSource>([repeat<TSource>(source, count)]);
}
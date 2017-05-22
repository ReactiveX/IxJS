'use strict';

import { IterableX } from '../iterable';
import { repeatValue } from './repeatvalue';
import { _catchAll } from './catch';

export function retry<TSource>(source: Iterable<TSource>, count: number = -1): IterableX<TSource> {
  return _catchAll<TSource>(repeatValue<Iterable<TSource>>(source, count));
}
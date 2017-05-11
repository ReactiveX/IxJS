'use strict';

import { repeat } from './repeat';
import { _catchAll } from './catch';

export async function* retry<TSource>(source: AsyncIterable<TSource>, count: number = -1): AsyncIterable<TSource> {
  return _catchAll<TSource>([repeat<TSource>(source, count)]);
}
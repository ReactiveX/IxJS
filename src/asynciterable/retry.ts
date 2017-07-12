import { AsyncIterableX } from '../asynciterable';
import { repeatStatic } from '../iterable/repeat';
import { _catchAll } from './catch';

export function retry<TSource>(source: AsyncIterable<TSource>, count: number = -1): AsyncIterableX<TSource> {
  return _catchAll<TSource>(repeatStatic<AsyncIterable<TSource>>(source, count));
}

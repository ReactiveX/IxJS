import { IterableX } from '../iterable';
import { repeatStatic } from './repeat';
import { _catchAll } from './catch';

export function retry<TSource>(source: Iterable<TSource>, count: number = -1): IterableX<TSource> {
  return _catchAll<TSource>(repeatStatic<Iterable<TSource>>(source, count));
}

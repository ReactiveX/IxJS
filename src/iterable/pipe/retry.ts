import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { retry as retryStatic } from '../retry';

export function retry<TSource>(count: number = -1): MonoTypeOperatorFunction<TSource> {
  return function retryOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return retryStatic<TSource>(source, count);
  };
}

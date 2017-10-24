import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { retry as retryStatic } from '../retry';

export function retry<TSource>(count: number = -1): MonoTypeOperatorAsyncFunction<TSource> {
  return function retryOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return retryStatic<TSource>(source, count);
  };
}

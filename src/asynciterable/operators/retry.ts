import { AsyncIterableX } from '../asynciterablex';
import { repeatValue } from '../../iterable/repeatvalue';
import { CatchAllAsyncIterable } from '../catcherror';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

/**
 * Retries the async-iterable instance the number of given times. If not supplied, it will try infinitely.
 * @param count An optional number of times to retry, otherwise is set to infinite retries
 */
export function retry<TSource>(count: number = -1): MonoTypeOperatorAsyncFunction<TSource> {
  return function retryOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new CatchAllAsyncIterable<TSource>(repeatValue<AsyncIterable<TSource>>(source, count));
  };
}

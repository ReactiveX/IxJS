import { AsyncIterableX } from '../asynciterablex.js';
import { repeatValue } from '../../iterable/repeatvalue.js';
import { CatchAllAsyncIterable } from '../catcherror.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';

/**
 * Retries the async-iterable instance the number of given times. If not supplied, it will try infinitely.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {number} [count=-1] An optional number of times to retry, otherwise is set to infinite retries
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An async-iterable sequence producing the elements of the
 * given sequence repeatedly until it terminates successfully.
 */
export function retry<TSource>(count = -1): MonoTypeOperatorAsyncFunction<TSource> {
  return function retryOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new CatchAllAsyncIterable<TSource>(repeatValue<AsyncIterable<TSource>>(source, count));
  };
}

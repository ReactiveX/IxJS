import { IterableX } from '../iterablex.js';
import { repeatValue } from '../repeatvalue.js';
import { catchAll } from '../catcherror.js';
import { MonoTypeOperatorFunction } from '../../interfaces.js';

/**
 * Retries the iterable instance the number of given times. If not supplied, it will try infinitely.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {number} [count=-1] An optional number of times to retry, otherwise is set to infinite retries
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An iterable sequence producing the elements of the
 * given sequence repeatedly until it terminates successfully.
 */
export function retry<TSource>(count = -1): MonoTypeOperatorFunction<TSource> {
  return function retryOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return catchAll<TSource>(repeatValue<Iterable<TSource>>(source, count));
  };
}

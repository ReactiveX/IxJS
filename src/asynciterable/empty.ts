import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

class EmptyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<TSource> {
    throwIfAborted(signal);
  }
}

/**
 * Returns an empty async-iterable sequence.
 *
 * @export
 * @template TSource The type used for the async-iterable type parameter of the resulting sequence.
 * @returns {AsyncIterableX<TSource>} An async-iterable sequence with no elements.
 */
export function empty<TSource>(): AsyncIterableX<TSource> {
  return new EmptyAsyncIterable<TSource>();
}

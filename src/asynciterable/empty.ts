import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

class EmptyAsyncIterable extends AsyncIterableX<never> {
  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<never> {
    throwIfAborted(signal);
  }
}

/**
 * Returns an empty async-iterable sequence.
 *
 * @template TSource The type used for the async-iterable type parameter of the resulting sequence.
 * @returns {AsyncIterableX<never>} An async-iterable sequence with no elements.
 */
export function empty(): AsyncIterableX<never> {
  return new EmptyAsyncIterable();
}

import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted, AbortError } from '../aborterror';

export class NeverAsyncIterable extends AsyncIterableX<never> {
  constructor() {
    super();
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    await new Promise<never>((_, reject) => {
      if (signal) {
        signal.addEventListener('abort', () => reject(new AbortError()), { once: true });
      }
    });
  }
}

/**
 * An async-iterable sequence that never returns a value.
 *
 * @returns {AsyncIterableX<never>} An async-iterable sequence that never returns a value.
 */
export function never(): AsyncIterableX<never> {
  return new NeverAsyncIterable();
}

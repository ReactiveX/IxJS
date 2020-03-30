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

export function never(): AsyncIterableX<never> {
  return new NeverAsyncIterable();
}

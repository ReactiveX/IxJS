import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NEVER_PROMISE = new Promise<never>(() => {});

export class NeverAsyncIterable extends AsyncIterableX<never> {
  constructor() {
    super();
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    await NEVER_PROMISE;
  }
}

export function never(): AsyncIterableX<never> {
  return new NeverAsyncIterable();
}

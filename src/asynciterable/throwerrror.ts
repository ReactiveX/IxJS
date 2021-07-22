import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

class ThrowAsyncIterable extends AsyncIterableX<never> {
  private _error: any;

  constructor(error: any) {
    super();
    this._error = error;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<never> {
    throwIfAborted(signal);
    throw this._error;
  }
}

/**
 * Creates an async-iterable that throws the specified error upon iterating.
 *
 * @param {*} error The error to throw upon iterating the async-iterable.
 * @returns {AsyncIterableX<never>} An async-iterable that throws when iterated.
 */
export function throwError(error: any): AsyncIterableX<never> {
  return new ThrowAsyncIterable(error);
}

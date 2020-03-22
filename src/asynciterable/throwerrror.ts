import { AbortSignal } from '../abortsignal';
import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

class ThrowAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _error: any;

  constructor(error: any) {
    super();
    this._error = error;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<TSource> {
    throwIfAborted(signal);
    throw this._error;
  }
}

export function throwError<TSource>(error: any): AsyncIterableX<TSource> {
  return new ThrowAsyncIterable<TSource>(error);
}

import { AsyncIterableX } from './asynciterablex';

class ThrowAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _error: any;

  constructor(error: any) {
    super();
    this._error = error;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<TSource> {
    throw this._error;
  }
}

export function throwError<TSource>(error: any): AsyncIterableX<TSource> {
  return new ThrowAsyncIterable<TSource>(error);
}

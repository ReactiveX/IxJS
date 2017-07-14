import { AsyncIterableX } from '../asynciterable';

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

export function _throw<TSource>(error: any): AsyncIterableX<TSource> {
  return new ThrowAsyncIterable<TSource>(error);
}

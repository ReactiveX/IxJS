import { IterableX } from '../iterable';

class ThrowIterable<TSource> extends IterableX<TSource> {
  private _error: any;

  constructor(error: any) {
    super();
    this._error = error;
  }

  *[Symbol.iterator](): Iterator<TSource> {
    throw this._error;
  }
}

export function _throw<TSource>(error: any): IterableX<TSource> {
  return new ThrowIterable<TSource>(error);
}

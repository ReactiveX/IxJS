import { IterableX } from './iterablex';

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

export function throwError<TSource = any>(error: any): IterableX<TSource> {
  return new ThrowIterable<TSource>(error);
}

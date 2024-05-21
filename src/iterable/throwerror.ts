import { IterableX } from './iterablex.js';

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

/**
 * Creates an async-iterable that throws the specified error upon iterating.
 *
 * @param {*} error The error to throw upon iterating the iterable.
 * @returns {AsyncIterableX<never>} An iterable that throws when iterated.
 */
export function throwError<TSource = any>(error: any): IterableX<TSource> {
  return new ThrowIterable<TSource>(error);
}

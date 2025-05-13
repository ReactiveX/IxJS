import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
export class DefaultIfEmptyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _defaultValue: TSource;

  constructor(source: AsyncIterable<TSource>, defaultValue: TSource) {
    super();
    this._source = source;
    this._defaultValue = defaultValue;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    let hasValue = false;
    for await (const item of wrapWithAbort(this._source, signal)) {
      hasValue = true;
      yield item;
    }

    if (!hasValue) {
      yield this._defaultValue;
    }
  }
}

/**
 * Returns the elements of the specified sequence or the default value in a singleton sequence
 * if the sequence is empty.
 *
 * @template T The type of elements in the source sequence.
 * @param {T} defaultValue The value to return if the sequence is empty.
 * @returns {MonoTypeOperatorAsyncFunction<T>} An operator which returns the elements of the source sequence or the default value as a singleton.
 */
export function defaultIfEmpty<T>(defaultValue: T): MonoTypeOperatorAsyncFunction<T> {
  return function defaultIfEmptyOperatorFunction(source) {
    return new DefaultIfEmptyAsyncIterable(source, defaultValue);
  };
}

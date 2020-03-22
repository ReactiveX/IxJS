import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class DefaultIfEmptyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _defaultValue: TSource;

  constructor(source: AsyncIterable<TSource>, defaultValue: TSource) {
    super();
    this._source = source;
    this._defaultValue = defaultValue;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    let state = 1;
    for await (const item of wrapWithAbort(this._source, signal)) {
      state = 2;
      yield item;
    }
    if (state === 1) {
      yield this._defaultValue;
    }
  }
}

export function defaultIfEmpty<T>(defaultValue: T): MonoTypeOperatorAsyncFunction<T> {
  return function defaultIfEmptyOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new DefaultIfEmptyAsyncIterable<T>(source, defaultValue);
  };
}

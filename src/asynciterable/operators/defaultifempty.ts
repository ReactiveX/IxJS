import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../util/aborterror';

export class DefaultIfEmptyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _defaultValue: TSource;
  private _signal?: AbortSignal;

  constructor(source: AsyncIterable<TSource>, defaultValue: TSource, signal?: AbortSignal) {
    super();
    this._source = source;
    this._defaultValue = defaultValue;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    let state = 1;
    for await (const item of wrapWithAbort(this._source, this._signal)) {
      state = 2;
      yield item;
    }
    if (state === 1) {
      throwIfAborted(this._signal);
      yield this._defaultValue;
    }
  }
}

export function defaultIfEmpty<T>(
  defaultValue: T,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<T> {
  return function defaultIfEmptyOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new DefaultIfEmptyAsyncIterable<T>(source, defaultValue, signal);
  };
}

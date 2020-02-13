import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class ConcatAllAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<AsyncIterable<TSource>>;
  private _signal?: AbortSignal;

  constructor(source: AsyncIterable<AsyncIterable<TSource>>, signal?: AbortSignal) {
    super();
    this._source = source;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    for await (const outer of wrapWithAbort(this._source, this._signal)) {
      for await (const item of wrapWithAbort(outer, this._signal)) {
        yield item;
      }
    }
  }
}

export function concatAll<T>(signal?: AbortSignal): OperatorAsyncFunction<AsyncIterable<T>, T> {
  return function concatAllOperatorFunction(
    source: AsyncIterable<AsyncIterable<T>>
  ): AsyncIterableX<T> {
    return new ConcatAllAsyncIterable<T>(source, signal);
  };
}

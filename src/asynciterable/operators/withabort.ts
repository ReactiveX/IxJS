import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export class WithAbortAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _signal: AbortSignal;

  constructor(source: AsyncIterable<TSource>, signal: AbortSignal) {
    super();
    this._source = source;
    this._signal = signal;
  }

  withAbort(signal: AbortSignal) {
    return new WithAbortAsyncIterable<TSource>(this._source, signal);
  }

  [Symbol.asyncIterator](): AsyncIterator<TSource> {
    return this._source[Symbol.asyncIterator](this._signal);
  }
}

export function withAbort<TSource>(signal: AbortSignal): MonoTypeOperatorAsyncFunction<TSource> {
  return function withAbortOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new WithAbortAsyncIterable(source, signal);
  };
}

export function wrapWithAbort<TSource>(source: AsyncIterable<TSource>, signal?: AbortSignal) {
  return signal ? new WithAbortAsyncIterable(source, signal) : source;
}

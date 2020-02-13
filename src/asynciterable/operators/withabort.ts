import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AbortError } from '../../util/aborterror';

export class WithAbortAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _signal: AbortSignal;

  constructor(source: AsyncIterable<TSource>, signal: AbortSignal) {
    super();
    this._source = source;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<TSource, any, undefined> {
    if (this._signal.aborted) {
      throw new AbortError();
    }

    for await (const item of this._source) {
      if (this._signal.aborted) {
        throw new AbortError();
      }

      yield item;
    }
  }
}

export function wrapWithAbort<TSource>(
  source: AsyncIterable<TSource>,
  signal?: AbortSignal
): AsyncIterable<TSource> {
  return signal ? new WithAbortAsyncIterable(source, signal) : source;
}

export function withAbort<TSource>(signal: AbortSignal): MonoTypeOperatorAsyncFunction<TSource> {
  return function withAbortOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new WithAbortAsyncIterable<TSource>(source, signal);
  };
}

import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class IgnoreElementsAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _signal?: AbortSignal;

  constructor(source: AsyncIterable<TSource>, signal?: AbortSignal) {
    super();
    this._source = source;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<TSource> {
    // eslint-disable-next-line no-empty
    for await (const _ of wrapWithAbort(this._source, this._signal)) {
    }
  }
}

export function ignoreElements<TSource>(
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function ignoreElementsOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new IgnoreElementsAsyncIterable<TSource>(source, signal);
  };
}

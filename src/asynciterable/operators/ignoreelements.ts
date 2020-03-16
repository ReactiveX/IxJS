import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class IgnoreElementsAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<TSource> {
    // eslint-disable-next-line no-empty
    for await (const _ of wrapWithAbort(this._source, signal)) {
    }
  }
}

export function ignoreElements<TSource>(): MonoTypeOperatorAsyncFunction<TSource> {
  return function ignoreElementsOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new IgnoreElementsAsyncIterable<TSource>(source);
  };
}

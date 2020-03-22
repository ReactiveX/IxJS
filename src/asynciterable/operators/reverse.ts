import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class ReverseAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const results = [] as TSource[];
    for await (const item of wrapWithAbort(this._source, signal)) {
      results.unshift(item);
    }
    yield* results;
  }
}

export function reverse<TSource>(): MonoTypeOperatorAsyncFunction<TSource> {
  return function reverseOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ReverseAsyncIterable<TSource>(source);
  };
}

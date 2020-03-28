import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class SkipUntilAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _other: (signal?: AbortSignal) => Promise<any>;

  constructor(source: AsyncIterable<TSource>, other: (signal?: AbortSignal) => Promise<any>) {
    super();
    this._source = source;
    this._other = other;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    let otherDone = false;
    this._other(signal).then(() => (otherDone = true));
    for await (const item of wrapWithAbort(this._source, signal)) {
      if (otherDone) {
        yield item;
      }
    }
  }
}

export function skipUntil<TSource>(
  other: (signal?: AbortSignal) => Promise<any>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function skipUntilOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new SkipUntilAsyncIterable<TSource>(source, other);
  };
}

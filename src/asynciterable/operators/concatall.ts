import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class ConcatAllAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<AsyncIterable<TSource>>;

  constructor(source: AsyncIterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    for await (const outer of wrapWithAbort(this._source, signal)) {
      for await (const item of wrapWithAbort(outer, signal)) {
        yield item;
      }
    }
  }
}

/**
 * Concatenates all inner async-iterable sequences, as long as the previous
 * async-iterable sequence terminated successfully.
 */
export function concatAll<T>(): OperatorAsyncFunction<AsyncIterable<T>, T> {
  return function concatAllOperatorFunction(
    source: AsyncIterable<AsyncIterable<T>>
  ): AsyncIterableX<T> {
    return new ConcatAllAsyncIterable<T>(source);
  };
}

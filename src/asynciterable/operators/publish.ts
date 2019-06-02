import { AsyncIterableX } from '../asynciterablex';
import { RefCountList } from '../../iterable/operators/_refcountlist';
import { create } from '../create';
import { OperatorAsyncFunction } from '../../interfaces';
import { MemoizeAsyncBuffer } from './memoize';

class PublishedAsyncBuffer<T> extends MemoizeAsyncBuffer<T> {
  // @ts-ignore
  protected _buffer: RefCountList<T>;

  constructor(source: AsyncIterator<T>) {
    super(source, new RefCountList<T>(0));
  }

  [Symbol.asyncIterator]() {
    this._buffer.readerCount++;
    return this._getIterable(this._buffer.count)[Symbol.asyncIterator]();
  }
}

export function publish<TSource>(): OperatorAsyncFunction<TSource, TSource>;
export function publish<TSource, TResult>(
  selector?: (value: AsyncIterableX<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TResult>;
export function publish<TSource, TResult>(
  selector?: (value: AsyncIterableX<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function publishOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    return selector
      ? create(async () => selector(publish<TSource>()(source))[Symbol.asyncIterator]())
      : new PublishedAsyncBuffer<TSource>(source[Symbol.asyncIterator]());
  };
}

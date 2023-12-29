import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

/** @ignore */
export class TakeLastAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    if (this._count > 0) {
      const q = [] as TSource[];
      for await (const item of wrapWithAbort(this._source, signal)) {
        if (q.length >= this._count) {
          q.shift();
        }
        q.push(item);
      }

      while (q.length > 0) {
        yield q.shift()!;
      }
    }
  }
}

/**
 * Returns a specified number of contiguous elements from the end of an async-iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {number} count Number of elements to take from the end of the source sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An async-iterable sequence containing the specified
 * number of elements from the end of the source sequence.
 */
export function takeLast<TSource>(count: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function takeLastOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new TakeLastAsyncIterable<TSource>(source, count);
  };
}

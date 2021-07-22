import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class SkipAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const source = wrapWithAbort(this._source, signal);
    const it = source[Symbol.asyncIterator]();
    let count = this._count;
    let next;
    while (count > 0 && !(next = await it.next()).done) {
      count--;
    }
    if (count <= 0) {
      while (!(next = await it.next()).done) {
        yield next.value;
      }
    }
  }
}

/**
 * Bypasses a specified number of elements in an async-iterable sequence and then returns the remaining elements.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {number} count The number of elements to skip before returning the remaining elements.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An async-iterable sequence that contains the elements that
 * occur after the specified index in the input sequence.
 */
export function skip<TSource>(count: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function skipOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new SkipAsyncIterable<TSource>(source, count);
  };
}

import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
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

    let countLeft = this._count;
    for await (const value of this._source) {
      if (countLeft <= 0) {
        yield value;
      }

      countLeft--;
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
  return function skipOperatorFunction(source) {
    return new SkipAsyncIterable(source, count);
  };
}

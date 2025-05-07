import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
export class SliceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _begin: number;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, begin: number, count: number) {
    super();
    this._source = source;
    this._begin = begin;
    this._count = count;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const source = wrapWithAbort(this._source, signal);

    let i = 0;
    for await (const item of source) {
      if (i < this._begin) {
        i++;
        continue;
      }

      if (i >= this._begin + this._count) {
        break;
      }

      yield item;

      i++;
    }
  }
}

/**
 * Returns the elements from the source async-iterable sequence only after the function that returns a promise produces an element.
 *
 * @template TSource The type of elements in the source sequence.
 * @param {number} begin Zero-based index at which to begin extraction (inclusive).
 * @param {number} [count=Infinity] The number of items to extract.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An async-iterable containing the extracted elements.
 */
export function slice<TSource>(
  begin: number,
  count = Infinity
): MonoTypeOperatorAsyncFunction<TSource> {
  return function sliceOperatorFunction(source) {
    return new SliceAsyncIterable(source, begin, count);
  };
}

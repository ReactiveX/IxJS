import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
export class SliceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _begin: number;
  private _end: number;

  constructor(source: AsyncIterable<TSource>, begin: number, end: number) {
    super();
    this._source = source;
    this._begin = begin;
    this._end = end;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const source = wrapWithAbort(this._source, signal);
    const it = source[Symbol.asyncIterator]();
    let begin = this._begin;
    let next;
    while (begin > 0 && !(next = await it.next()).done) {
      begin--;
    }

    let end = this._end;
    if (end > 0) {
      while (!(next = await it.next()).done) {
        yield next.value;
        if (--end === 0) {
          break;
        }
      }
    }
  }
}

/**
 * Returns the elements from the source async-iterable sequence only after the function that returns a promise produces an element.
 *
 * @template TSource The type of elements in the source sequence.
 * @param {number} begin Zero-based index at which to begin extraction.
 * @param {number} [end=Infinity] Zero-based index before which to end extraction.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An async-iterable containing the extracted elements.
 */
export function slice<TSource>(
  begin: number,
  end = Infinity
): MonoTypeOperatorAsyncFunction<TSource> {
  return function sliceOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new SliceAsyncIterable<TSource>(source, begin, end);
  };
}

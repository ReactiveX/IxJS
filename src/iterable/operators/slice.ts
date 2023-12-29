import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

/** @ignore */
export class SliceIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _begin: number;
  private _end: number;

  constructor(source: Iterable<TSource>, begin: number, end: number) {
    super();
    this._source = source;
    this._begin = begin;
    this._end = end;
  }

  *[Symbol.iterator]() {
    const it = this._source[Symbol.iterator]();
    let begin = this._begin;
    let next;
    while (begin > 0 && !(next = it.next()).done) {
      begin--;
    }

    let end = this._end;
    if (end > 0) {
      while (!(next = it.next()).done) {
        yield next.value;
        if (--end === 0) {
          break;
        }
      }
    }
  }
}

/**
 * Returns the elements from the source iterable sequence only after the function that returns a promise produces an element.
 *
 * @template TSource The type of elements in the source sequence.
 * @param {number} begin Zero-based index at which to begin extraction.
 * @param {number} [end=Infinity] Zero-based index before which to end extraction.
 * @returns {MonoTypeOperatorFunction<TSource>} An iterable containing the extracted elements.
 */
export function slice<TSource>(begin: number, end = Infinity): MonoTypeOperatorFunction<TSource> {
  return function sliceOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new SliceIterable<TSource>(source, begin, end);
  };
}

import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

/** @ignore */
export class TakeIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    let i = this._count;
    if (i > 0) {
      for (const item of this._source) {
        yield item;
        if (--i === 0) {
          break;
        }
      }
    }
  }
}

/**
 * Returns a specified number of contiguous elements from the start of an iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {number} count The number of elements to return.
 * @returns {MonoTypeOperatorFunction<TSource>} An iterable sequence that contains the specified
 * number of elements from the start of the input sequence.
 */
export function take<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function takeOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new TakeIterable<TSource>(source, count);
  };
}

import { IterableX } from '../iterablex.js';
import { MonoTypeOperatorFunction } from '../../interfaces.js';

/** @ignore */
export class TakeLastIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    if (this._count > 0) {
      const q = [] as TSource[];
      for (const item of this._source) {
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
 * Returns a specified number of contiguous elements from the end of an iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {number} count Number of elements to take from the end of the source sequence.
 * @returns {MonoTypeOperatorFunction<TSource>} An iterable sequence containing the specified
 * number of elements from the end of the source sequence.
 */
export function takeLast<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function takeLastOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new TakeLastIterable<TSource>(source, count);
  };
}

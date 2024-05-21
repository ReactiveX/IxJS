import { IterableX } from '../iterablex.js';
import { MonoTypeOperatorFunction } from '../../interfaces.js';

/** @ignore */
export class SkipLastIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    const q = [] as TSource[];
    for (const item of this._source) {
      q.push(item);
      if (q.length > this._count) {
        yield q.shift()!;
      }
    }
  }
}

/**
 * Bypasses a specified number of elements at the end of an iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {number} count Number of elements to bypass at the end of the source sequence.
 * @returns {MonoTypeOperatorFunction<TSource>} An iterable sequence containing the
 * source sequence elements except for the bypassed ones at the end.
 */
export function skipLast<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function skipLastOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new SkipLastIterable<TSource>(source, count);
  };
}

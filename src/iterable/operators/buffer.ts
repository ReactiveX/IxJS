import { IterableX } from '../iterablex';
import { OperatorFunction } from '../../interfaces';

/** @ignore */
export class BufferIterable<TSource> extends IterableX<TSource[]> {
  private _source: Iterable<TSource>;
  private _count: number;
  private _skip: number;

  constructor(source: Iterable<TSource>, count: number, skip: number) {
    super();
    this._source = source;
    this._count = count;
    this._skip = skip;
  }

  *[Symbol.iterator]() {
    const buffers: TSource[][] = [];
    let i = 0;
    for (const item of this._source) {
      if (i % this._skip === 0) {
        buffers.push([]);
      }

      for (const buff of buffers) {
        buff.push(item);
      }

      if (buffers.length > 0 && buffers[0].length === this._count) {
        yield buffers.shift()!;
      }

      i++;
    }

    while (buffers.length > 0) {
      yield buffers.shift()!;
    }
  }
}

/**
 * Generates a sequence of buffers over the source sequence, with specified length and possible overlap.
 * @example <caption>Creates a sequence of buffers with and without skip</caption>
 * const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
 *
 * // Without skip
 * const result = buffer(source, 5);
 * const result = Ix.Iterable.from(source).buffer(5);
 * for (const item of result) {
 *   console.log(result);
 * }
 * // => [0, 1, 2, 3, 4]
 * // => [5, 6, 7, 8, 9]
 *
 * // With skip
 * const result = buffer(source, 3, 4);
 * const result = Ix.Iterable.from(source).buffer(3, 4);
 * for (const item of result) {
 *   console.log(result);
 * }
 * // => [0, 1, 2]
 * // => [4, 5, 6]
 * // => [8, 9]
 * @param {Iterabel<TSource>} source Source sequence
 * @param {number} count Number of elements for allocated buffers.
 * @param {number} [skip] Number of elements to skip between the start of consecutive buffers. If not specified, defaults
 * to the count.
 * @return {IterableX<TSource>[]} Sequence of buffers containing source sequence elements
 */
export function buffer<TSource>(
  count: number,
  skip?: number
): OperatorFunction<TSource, TSource[]> {
  let s = skip;
  if (s == null) {
    s = count;
  }
  return function bufferOperatorFunction(source: Iterable<TSource>): IterableX<TSource[]> {
    return new BufferIterable(source, count, s!);
  };
}

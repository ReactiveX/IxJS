import { IterableX } from './iterablex.js';
import { returnIterator } from '../util/returniterator.js';

/** @ignore */
export class ZipIterable<TSource> extends IterableX<TSource[]> {
  private _sources: Iterable<TSource>[];

  constructor(sources: Iterable<TSource>[]) {
    super();
    this._sources = sources;
  }
  // eslint-disable-next-line consistent-return
  *[Symbol.iterator](): IterableIterator<TSource[]> {
    const sourcesLength = this._sources.length;
    const its = this._sources.map((x) => x[Symbol.iterator]());
    while (sourcesLength > 0) {
      const values = new Array(sourcesLength);
      for (let index = -1; ++index < sourcesLength; ) {
        const result = its[index].next();
        if (result.done) {
          its.forEach(returnIterator);
          return undefined;
        }
        values[index] = result.value;
      }
      yield values;
    }
  }
}

/**
 * Merges multiple iterable sequences into one iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @param {Iterable<T>} source The first async-iterable source.
 * @param {Iterable<T2>} source2 The second async-iterable source.
 * @returns {IterableX<[T, T2]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2>(source: Iterable<T>, source2: Iterable<T2>): IterableX<[T, T2]>;
/**
 * Merges multiple iterable sequences into one iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @param {Iterable<T>} source The first async-iterable source.
 * @param {Iterable<T2>} source2 The second async-iterable source.
 * @param {Iterable<T3>} source3 The third async-iterable source.
 * @returns {IterableX<[T, T2, T3]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2, T3>(
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>
): IterableX<[T, T2, T3]>;
/**
 * Merges multiple iterable sequences into one iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @param {Iterable<T>} source The first async-iterable source.
 * @param {Iterable<T2>} source2 The second async-iterable source.
 * @param {Iterable<T3>} source3 The third async-iterable source.
 * @param {Iterable<T4>} source4 The fourth async-iterable source.
 * @returns {IterableX<[T, T2, T3, T4]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2, T3, T4>(
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>
): IterableX<[T, T2, T3, T4]>;
/**
 * Merges multiple iterable sequences into one iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @template T5 The type of the fifth async-iterable sequence.
 * @param {Iterable<T>} source The first async-iterable source.
 * @param {Iterable<T2>} source2 The second async-iterable source.
 * @param {Iterable<T3>} source3 The third async-iterable source.
 * @param {Iterable<T4>} source4 The fourth async-iterable source.
 * @param {Iterable<T5>} source5 The fifth async-iterable source.
 * @returns {IterableX<[T, T2, T3, T4, T5]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2, T3, T4, T5>(
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>
): IterableX<[T, T2, T3, T4, T5]>;
/**
 * Merges multiple iterable sequences into one iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @template T5 The type of the fifth async-iterable sequence.
 * @template T6 The type of the sixth async-iterable sequence.
 * @param {Iterable<T>} source The first async-iterable source.
 * @param {Iterable<T2>} source2 The second async-iterable source.
 * @param {Iterable<T3>} source3 The third async-iterable source.
 * @param {Iterable<T4>} source4 The fourth async-iterable source.
 * @param {Iterable<T5>} source5 The fifth async-iterable source.
 * @param {Iterable<T6>} source6 The sixth async-iterable source.
 * @returns {IterableX<[T, T2, T3, T4, T5, T6]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2, T3, T4, T5, T6>(
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>,
  source6: Iterable<T6>
): IterableX<[T, T2, T3, T4, T5, T6]>;

/**
 * Merges multiple iterable sequences into one iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of elements in the source sequences.
 * @param {...Iterable<T>[]} sources The source sequences.
 * @returns {IterableX<T[]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T>(...sources: Iterable<T>[]): IterableX<T[]>;
export function zip<T>(...sources: any[]): IterableX<T[]> {
  return new ZipIterable<T>(sources);
}

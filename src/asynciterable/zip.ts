import { wrapWithAbort } from './operators/withabort.js';
import { AsyncIterableX } from './asynciterablex.js';
import { returnAsyncIterator } from '../util/returniterator.js';
import { throwIfAborted } from '../aborterror.js';

/** @ignore */
export class ZipAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _sources: AsyncIterable<TSource>[];

  constructor(sources: AsyncIterable<TSource>[]) {
    super();
    this._sources = sources;
  }

  // eslint-disable-next-line consistent-return
  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterableIterator<TSource[]> {
    throwIfAborted(signal);
    const sourcesLength = this._sources.length;
    const its = this._sources.map((x) => wrapWithAbort(x, signal)[Symbol.asyncIterator]());
    while (sourcesLength > 0) {
      const values = new Array(sourcesLength);
      for (let i = -1; ++i < sourcesLength; ) {
        const { value, done } = await its[i].next();
        if (done) {
          await Promise.all(its.map(returnAsyncIterator));
          return undefined;
        }
        values[i] = value;
      }
      yield values;
    }
  }
}

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @returns {AsyncIterableX<[T, T2]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): AsyncIterableX<[T, T2]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @param {AsyncIterable<T3>} source3 The third async-iterable source.
 * @returns {AsyncIterableX<[T, T2, T3]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2, T3>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): AsyncIterableX<[T, T2, T3]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @param {AsyncIterable<T3>} source3 The third async-iterable source.
 * @param {AsyncIterable<T4>} source4 The fourth async-iterable source.
 * @returns {AsyncIterableX<[T, T2, T3, T4]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2, T3, T4>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): AsyncIterableX<[T, T2, T3, T4]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @template T5 The type of the fifth async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @param {AsyncIterable<T3>} source3 The third async-iterable source.
 * @param {AsyncIterable<T4>} source4 The fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 The fifth async-iterable source.
 * @returns {AsyncIterableX<[T, T2, T3, T4, T5]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2, T3, T4, T5>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): AsyncIterableX<[T, T2, T3, T4, T5]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @template T5 The type of the fifth async-iterable sequence.
 * @template T6 The type of the sixth async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @param {AsyncIterable<T3>} source3 The third async-iterable source.
 * @param {AsyncIterable<T4>} source4 The fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 The fifth async-iterable source.
 * @param {AsyncIterable<T6>} source6 The sixth async-iterable source.
 * @returns {AsyncIterableX<[T, T2, T3, T4, T5, T6]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T, T2, T3, T4, T5, T6>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): AsyncIterableX<[T, T2, T3, T4, T5, T6]>;

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of elements in the source sequences.
 * @param {...AsyncIterable<T>[]} sources The source sequences.
 * @returns {AsyncIterableX<T[]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zip<T>(...sources: AsyncIterable<T>[]): AsyncIterableX<T[]>;
export function zip<T>(...sources: any[]): AsyncIterableX<T[]> {
  return new ZipAsyncIterable<T>(sources);
}

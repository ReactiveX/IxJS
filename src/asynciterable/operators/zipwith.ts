import { OperatorAsyncFunction } from '../../interfaces.js';
import { ZipAsyncIterable } from '../zip.js';

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zipWith<T, T2>(source2: AsyncIterable<T2>): OperatorAsyncFunction<T, [T, T2]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @param {AsyncIterable<T3>} source3 The third async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zipWith<T, T2, T3>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): OperatorAsyncFunction<T, [T, T2, T3]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @param {AsyncIterable<T3>} source3 The third async-iterable source.
 * @param {AsyncIterable<T4>} source4 The fourth async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3, T4]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zipWith<T, T2, T3, T4>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): OperatorAsyncFunction<T, [T, T2, T3, T4]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @template T5 The type of the fifth async-iterable sequence.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @param {AsyncIterable<T3>} source3 The third async-iterable source.
 * @param {AsyncIterable<T4>} source4 The fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 The fifth async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3, T4, T5]>} Async iterable with an array of each element from the source
 * sequences in a pairwise fashion.
 */
export function zipWith<T, T2, T3, T4, T5>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @template T5 The type of the fifth async-iterable sequence.
 * @template T6 The type of the sixth async-iterable sequence.
 * @param {AsyncIterable<T2>} source2 The second async-iterable source.
 * @param {AsyncIterable<T3>} source3 The third async-iterable source.
 * @param {AsyncIterable<T4>} source4 The fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 The fifth async-iterable source.
 * @param {AsyncIterable<T6>} source6 The sixth async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3, T4, T5, T6]>} Async iterable with an array of each element from the source
 * sequences in a pairwise fashion.
 */
export function zipWith<T, T2, T3, T4, T5, T6>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5, T6]>;

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @template T The type of elements in the source sequences.
 * @param {...AsyncIterable<T>[]} sources The source sequences.
 * @returns {AsyncIterableX<T[]>} Async iterable with an array of each element from the source sequences in a pairwise fashion.
 */
export function zipWith<T>(...sources: AsyncIterable<T>[]): OperatorAsyncFunction<T, T[]>;
export function zipWith<T>(...sources: any[]): OperatorAsyncFunction<T, T[]> {
  return function zipWithOperatorFunction(source: AsyncIterable<T>) {
    return new ZipAsyncIterable<T>([source, ...sources]);
  };
}

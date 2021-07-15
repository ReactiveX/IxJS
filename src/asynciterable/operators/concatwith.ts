import { OperatorAsyncFunction } from '../../interfaces';
import { ConcatAsyncIterable } from '../concat';

/**
 * Concatenates the second async-iterable sequence to the first async-iterable sequence upon successful termination of the first.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @param {AsyncIterable<T>} v1 First async-iterable source.
 * @param {AsyncIterable<T2>} v2 Second async-iterable source.
 * @returns {(OperatorAsyncFunction<T, T | T2>)} An async-iterable sequence that contains the elements of the first sequence,
 * followed by those of the second the sequence.
 */
export function concatWith<T, T2>(v2: AsyncIterable<T2>): OperatorAsyncFunction<T, T | T2>;
/**
 * Concatenates all async-iterable sequences in the given sequences, as long as the previous async-iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @param {AsyncIterable<T>} v1 First async-iterable source.
 * @param {AsyncIterable<T2>} v2 Second async-iterable source.
 * @param {AsyncIterable<T3>} v3 Third async-iterable source.
 * @returns {(OperatorAsyncFunction<T, T | T2 | T3>)} An async-iterable sequence that contains the elements of each given sequence,
 * in sequential order.
 */
export function concatWith<T, T2, T3>(
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>
): OperatorAsyncFunction<T, T | T2 | T3>;
/**
 * Concatenates all async-iterable sequences in the given sequences, as long as the previous async-iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @param {AsyncIterable<T2>} v2 Second async-iterable source.
 * @param {AsyncIterable<T3>} v3 Third async-iterable source.
 * @param {AsyncIterable<T4>} v4 Fourth async-iterable source.
 * @returns {(OperatorAsyncFunction<T, T | T2 | T3 | T4>)} An async-iterable sequence that contains the elements of each
 * given sequence, in sequential order.
 */
export function concatWith<T, T2, T3, T4>(
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>
): OperatorAsyncFunction<T, T | T2 | T3 | T4>;
/**
 * Concatenates all async-iterable sequences in the given sequences, as long as the previous async-iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @param {AsyncIterable<T2>} v2 Second async-iterable source.
 * @param {AsyncIterable<T3>} v3 Third async-iterable source.
 * @param {AsyncIterable<T4>} v4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} v5 Fifth async-iterable source.
 * @returns {(OperatorAsyncFunction<T, T | T2 | T3 | T4 | T5>)} An async-iterable sequence that contains the elements of each
 * given sequence, in sequential order.
 */
export function concatWith<T, T2, T3, T4, T5>(
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>
): OperatorAsyncFunction<T, T | T2 | T3 | T4 | T5>;
/**
 * Concatenates all async-iterable sequences in the given sequences, as long as the previous async-iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @template T6 The type of the elements in the sixth source sequence.
 * @param {AsyncIterable<T2>} v2 Second async-iterable source.
 * @param {AsyncIterable<T3>} v3 Third async-iterable source.
 * @param {AsyncIterable<T4>} v4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} v5 Fifth async-iterable source.
 * @param {AsyncIterable<T6>} v6 Sixth async-iterable source.
 * @returns {(OperatorAsyncFunction<T, T | T2 | T3 | T4 | T5 | T6>)} An async-iterable sequence that contains the elements of each
 * given sequence, in sequential order.
 */
export function concatWith<T, T2, T3, T4, T5, T6>(
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>,
  v6: AsyncIterable<T6>
): OperatorAsyncFunction<T, T | T2 | T3 | T4 | T5 | T6>;

/**
 * Concatenates all async-iterable sequences in the given sequences, as long as the previous async-iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the sequences.
 * @param {...AsyncIterable<T>[]} args The async-iterable sources.
 * @returns {AsyncIterableX<T>} An async-iterable sequence that contains the elements of each given sequence, in sequential order.
 */
export function concatWith<T>(...args: AsyncIterable<T>[]): OperatorAsyncFunction<T, T> {
  return function concatWithOperatorFunction(source: AsyncIterable<T>) {
    return new ConcatAsyncIterable<T>([source, ...args]);
  };
}

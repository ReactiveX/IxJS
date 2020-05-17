import { OperatorAsyncFunction } from '../../interfaces';
import { CombineLatestAsyncIterable } from '../combinelatest';

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @export
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @param {AsyncIterable<T>} source First async-iterable source.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatestWith<T, T2>(
  source2: AsyncIterable<T2>
): OperatorAsyncFunction<T, [T, T2]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @export
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatestWith<T, T2, T3>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): OperatorAsyncFunction<T, [T, T2, T3]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @export
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @param {AsyncIterable<T4>} source4 Fourth async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3, T4]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatestWith<T, T2, T3, T4>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): OperatorAsyncFunction<T, [T, T2, T3, T4]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @export
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @param {AsyncIterable<T4>} source4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 Fifth async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3, T4, T5]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatestWith<T, T2, T3, T4, T5>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @export
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @template T6 The type of the elements in the sixth source sequence.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @param {AsyncIterable<T4>} source4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 Fifth async-iterable source.
 * @param {AsyncIterable<T6>} source6 Sixth async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3, T4, T5, T6]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatestWith<T, T2, T3, T4, T5, T6>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5, T6]>;

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @export
 * @template T The of the elements in the source sequences.
 * @param {...AsyncIterable<T>[]} sources The async-iterable sources.
 * @returns {OperatorAsyncFunction<T, T[]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatestWith<T>(...sources: AsyncIterable<T>[]): OperatorAsyncFunction<T, T[]>;
export function combineLatestWith<T>(...sources: any[]): OperatorAsyncFunction<T, T[]> {
  return function combineLatestOperatorFunction(source: AsyncIterable<T>) {
    return new CombineLatestAsyncIterable<T>([source, ...sources]);
  };
}

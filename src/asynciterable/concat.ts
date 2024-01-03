import { AsyncIterableX } from './asynciterablex.js';
import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';

/** @ignore */
export class ConcatAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<AsyncIterable<TSource>>;

  constructor(source: Iterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    for (const outer of this._source) {
      for await (const item of wrapWithAbort(outer, signal)) {
        yield item;
      }
    }
  }
}

export function _concatAll<TSource>(
  source: Iterable<AsyncIterable<TSource>>
): AsyncIterableX<TSource> {
  return new ConcatAsyncIterable<TSource>(source);
}

/**
 * Concatenates the second async-iterable sequence to the first async-iterable sequence upon successful termination of the first.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @param {AsyncIterable<T>} v1 First async-iterable source.
 * @param {AsyncIterable<T2>} v2 Second async-iterable source.
 * @returns {(AsyncIterableX<T | T2>)} An async-iterable sequence that contains the elements of the first sequence,
 * followed by those of the second the sequence.
 */
export function concat<T, T2>(v1: AsyncIterable<T>, v2: AsyncIterable<T2>): AsyncIterableX<T | T2>;
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
 * @returns {(AsyncIterableX<T | T2 | T3>)} An async-iterable sequence that contains the elements of each given sequence, in sequential order.
 */
export function concat<T, T2, T3>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>
): AsyncIterableX<T | T2 | T3>;
/**
 * Concatenates all async-iterable sequences in the given sequences, as long as the previous async-iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @param {AsyncIterable<T>} v1 First async-iterable source.
 * @param {AsyncIterable<T2>} v2 Second async-iterable source.
 * @param {AsyncIterable<T3>} v3 Third async-iterable source.
 * @param {AsyncIterable<T4>} v4 Fourth async-iterable source.
 * @returns {(AsyncIterableX<T | T2 | T3 | T4>)} An async-iterable sequence that contains the elements of each given sequence, in sequential order.
 */
export function concat<T, T2, T3, T4>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>
): AsyncIterableX<T | T2 | T3 | T4>;
/**
 * Concatenates all async-iterable sequences in the given sequences, as long as the previous async-iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @param {AsyncIterable<T>} v1 First async-iterable source.
 * @param {AsyncIterable<T2>} v2 Second async-iterable source.
 * @param {AsyncIterable<T3>} v3 Third async-iterable source.
 * @param {AsyncIterable<T4>} v4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} v5 Fifth async-iterable source.
 * @returns {(AsyncIterable<T | T2 | T3 | T4 | T5>)} An async-iterable sequence that contains the elements of each
 * given sequence, in sequential order.
 */
export function concat<T, T2, T3, T4, T5>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>
): AsyncIterable<T | T2 | T3 | T4 | T5>;
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
 * @param {AsyncIterable<T>} v1 First async-iterable source.
 * @param {AsyncIterable<T2>} v2 Second async-iterable source.
 * @param {AsyncIterable<T3>} v3 Third async-iterable source.
 * @param {AsyncIterable<T4>} v4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} v5 Fifth async-iterable source.
 * @param {AsyncIterable<T6>} v6 Sixth async-iterable source.
 * @returns {(AsyncIterable<T | T2 | T3 | T4 | T5 | T6>)} An async-iterable sequence that contains the elements of each
 * given sequence, in sequential order.
 */
export function concat<T, T2, T3, T4, T5, T6>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>,
  v6: AsyncIterable<T6>
): AsyncIterable<T | T2 | T3 | T4 | T5 | T6>;

/**
 * Concatenates all async-iterable sequences in the given sequences, as long as the previous async-iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the sequences.
 * @param {...AsyncIterable<T>[]} args The async-iterable sources.
 * @returns {AsyncIterableX<T>} An async-iterable sequence that contains the elements of each given sequence, in sequential order.
 */
export function concat<T>(...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new ConcatAsyncIterable<T>(args);
}

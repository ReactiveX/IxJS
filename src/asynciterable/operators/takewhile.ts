import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

/** @ignore */
export class TakeWhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _predicate: (
    value: TSource,
    index: number,
    signal?: AbortSignal
  ) => boolean | Promise<boolean>;

  constructor(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number, signal?: AbortSignal) => boolean | Promise<boolean>
  ) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    let i = 0;
    for await (const item of wrapWithAbort(this._source, signal)) {
      if (!(await this._predicate(item, i++, signal))) {
        break;
      }
      yield item;
    }
  }
}

/**
 * Returns elements from an async-iterable sequence as long as a specified condition is true.
 *
 * @template T The type of the elements in the source sequence.
 * @template S The result of the predicate that is truthy/falsy.
 * @param {(value: T, index: number, signal?: AbortSignal) => value is S} predicate A function to test each element for a condition.
 * @returns {OperatorAsyncFunction<T, S>} An async-iterable sequence that contains the elements from the input sequence that occur
 * before the element at which the test no longer passes.
 */
export function takeWhile<T, S extends T>(
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S
): OperatorAsyncFunction<T, S>;
/**
 * Returns elements from an async-iterable sequence as long as a specified condition is true.
 *
 * @template T The type of the elements in the source sequence.
 * @param {((value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>)} predicate A function to test each element for a condition.
 * @returns {OperatorAsyncFunction<T, T>} An async-iterable sequence that contains the elements from the input sequence that occur
 * before the element at which the test no longer passes.
 */
export function takeWhile<T>(
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T>;
/**
 * Returns elements from an async-iterable sequence as long as a specified condition is true.
 *
 * @template T The type of the elements in the source sequence.
 * @param {((value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>)} predicate A function to test each element for a condition.
 * @returns {OperatorAsyncFunction<T, T>} An async-iterable sequence that contains the elements from the input sequence that occur
 * before the element at which the test no longer passes.
 */
export function takeWhile<T>(
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T> {
  return function takeWhileOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new TakeWhileAsyncIterable<T>(source, predicate);
  };
}

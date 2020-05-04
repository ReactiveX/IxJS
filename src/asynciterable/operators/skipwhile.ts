import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class SkipWhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
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
    let yielding = false;
    let i = 0;
    for await (const element of wrapWithAbort(this._source, signal)) {
      if (!yielding && !(await this._predicate(element, i++, signal))) {
        yielding = true;
      }
      if (yielding) {
        yield element;
      }
    }
  }
}

/**
 * Bypasses elements in an async-iterale sequence as long as a specified condition is true
 * and then returns the remaining elements.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @template S The result of the predicate that is truthy/falsy.
 * @param {(value: T, index: number) => value is S} predicate A function to test each element for a condition.
 * @returns {OperatorAsyncFunction<T, S>} An async-iterable sequence that contains the elements from the input
 * sequence starting at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): OperatorAsyncFunction<T, S>;
/**
 * Bypasses elements in an async-iterale sequence as long as a specified condition is true
 * and then returns the remaining elements.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {((value: T, index: number) => boolean | Promise<boolean>)} predicate A function to test each element for a condition.
 * @returns {OperatorAsyncFunction<T, T>} An async-iterable sequence that contains the elements from the input
 * sequence starting at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T>;
/**
 * Bypasses elements in an async-iterale sequence as long as a specified condition is true
 * and then returns the remaining elements.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {((value: T, index: number) => boolean | Promise<boolean>)} predicate A function to test each element for a condition.
 * @returns {OperatorAsyncFunction<T, T>} An async-iterable sequence that contains the elements from the input
 * sequence starting at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T> {
  return function skipWhileOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new SkipWhileAsyncIterable<T>(source, predicate);
  };
}

import { IterableX } from '../iterablex';
import { create } from '../create';
import { OperatorFunction } from '../../interfaces';

class SharedIterable<T> extends IterableX<T> {
  private _it: Iterator<T>;

  constructor(it: Iterator<T>) {
    super();
    this._it = {
      next(value: any) {
        return it.next(value);
      },
    };
  }

  [Symbol.iterator]() {
    return this._it;
  }
}

/**
 * Creates a buffer with a shared view over the source sequence, causing each iterator to fetch the next element
 * from the source sequence.
 *
 * @template TSource Source sequence element type.
 * @returns {OperatorAsyncFunction<TSource, TSource>} Buffer enabling each enumerator to retrieve elements from the shared source sequence.
 */
export function share<TSource>(): OperatorFunction<TSource, TSource>;
/**
 * Shares the source sequence within a selector function where each iterator can fetch the next element from the
 * source sequence.
 *
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {((value: Iterable<TSource>) => Iterable<TResult>)} [selector] Selector function with shared access
 * to the source sequence for each iterator.
 * @returns {OperatorAsyncFunction<TSource, TResult>} Sequence resulting from applying the selector function to the
 * shared view over the source sequence.
 */
export function share<TSource, TResult>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TResult>;
/**
 * Shares the source sequence within a selector function where each iterator can fetch the next element from the
 * source sequence.
 *
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {((value: Iterable<TSource>) => Iterable<TResult>)} [selector] Selector function with shared access
 * to the source sequence for each iterator.
 * @returns {(OperatorFunction<TSource, TSource | TResult>)} Sequence resulting from applying the selector function to the
 * shared view over the source sequence.
 */
export function share<TSource, TResult = TSource>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function shareOperatorFunction(source: Iterable<TSource>): IterableX<TSource | TResult> {
    return selector
      ? create(() => selector(new SharedIterable(source[Symbol.iterator]()))[Symbol.iterator]())
      : new SharedIterable(source[Symbol.iterator]());
  };
}

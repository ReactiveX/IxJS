import { IterableX } from '../iterablex';
import { create } from '../create';
import { OperatorFunction } from '../../interfaces';

class SharedIterable<T> extends IterableX<T> {
  private _it: Iterator<T>;

  constructor(it: Iterator<T>) {
    super();
    this._it = {
      next(value: T) {
        return it.next(value);
      }
    };
  }

  [Symbol.iterator]() {
    return this._it;
  }
}

export function share<TSource>(): OperatorFunction<TSource, TSource>;
export function share<TSource, TResult>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TResult>;
export function share<TSource, TResult = TSource>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function shareOperatorFunction(source: Iterable<TSource>): IterableX<TSource | TResult> {
    return selector
      ? create(() => selector(new SharedIterable(source[Symbol.iterator]()))[Symbol.iterator]())
      : new SharedIterable(source[Symbol.iterator]());
  };
}

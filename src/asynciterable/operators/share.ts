import { AsyncIterableX } from '../asynciterablex';
import { create } from '../create';
import { OperatorAsyncFunction } from '../../interfaces';

class SharedAsyncIterable<T> extends AsyncIterableX<T> {
  private _it: AsyncIterator<T>;

  constructor(it: AsyncIterator<T>) {
    super();
    this._it = {
      next(value) {
        return it.next(value);
      }
    };
  }

  [Symbol.asyncIterator]() {
    return this._it;
  }
}

export function share<TSource>(): OperatorAsyncFunction<TSource, TSource>;
export function share<TSource, TResult>(
  selector?: (
    value: AsyncIterable<TSource>
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): OperatorAsyncFunction<TSource, TResult>;
export function share<TSource, TResult = TSource>(
  selector?: (
    value: AsyncIterable<TSource>
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function shareOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    return selector
      ? create<TResult>(async () => {
          const it = await selector(new SharedAsyncIterable(source[Symbol.asyncIterator]()));
          return it[Symbol.asyncIterator]();
        })
      : new SharedAsyncIterable<TSource>(source[Symbol.asyncIterator]());
  };
}

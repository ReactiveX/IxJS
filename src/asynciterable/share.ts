import { AsyncIterableX } from './asynciterablex';
import { create } from './create';

class SharedAsyncIterable<T> extends AsyncIterableX<T> {
  private _it: AsyncIterator<T>;

  constructor(it: AsyncIterator<T>) {
    super();
    // wrap iterator to prevent `return` propagation
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

export function share<TSource>(source: AsyncIterable<TSource>): AsyncIterableX<TSource>;
export function share<TSource, TResult>(
  source: AsyncIterable<TSource>,
  selector?: (
    value: AsyncIterable<TSource>
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): AsyncIterableX<TResult>;
export function share<TSource, TResult = TSource>(
  source: AsyncIterable<TSource>,
  selector?: (
    value: AsyncIterable<TSource>
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): AsyncIterableX<TSource | TResult> {
  return selector
    ? create<TResult>(async () => {
        const it = await selector(new SharedAsyncIterable(source[Symbol.asyncIterator]()));
        return it[Symbol.asyncIterator]();
      })
    : new SharedAsyncIterable<TSource>(source[Symbol.asyncIterator]());
}

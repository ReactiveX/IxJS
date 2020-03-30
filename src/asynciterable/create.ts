import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

class AnonymousAsyncIterable<T> extends AsyncIterableX<T> {
  private _fn: (signal?: AbortSignal) => AsyncIterator<T> | Promise<AsyncIterator<T>>;

  constructor(fn: (signal?: AbortSignal) => AsyncIterator<T> | Promise<AsyncIterator<T>>) {
    super();
    this._fn = fn;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const it = await this._fn(signal);
    let next: IteratorResult<T> | undefined;
    while (!(next = await it.next()).done) {
      yield next.value;
    }
  }
}

/**
 * Creates a new enumerable using the specified function implementing the members of AsyncIterable
 * @param fn The function that creates the [Symbol.asyncIterator]() method
 */
export function create<T>(
  fn: (signal?: AbortSignal) => AsyncIterator<T> | Promise<AsyncIterator<T>>
): AsyncIterableX<T> {
  return new AnonymousAsyncIterable(fn);
}

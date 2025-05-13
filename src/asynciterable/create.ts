import { AsyncIterableX } from './asynciterablex.js';
import { throwIfAborted } from '../aborterror.js';

class AnonymousAsyncIterable<T> extends AsyncIterableX<T> {
  private _fn: (signal?: AbortSignal) => AsyncIterator<T> | Promise<AsyncIterator<T>>;

  constructor(fn: (signal?: AbortSignal) => AsyncIterator<T> | Promise<AsyncIterator<T>>) {
    super();
    this._fn = fn;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const it = await this._fn(signal);

    for await (const item of {
      [Symbol.asyncIterator]: () => it,
    }) {
      yield item;
    }
  }
}

/**
 * Creates a new iterable using the specified function implementing the members of AsyncIterable
 *
 * @template T The type of the elements returned by the enumerable sequence.
 * @param {((signal?: AbortSignal) => AsyncIterator<T> | Promise<AsyncIterator<T>>)} fn The function that creates the [Symbol.asyncIterator]() method
 * @returns {AsyncIterableX<T>} A new async-iterable instance.
 */
export function create<T>(
  fn: (signal?: AbortSignal) => AsyncIterator<T> | Promise<AsyncIterator<T>>
): AsyncIterableX<T> {
  return new AnonymousAsyncIterable(fn);
}

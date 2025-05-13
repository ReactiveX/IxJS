import { AsyncIterableX } from './asynciterablex.js';
import { throwIfAborted } from '../aborterror.js';

/** @ignore */
export class OfAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _args: Iterable<TSource>;

  constructor(args: Iterable<TSource>) {
    super();
    this._args = args;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    for await (const item of this._args) {
      yield item;
    }
  }
}

/**
 * Creates an async-iterable from the specified elements.
 *
 * @template TSource The type of the elements to create an async-iterable sequence.
 * @param {...TSource[]} args The elements to turn into an async-iterable sequence.
 * @returns {AsyncIterableX<TSource>} The async-iterable sequence created from the elements.
 */
export function of<TSource extends any[]>(
  ...args: TSource
): AsyncIterableX<TSource[number & keyof TSource]> {
  return new OfAsyncIterable(args);
}

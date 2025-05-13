import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
export class ReverseAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const results: TSource[] = [];

    for await (const item of wrapWithAbort(this._source, signal)) {
      results.unshift(item);
    }

    for await (const item of results) {
      yield item;
    }
  }
}

/**
 * Reverses the async-iterable instance.
 *
 * @template TSource The type of the elements in the source sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The async-iterable in reversed sequence.
 */
export function reverse<TSource>(): MonoTypeOperatorAsyncFunction<TSource> {
  return function reverseOperatorFunction(source) {
    return new ReverseAsyncIterable(source);
  };
}

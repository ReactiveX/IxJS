import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

/** @ignore */
export class ReverseAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const results = [] as TSource[];
    for await (const item of wrapWithAbort(this._source, signal)) {
      results.unshift(item);
    }
    yield* results;
  }
}

/**
 * Reverses the async-iterable instance.
 *
 * @template TSource The type of the elements in the source sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The async-iterable in reversed sequence.
 */
export function reverse<TSource>(): MonoTypeOperatorAsyncFunction<TSource> {
  return function reverseOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ReverseAsyncIterable<TSource>(source);
  };
}

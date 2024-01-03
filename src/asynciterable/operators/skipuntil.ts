import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
export class SkipUntilAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _other: (signal?: AbortSignal) => Promise<any>;

  constructor(source: AsyncIterable<TSource>, other: (signal?: AbortSignal) => Promise<any>) {
    super();
    this._source = source;
    this._other = other;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    let otherDone = false;
    this._other(signal).then(() => (otherDone = true));
    for await (const item of wrapWithAbort(this._source, signal)) {
      if (otherDone) {
        yield item;
      }
    }
  }
}

/**
 * Returns the elements from the source observable sequence only after the function that returns a promise produces an element.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {(signal?: AbortSignal) => Promise<any>} other A function which returns a promise that triggers propagation
 * of elements of the source sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An async-iterable sequence containing the elements of the source sequence
 * starting from the point the function that returns a promise triggered propagation.
 */
export function skipUntil<TSource>(
  other: (signal?: AbortSignal) => Promise<any>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function skipUntilOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new SkipUntilAsyncIterable<TSource>(source, other);
  };
}

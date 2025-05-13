import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';
import { merge } from '../merge.js';

const doneEvent = {};

/** @ignore */
export class TakeUntilAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _other: (signal?: AbortSignal) => Promise<any>;

  constructor(source: AsyncIterable<TSource>, other: (signal?: AbortSignal) => Promise<any>) {
    super();
    this._source = source;
    this._other = other;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const done = AsyncIterableX.as(this._other(signal).then(() => doneEvent));
    const source = wrapWithAbort(this._source, signal);
    const merged = merge(source, done);

    for await (const item of merged) {
      if (item === doneEvent) {
        break;
      }

      yield item as TSource;
    }
  }
}

/**
 * Returns the elements from the source async-iterable sequence until the other function
 * that returns a promise produces an element.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {(signal?: AbortSignal) => Promise<any>} other A function that terminates the propagation of
 * elements in the source sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An async-iterable sequence containing the elements of the
 * source sequence up to the point the other function which returns a promise interrupted further propagation.
 */
export function takeUntil<TSource>(
  other: (signal?: AbortSignal) => Promise<any>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function takeUntilOperatorFunction(source) {
    return new TakeUntilAsyncIterable(source, other);
  };
}

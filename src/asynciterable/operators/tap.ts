import { AsyncIterableX } from '../asynciterablex.js';
import { PartialAsyncObserver } from '../../observer.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { toObserver } from '../../util/toobserver.js';
import { AbortError, throwIfAborted } from '../../aborterror.js';
import { wrapWithAbort } from './withabort.js';

/** @ignore */
export class TapAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _observer: PartialAsyncObserver<TSource>;

  constructor(source: AsyncIterable<TSource>, observer: PartialAsyncObserver<TSource>) {
    super();
    this._source = source;
    this._observer = observer;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    try {
      for await (const item of wrapWithAbort(this._source, signal)) {
        await this._observer.next?.(item);

        yield item;
      }

      await this._observer.complete?.();
    } catch (e) {
      if (!(e instanceof AbortError)) {
        await this._observer.error?.(e);
      }

      throw e;
    }
  }
}

/**
 * Invokes an action for each element in the async-iterable sequence, and propagates all observer
 * messages through the result sequence. This method can be used for debugging, logging, etc. by
 * intercepting the message stream to run arbitrary actions for messages on the pipeline.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {PartialAsyncObserver<TSource>} observer Observer whose methods to invoke as part of the source sequence's observation.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The source sequence with the side-effecting behavior applied.
 */
export function tap<TSource>(
  observer: PartialAsyncObserver<TSource>
): MonoTypeOperatorAsyncFunction<TSource>;

/**
 * Invokes an action for each element in the async-iterable sequence, and propagates all observer
 * messages through the result sequence. This method can be used for debugging, logging, etc. by
 * intercepting the message stream to run arbitrary actions for messages on the pipeline.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {(((value: TSource) => any) | null)} [next] Function to invoke for each element in the async-iterable sequence.
 * @param {(((err: any) => any) | null)} [error] Function to invoke upon exceptional termination of the async-iterable sequence.
 * @param {((() => any) | null)} [complete] Function to invoke upon graceful termination of the async-iterable sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The source sequence with the side-effecting behavior applied.
 */
export function tap<TSource>(
  next?: ((value: TSource) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): MonoTypeOperatorAsyncFunction<TSource>;

/**
 * Invokes an action for each element in the async-iterable sequence, and propagates all observer
 * messages through the result sequence. This method can be used for debugging, logging, etc. by
 * intercepting the message stream to run arbitrary actions for messages on the pipeline.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {(PartialAsyncObserver<TSource> | ((value: TSource) => any) | null)} [observerOrNext] Observer whose methods to invoke as
 * part of the source sequence's observation or a function to invoke for each element in the async-iterable sequence.
 * @param {(((err: any) => any) | null)} [error] Function to invoke upon exceptional termination of the async-iterable sequence.
 * @param {((() => any) | null)} [complete] Function to invoke upon graceful termination of the async-iterable sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The source sequence with the side-effecting behavior applied.
 */
export function tap<TSource>(
  observerOrNext?: PartialAsyncObserver<TSource> | ((value: TSource) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): MonoTypeOperatorAsyncFunction<TSource> {
  return function tapOperatorFunction(source) {
    return new TapAsyncIterable(source, toObserver(observerOrNext, error, complete));
  };
}

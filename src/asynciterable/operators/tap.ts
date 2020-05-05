import { AsyncIterableX } from '../asynciterablex';
import { PartialAsyncObserver } from '../../observer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { toObserver } from '../../util/toobserver';
import { wrapWithAbort } from './withabort';
import { AbortError, throwIfAborted } from '../../aborterror';

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
    const source = wrapWithAbort(this._source, signal);
    const it = source[Symbol.asyncIterator]();
    while (1) {
      let next;
      try {
        next = await it.next();
      } catch (e) {
        if (e instanceof AbortError) {
          throw e;
        }

        if (this._observer.error) {
          await this._observer.error(e);
        }
        throw e;
      }

      if (next.done) {
        if (this._observer.complete) {
          await this._observer.complete();
        }
        break;
      }

      if (this._observer.next) {
        await this._observer.next(next.value);
      }
      yield next.value;
    }
  }
}

/**
 * Invokes an action for each element in the async-iterable sequence, and propagates all observer
 * messages through the result sequence. This method can be used for debugging, logging, etc. by
 * intercepting the message stream to run arbitrary actions for messages on the pipeline.
 *
 * @export
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
 * @export
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
 * @export
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
  return function tapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TapAsyncIterable<TSource>(source, toObserver(observerOrNext, error, complete));
  };
}

import { AsyncIterableX } from '../asynciterablex';
import { PartialAsyncObserver } from '../../observer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { toObserver } from '../../util/toobserver';
import { AbortError, throwIfAborted } from '../../aborterror';
import { returnAsyncIterator } from '../../util/returniterator';

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
    const obs = this._observer;
    const it = this._source[Symbol.asyncIterator](signal);
    try {
      for (let res: IteratorResult<TSource>; !(res = await it.next()).done; ) {
        if (obs.next) {
          await obs.next(res.value);
        }
        yield res.value;
      }
      if (obs.complete) {
        await obs.complete();
      }
    } catch (e) {
      if (!(e instanceof AbortError) && obs.error) {
        await obs.error(e);
      }
      throw e;
    } finally {
      await returnAsyncIterator(it);
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
  return function tapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TapAsyncIterable<TSource>(source, toObserver(observerOrNext, error, complete));
  };
}

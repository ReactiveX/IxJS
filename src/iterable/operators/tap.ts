import { IterableX } from '../iterablex.js';
import { PartialObserver } from '../../observer.js';
import { MonoTypeOperatorFunction } from '../../interfaces.js';
import { toObserver } from '../../util/toobserver.js';

/** @ignore */
export class TapIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _observer: PartialObserver<TSource>;

  constructor(source: Iterable<TSource>, observer: PartialObserver<TSource>) {
    super();
    this._source = source;
    this._observer = observer;
  }

  *[Symbol.iterator]() {
    const it = this._source[Symbol.iterator]();
    while (1) {
      let next;
      try {
        next = it.next();
        if (next.done) {
          break;
        }
      } catch (e) {
        if (this._observer.error) {
          this._observer.error(e);
        }
        throw e;
      }

      if (this._observer.next) {
        this._observer.next(next.value);
      }
      yield next.value;
    }

    if (this._observer.complete) {
      this._observer.complete();
    }
  }
}

/**
 * Invokes an action for each element in the iterable sequence, and propagates all observer
 * messages through the result sequence. This method can be used for debugging, logging, etc. by
 * intercepting the message stream to run arbitrary actions for messages on the pipeline.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {PartialObserver<TSource>} observer Observer whose methods to invoke as part of the source sequence's observation.
 * @returns {MonoTypeOperatorFunction<TSource>} The source sequence with the side-effecting behavior applied.
 */
export function tap<TSource>(observer: PartialObserver<TSource>): MonoTypeOperatorFunction<TSource>;

/**
 * Invokes an action for each element in the iterable sequence, and propagates all observer
 * messages through the result sequence. This method can be used for debugging, logging, etc. by
 * intercepting the message stream to run arbitrary actions for messages on the pipeline.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {(((value: TSource) => any) | null)} [next] Function to invoke for each element in the iterable sequence.
 * @param {(((err: any) => any) | null)} [error] Function to invoke upon exceptional termination of the iterable sequence.
 * @param {((() => any) | null)} [complete] Function to invoke upon graceful termination of the iterable sequence.
 * @returns {MonoTypeOperatorFunction<TSource>} The source sequence with the side-effecting behavior applied.
 */
export function tap<TSource>(
  next?: ((value: TSource) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): MonoTypeOperatorFunction<TSource>;

/**
 * Invokes an action for each element in the iterable sequence, and propagates all observer
 * messages through the result sequence. This method can be used for debugging, logging, etc. by
 * intercepting the message stream to run arbitrary actions for messages on the pipeline.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {(PartialObserver<TSource> | ((value: TSource) => any) | null)} [observerOrNext] Observer whose methods to invoke as
 * part of the source sequence's observation or a function to invoke for each element in the iterable sequence.
 * @param {(((err: any) => any) | null)} [error] Function to invoke upon exceptional termination of the iterable sequence.
 * @param {((() => any) | null)} [complete] Function to invoke upon graceful termination of the iterable sequence.
 * @returns {MonoTypeOperatorFunction<TSource>} The source sequence with the side-effecting behavior applied.
 */
export function tap<TSource>(
  observerOrNext?: PartialObserver<TSource> | ((value: TSource) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): MonoTypeOperatorFunction<TSource> {
  return function tapOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new TapIterable<TSource>(source, toObserver(observerOrNext, error, complete));
  };
}

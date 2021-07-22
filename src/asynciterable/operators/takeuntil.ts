import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';
import { safeRace } from '../../util/safeRace';

const DONE_PROMISE_VALUE = undefined;

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
    const donePromise = this._other(signal).then(() => DONE_PROMISE_VALUE);
    const itemsAsyncIterator = wrapWithAbort(this._source, signal)[Symbol.asyncIterator]();
    for (;;) {
      const itemPromise = itemsAsyncIterator.next();
      const result = await safeRace([donePromise, itemPromise]);
      if (result === DONE_PROMISE_VALUE || result.done) {
        break;
      }
      yield result.value;
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
  return function takeUntilOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new TakeUntilAsyncIterable<TSource>(source, other);
  };
}

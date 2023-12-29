import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export class WithAbortAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _signal: AbortSignal;

  constructor(source: AsyncIterable<TSource>, signal: AbortSignal) {
    super();
    this._source = source;
    this._signal = signal;
  }

  withAbort(signal: AbortSignal) {
    return new WithAbortAsyncIterable<TSource>(this._source, signal);
  }

  [Symbol.asyncIterator](): AsyncIterator<TSource> {
    // @ts-ignore
    return this._source[Symbol.asyncIterator](this._signal);
  }
}

/**
 * Wraps the existing async-iterable sequence with an abort signal for cancellation.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {AbortSignal} signal The abort signal used for cancellation.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An async-iterable that can be cancelled by the abort signal.
 */
export function withAbort<TSource>(signal: AbortSignal): MonoTypeOperatorAsyncFunction<TSource> {
  return function withAbortOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new WithAbortAsyncIterable(source, signal);
  };
}

/**
 * Wraps an existing async-iterable with a new async-iterable which support cancellation.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {AsyncIterable<TSource>} source The source sequence to wrap with the abort signal.
 * @param {AbortSignal} [signal] The abort signal used for cancellation.
 * @returns {AsyncIterable<TSource>} The source sequence wrapped with an abort signal for cancellation.
 */
export function wrapWithAbort<TSource>(
  source: AsyncIterable<TSource>,
  signal?: AbortSignal
): AsyncIterable<TSource> {
  return signal ? new WithAbortAsyncIterable(source, signal) : source;
}

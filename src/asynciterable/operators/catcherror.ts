import { AsyncIterableX } from '../asynciterablex.js';
import { OperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
export class CatchWithAsyncIterable<TSource, TResult> extends AsyncIterableX<TSource | TResult> {
  private _source: AsyncIterable<TSource>;
  private _handler: (
    error: any,
    signal?: AbortSignal
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

  constructor(
    source: AsyncIterable<TSource>,
    handler: (
      error: any,
      signal?: AbortSignal
    ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
  ) {
    super();
    this._source = source;
    this._handler = handler;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    let err: AsyncIterable<TResult> | undefined;
    let hasError = false;

    try {
      for await (const item of wrapWithAbort(this._source, signal)) {
        yield item;
      }
    } catch (e) {
      err = await this._handler(e, signal);
      hasError = true;
    }

    if (hasError) {
      for await (const item of wrapWithAbort(err!, signal)) {
        yield item;
      }
    }
  }
}

/**
 * Continues an async-iterable sequence that is terminated by an exception with the
 * async-iterable sequence produced by the handler.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TResult The type of elements from the handler function.
 * @param {((
 *     error: any,
 *     signal?: AbortSignal
 *   ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>)} handler Error handler function, producing another async-iterable sequence.
 * @returns {(OperatorAsyncFunction<TSource, TSource | TResult>)} An operator which continues an async-iterable sequence that is terminated by
 * an exception with the specified handler.
 */
export function catchError<TSource, TResult>(
  handler: (
    error: any,
    signal?: AbortSignal
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function catchWithOperatorFunction(source) {
    return new CatchWithAsyncIterable(source, handler);
  };
}

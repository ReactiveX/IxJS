import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
export class FinallyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _action: () => any | Promise<any>;

  constructor(source: AsyncIterable<TSource>, action: () => void | Promise<void>) {
    super();
    this._source = source;
    this._action = action;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    try {
      for await (const item of wrapWithAbort(this._source, signal)) {
        yield item;
      }
    } finally {
      await this._action();
    }
  }
}

/**
 * Invokes a specified asynchronous action after the source async-iterable sequence terminates gracefully or exceptionally.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {(() => void | Promise<void>)} action Action to invoke and await asynchronously after the source async-iterable sequence terminates
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator that returns the source sequence with the
 * action-invoking termination behavior applied.
 */
export function finalize<TSource>(
  action: () => void | Promise<void>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function finalizeOperatorFunction(source) {
    return new FinallyAsyncIterable(source, action);
  };
}

import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

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

export function finalize<TSource>(
  action: () => void | Promise<void>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function finalizeOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new FinallyAsyncIterable<TSource>(source, action);
  };
}

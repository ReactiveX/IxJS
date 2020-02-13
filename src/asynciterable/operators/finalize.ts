import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class FinallyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _action: () => any | Promise<any>;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    action: () => void | Promise<void>,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._action = action;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    try {
      for await (const item of wrapWithAbort(this._source, this._signal)) {
        yield item;
      }
    } finally {
      await this._action();
    }
  }
}

export function finalize<TSource>(
  action: () => void | Promise<void>,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function finalizeOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new FinallyAsyncIterable<TSource>(source, action, signal);
  };
}

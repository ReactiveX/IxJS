import { AsyncIterableX } from './asynciterablex';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

class DeferAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _fn: (signal?: AbortSignal) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;

  constructor(
    fn: (signal?: AbortSignal) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
  ) {
    super();
    this._fn = fn;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const items = await this._fn(signal);
    for await (const item of wrapWithAbort(items, signal)) {
      yield item;
    }
  }
}

export function defer<TSource>(
  factory: (signal?: AbortSignal) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
): AsyncIterableX<TSource> {
  return new DeferAsyncIterable<TSource>(factory);
}

import { AsyncIterableX } from './asynciterablex';

class DeferAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _fn: () => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;

  constructor(fn: () => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>) {
    super();
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    const items = await this._fn();
    for await (const item of items) {
      yield item;
    }
  }
}

export function defer<TSource>(
  factory: () => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
): AsyncIterableX<TSource> {
  return new DeferAsyncIterable<TSource>(factory);
}

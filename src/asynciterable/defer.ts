import { AsyncIterableX } from '../asynciterable';

class DeferAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _fn: () => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;

  constructor(fn: () => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>) {
    super();
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    let items = await this._fn();
    for await (let item of items) { yield item; }
  }
}

export function defer<TSource>(
    factory: () => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>): AsyncIterableX<TSource> {
  return new DeferAsyncIterable<TSource>(factory);
}

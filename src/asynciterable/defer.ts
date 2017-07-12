import { AsyncIterableX } from '../asynciterable';

class DeferAsyncIterabe<TSource> extends AsyncIterableX<TSource> {
  private _fn: () => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;

  constructor(fn: () => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>) {
    super();
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    for await (let item of await this._fn()) { yield item; }
  }
}

export function defer<TSource>(
    factory: () => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>): AsyncIterableX<TSource> {
  return new DeferAsyncIterabe<TSource>(factory);
}

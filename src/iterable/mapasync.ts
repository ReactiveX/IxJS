import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';

class MapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: Iterable<TSource | Promise<TSource>> | AsyncIterable<TSource>;
  private _selector: (value: TSource, index: number) => TResult | Promise<TResult>;

  constructor(
      source: Iterable<TSource | Promise<TSource>> | AsyncIterable<TSource>,
      selector: (value: TSource, index: number) => TResult | Promise<TResult>) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (let item of <AsyncIterable<TSource>>(this._source)) {
      yield await this._selector(item, i++);
    }
  }
}

export function mapAsync<TSource, TResult>(
    source: Iterable<TSource | Promise<TSource>> | AsyncIterable<TSource>,
    selector: (value: TSource, index: number) => TResult | Promise<TResult>,
    thisArg?: any): AsyncIterableX<TResult> {
  return new MapAsyncIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 2));
}

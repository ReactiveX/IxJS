import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';

class MapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: AsyncIterable<TSource>;
  private _selector: (value: TSource, index: number) => Promise<TResult> | TResult;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (value: TSource, index: number) => Promise<TResult> | TResult) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (let item of <AsyncIterable<TSource>>(this._source)) {
      let result = await this._selector(item, i++);
      yield result;
    }
  }
}

export function map<TSource, TResult>(
    source: AsyncIterable<TSource>,
    selector: (value: TSource, index: number) => Promise<TResult> | TResult,
    thisArg?: any): AsyncIterableX<TResult> {
  return new MapAsyncIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 2));
}

import { AsyncIterableX } from '../asynciterable';

class ExpandAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;

  constructor(
      source: AsyncIterable<TSource>,
      selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    let q = [this._source];
    while (q.length > 0) {
      let src = q.shift();
      for await (let item of src!) {
        let items = await this._selector(item);
        q.push(items);
        yield item;
      }
    }
  }
}

export function expand<TSource>(
    source: AsyncIterable<TSource>,
    selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>):
      AsyncIterableX<TSource> {
  return new ExpandAsyncIterable<TSource>(source, selector);
}

import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export class ExpandAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
  ) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    const q = [this._source];
    while (q.length > 0) {
      const src = q.shift();
      for await (const item of src!) {
        const items = await this._selector(item);
        q.push(items);
        yield item;
      }
    }
  }
}

export function expand<TSource>(
  selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function expandOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ExpandAsyncIterable<TSource>(source, selector);
  };
}

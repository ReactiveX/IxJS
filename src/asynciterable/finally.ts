import { AsyncIterableX } from './asynciterablex';

export class FinallyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _action: () => any | Promise<any>;

  constructor(source: AsyncIterable<TSource>, action: () => void | Promise<void>) {
    super();
    this._source = source;
    this._action = action;
  }

  async *[Symbol.asyncIterator]() {
    try {
      for await (let item of this._source) {
        yield item;
      }
    } finally {
      await this._action();
    }
  }
}

export function _finally<TSource>(
  source: AsyncIterable<TSource>,
  action: () => any | Promise<any>
): AsyncIterableX<TSource> {
  return new FinallyAsyncIterable<TSource>(source, action);
}

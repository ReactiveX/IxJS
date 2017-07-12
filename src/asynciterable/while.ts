import { AsyncIterableX } from '../asynciterable';

class WhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _condition: () => boolean | Promise<boolean>;
  private _source: AsyncIterable<TSource>;

  constructor(condition: () => boolean | Promise<boolean>, source: AsyncIterable<TSource>) {
    super();
    this._condition = condition;
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    while (await this._condition()) {
      for await (let item of this._source) { yield item; }
    }
  }
}

export function _while<TSource>(
    condition: () => boolean | Promise<boolean>,
    source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
  return new WhileAsyncIterable<TSource>(condition, source);
}

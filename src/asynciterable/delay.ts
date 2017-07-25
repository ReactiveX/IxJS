import { AsyncIterableX } from '../asynciterable';
import { sleep } from './_sleep';

class DelayAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _dueTime: number;

  constructor(source: AsyncIterable<TSource>, dueTime: number) {
    super();
    this._source = source;
    this._dueTime = dueTime;
  }

  async *[Symbol.asyncIterator]() {
    await sleep(this._dueTime);
    for await (const item of this._source) {
      yield item;
    }
  }
}

export function delay<TSource>(
    source: AsyncIterable<TSource>,
    dueTime: number): AsyncIterableX<TSource> {
  return new DelayAsyncIterable<TSource>(source, dueTime);
}
import { AsyncIterableX } from './asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../interfaces';
import { sleep } from './_sleep';

export class DelayAsyncIterable<TSource> extends AsyncIterableX<TSource> {
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

export function delay<TSource>(dueTime: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function delayOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new DelayAsyncIterable<TSource>(source, dueTime);
  };
}

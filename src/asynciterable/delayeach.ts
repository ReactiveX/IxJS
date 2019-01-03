import { AsyncIterableX } from './asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../interfaces';
import { sleep } from './_sleep';

export class DelayEachAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _dueTime: number;

  constructor(source: AsyncIterable<TSource>, dueTime: number) {
    super();
    this._source = source;
    this._dueTime = dueTime;
  }

  async *[Symbol.asyncIterator]() {
    for await (const item of this._source) {
      await sleep(this._dueTime);
      yield item;
    }
  }
}

export function delayEach<TSource>(dueTime: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function delayEachOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DelayEachAsyncIterable<TSource>(source, dueTime);
  };
}

import { AsyncIterableX } from './asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../interfaces';

export class StartWithAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _args: TSource[];

  constructor(source: AsyncIterable<TSource>, args: TSource[]) {
    super();
    this._source = source;
    this._args = args;
  }

  async *[Symbol.asyncIterator]() {
    for (let x of this._args) {
      yield x;
    }
    for await (let item of this._source) {
      yield item;
    }
  }
}

export function startWith<TSource>(...args: TSource[]): MonoTypeOperatorAsyncFunction<TSource> {
  return function startWithOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new StartWithAsyncIterable<TSource>(source, args);
  };
}

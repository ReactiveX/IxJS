import { AsyncIterableX } from './asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../interfaces';

export class EndWithAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _args: TSource[];

  constructor(source: AsyncIterable<TSource>, args: TSource[]) {
    super();
    this._source = source;
    this._args = args;
  }

  async *[Symbol.asyncIterator]() {
    for await (let item of this._source) {
      yield item;
    }
    for (let x of this._args) {
      yield x;
    }
  }
}

export function endWith<TSource>(...args: TSource[]): MonoTypeOperatorAsyncFunction<TSource> {
  return function endsWithOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new EndWithAsyncIterable<TSource>(source, args);
  };
}

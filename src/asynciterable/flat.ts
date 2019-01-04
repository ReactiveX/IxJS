import { AsyncIterableX } from './asynciterablex';
import { isAsyncIterable } from '../util/isiterable';
import { MonoTypeOperatorAsyncFunction } from '../interfaces';

export class FlattenAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _depth: number;

  constructor(source: AsyncIterable<TSource>, depth: number) {
    super();
    this._source = source;
    this._depth = depth;
  }

  private async *_flatten(source: AsyncIterable<TSource>, depth: number): AsyncIterable<TSource> {
    if (depth === 0) {
      for await (let item of source) {
        yield item;
      }
      return undefined;
    }
    for await (let item of source) {
      if (isAsyncIterable(item)) {
        for await (let innerItem of this._flatten(item, depth - 1)) {
          yield innerItem;
        }
      } else {
        yield item;
      }
    }
  }

  [Symbol.asyncIterator]() {
    return this._flatten(this._source, this._depth)[Symbol.asyncIterator]();
  }
}

export function flat<T>(depth: number = Infinity): MonoTypeOperatorAsyncFunction<T> {
  return function flattenOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new FlattenAsyncIterable<T>(source, depth);
  };
}

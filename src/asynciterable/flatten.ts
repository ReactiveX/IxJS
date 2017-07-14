import { AsyncIterableX } from '../asynciterable';
import { isAsyncIterable } from '../internal/isiterable';

class FlattenAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _depth: number;

  constructor(source: AsyncIterable<TSource>, depth: number) {
    super();
    this._source = source;
    this._depth = depth;
  }

  private async *_flatten(source: AsyncIterable<TSource>, depth: number): AsyncIterable<TSource> {
    if (depth === 0) {
      for await (let item of source) { yield item; }
      return;
    }
    for await (let item of source) {
      if (isAsyncIterable(item)) {
        for await (let innerItem of this._flatten(item, depth - 1)) { yield innerItem; }
      } else {
        yield item;
      }
    }
  }

  [Symbol.asyncIterator]() {
    return this._flatten(this._source, this._depth)[Symbol.asyncIterator]();
  }
}

export function flatten<T>(source: AsyncIterable<T>, depth: number = Infinity): AsyncIterableX<T> {
  return new FlattenAsyncIterable<T>(source, depth);
}
